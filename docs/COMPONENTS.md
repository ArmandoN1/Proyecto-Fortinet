# Componentes del Dashboard — descripción funcional

Este documento enumera los componentes principales en `src/components/` y explica, para cada uno:
- Propósito y rol en la UI
- Props que recibe (y formato esperado)
- Datos que consume o genera (fuente/mocks)
- Principales interacciones y efectos
- Dónde se usa (páginas)

Usa esto como guía rápida para entender qué hace cada componente y cómo integrarlo con datos reales.

---

## `AIPanel` (`src/components/AIPanel.tsx`)
- Propósito: Mostrar recomendaciones y hallazgos generados por IA, con prioridad visual (crítico/advertencia/info).
- Props: ninguno (lee `aiRecommendations` de `src/data/mock.ts`).
- Datos: `aiRecommendations` (lista de { level, text, detail }). En producción, consumir un endpoint IA o stream.
- Interacciones: botón "VER MÁS RECOMENDACIONES" (navegación pendiente); items clicables (UI) sin acción por defecto.
- Uso: `Overview`.

---

## `Charts` (`src/components/Charts.tsx`)
Contiene dos exportaciones: `RiskChart` y `DeviceStatusChart`.

### `RiskChart`
- Propósito: visualizar la evolución del riesgo en el tiempo con un `AreaChart` y una línea de tendencia.
- Props: ninguno (lee `riskHistory` en mocks).
- Datos: `riskHistory`—array de { day, riesgo, tendencia }.
- Interacciones: tooltip personalizado.
- Uso: `Overview` (columna de métricas).

### `DeviceStatusChart`
- Propósito: mostrar la distribución de dispositivos (Protegidos/Advertencia/Críticos) con `PieChart`.
- Props: ninguno (lee `deviceStatus`).
- Datos: `deviceStatus`—array de { name, value, color }.
- Interacciones: tooltip; listado de segmentos a la derecha con conteos y %.

---

## `MiniStats` (`src/components/MiniStats.tsx`)
- Propósito: tarjeta compacta con 4 KPIs: sesiones analizadas, EPS, países involucrados, dispositivos protegidos.
- Props: `{ stats: LiveStats }`.
- Datos: `stats` proviene de hook `useLive` (o fixtures). Usa `useAnimatedNumber` para animar valores.
- Interacciones: ninguna; animación de aumento dinámico.
- Uso: `Overview` y otras páginas resumen.

---

## `PreventionIndex` (`src/components/PreventionIndex.tsx`)
- Propósito: mostrar un gauge (índice de prevención) y una lista de métricas de controles con barras de progreso.
- Props: ninguno (lee `preventionMetrics` del mock).
- Subcomponentes: `Gauge` (dibujado en SVG, semicírculo con gradiente y ticks).
- Interacciones: visual; las barras tienen animación `Bar` (componente en `src/components/ui.tsx`).
- Uso: `Overview`, `Prevention`.

---

## `SimulationCards` (`src/components/SimulationCards.tsx`)
- Propósito: lista de cards por tipo de simulación con botón para ejecutar una simulación de ejemplo.
- Props: ninguno (lee `simulationTypes` del mock).
- Subcomponentes/funcionalidad:
  - `SimCard` por item: mantiene estado local `count` y `running`, simula ejecución con `setTimeout` y actualiza contador.
- Interacciones: `SIMULAR` (cambia estado UI); hover con glow y animación.
- Uso: `Overview`, `Simulations`.

---

## `StatusCards` (`src/components/StatusCards.tsx`)
- Propósito: conjunto de tarjetas KPI de alto nivel (simulaciones, ataques, amenazas y riesgo general).
- Props: `{ stats: LiveStats }`.
- Subcomponentes:
  - `Spark` — mini-area chart (sparkline) construido con recharts y datos del hook `useLiveSeries`.
  - `RiskRing` — anillo SVG que representa la métrica de riesgo.
- Interacciones: visual; hover y small animations.
- Uso: `Overview`.

---

## `SystemIndicators` (`src/components/SystemIndicators.tsx`)
- Propósito: indicadores circulares para CPU, RAM, FIREWALL, IPS.
- Props: `{ stats: LiveStats }`.
- Subcomponentes: `CircleIndicator` que renderiza un pequeño gauge SVG por indicador.
- Interacciones: actualización en tiempo real vía `stats`.
- Uso: `Overview` y páginas de estado del sistema.

---

## `ThreatList` (`src/components/ThreatList.tsx`)
- Propósito: listado de amenazas activas con severidad y conteo.
- Props: ninguno (lee `topThreats` mock). Puede recibir datos externos fácilmente.
- Interacciones: filas clicables (UI); botón "VER TODAS" para navegación.
- Uso: `Overview`, `Attacks`.

---

## `ThreatMap` (`src/components/ThreatMap.tsx`)
- Propósito: mapa de origenes de ataques con arcos animados hacia HQ y overlays de leyenda.
- Props: ninguno (usa `data/world.ts` y `mock` para legendas).
- Detalles técnicos: proyecta coordenadas de lon/lat a coordenadas SVG (`project()` en `data/world.ts`), dibuja arcos (`arcPath`) y puntos (`worldDots`).
- Interacciones: animación periódica de ataques activos; overlays con listas de orígenes y tipos (filtrables en UI futura).
- Uso: `Overview`.

---

## `Timeline` (`src/components/Timeline.tsx`)
- Propósito: feed / línea de tiempo de eventos recientes (simulaciones, bloqueos, detecciones).
- Props: ninguno (usa `useLiveTimeline` hook que mezcla `initialTimeline` y eventos aleatorios).
- Interacciones: auto actualiza; cada evento muestra icono, tiempo, título y subtítulo.
- Uso: `Overview`.

---

## `ui` helper components (`src/components/ui.tsx`)
- Contiene pequeños componentes reutilizables como `Bar` (barra de progreso) y utilidades visuales.
- Propósito: centralizar controles visuales y consistencia de UI.
- Uso: `PreventionIndex` y otros paneles.

---

## `Loading` and `Login` (`src/pages/Loading.tsx`, `src/pages/Login.tsx`)
- `Loading`: página que reproduce el video de carga y llama `onComplete` al `onEnded` del video (o timeout si se implementa). Ideal para integrarse tras autenticación.
- `Login`: formulario y estado de autenticación; actualmente llama a `onLogin` que dispara la fase `loading` en `App.tsx`.
- Recomendación: proteger el `onLogin` para validar credenciales y manejar errores/tokens.

---

# Recomendaciones generales para integración
- Datos en tiempo real: adaptar hooks `useLive*` para suscribirse a WebSocket o poll a API.
- Normalización: crear adaptadores que transformen el payload de la API a las estructuras esperadas por los componentes (`LiveStats`, `topThreats`, etc.).
- Tests: añadir fixtures en `docs/fixtures/` y tests que rendericen componentes con datos estáticos.

---

Si quieres, los siguientes pasos que puedo ejecutar ahora:
- generar `docs/fixtures/*.json` con payloads de ejemplo para cada componente;
- insertar en cada componente un pequeño botón "¿Qué es esto?" que abra `docs/DASHBOARD-PANELS.md` en una nueva pestaña.

¿Cuál prefieres que haga ahora?