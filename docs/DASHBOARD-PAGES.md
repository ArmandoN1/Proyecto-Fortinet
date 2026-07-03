# Documentación por página del Dashboard

Este documento explica página por página qué contiene cada pantalla del dashboard (`src/pages/*`), qué componentes se usan, de dónde vienen los datos, y qué comportamientos/interacciones están implementadas. Sirve para desarrolladores y mantenedores que quieran entender, integrar o reemplazar fuentes de datos.

Nota: la mayoría de datos de ejemplo están en `src/data/mock.ts` y los hooks que simulan datos en `src/hooks/useLive.ts`.

---

## `Overview` (Resumen)
- Archivo: `src/pages/Overview.tsx` (vista por defecto del dashboard).
- Propósito: panel principal que compone múltiples widgets para ofrecer una visión rápida del estado del SOC.
- Componentes incluidos (y dónde están):
  - `StatusCards` (`src/components/StatusCards.tsx`): muestra métricas claves (simulaciones, ataques, amenazas, riesgo general) con sparklines y anillo de riesgo.
  - `SystemIndicators` (`src/components/SystemIndicators.tsx`): indicadores de CPU, RAM, Firewall, IPS.
  - `ThreatMap` (`src/components/ThreatMap.tsx`): mapa global con origen de ataques y arcos animados hacia la HQ.
  - `MiniStats` (`src/components/MiniStats.tsx`): cuatro números resumen (sesiones, EPS, países, dispositivos).
  - `ThreatList` (`src/components/ThreatList.tsx`): listado de amenazas activas.
  - `PreventionIndex` (`src/components/PreventionIndex.tsx`): gauge y métricas de controles preventivos.
  - `SimulationCards` (`src/components/SimulationCards.tsx`): cards para ejecutar simulaciones de ejemplo.
  - `AIPanel` (`src/components/AIPanel.tsx`): recomendaciones generadas por IA.
  - `Timeline` (`src/components/Timeline.tsx`): eventos recientes en streaming.
  - `RiskChart` y `DeviceStatusChart` (`src/components/Charts.tsx`): gráficas de tendencia y distribución.
- Datos / hooks usados: `useLive` / `useLiveStats` proveen `LiveStats` (simulado). Para integrar real-time: conectar `useLive` a WebSocket/API y mapear el payload a `LiveStats`.
- Interacciones: muchos componentes actualizan visualmente (animaciones) o permiten acciones de ejemplo (botones `SIMULAR`, `VER TODAS`, `VER MÁS RECOMENDACIONES`).

---

## `Simulations` (Simulaciones)
- Archivo: `src/pages/Simulations.tsx`.
- Propósito: catálogo y ejecución controlada de simulaciones (entorno aislado).
- Componentes principales:
  - `SimulationCards` (reutilizable desde overview): cada card tiene un botón `SIMULAR` que incrementa el contador local y muestra estado de ejecución.
- Datos: `simulationTypes` en `src/data/mock.ts` define tipos y valores iniciales.
- Interacciones: ejecutar simulaciones de ejemplo; en producción conectar a un backend que lance jobs y devuelva resultado/estado.

---

## `Attacks` (Ataques)
- Archivo: `src/pages/Attacks.tsx`.
- Propósito: vista centrada en detalles de incidentes y ataques detectados.
- Componentes / contenido típicos:
  - Tablas/listas de ataques (filtrables por severidad y origen).
  - Filtros por fecha, tipo, origen.
  - Gráficas de distribución por tipo (puede reutilizar `DeviceStatusChart` con otra fuente de datos).
- Datos: normalmente provendrían de logs/alertas (Graylog/Elastic/DB). Actualmente usa mocks.
- Interacciones: export, ver detalle, marcar como leído/mitigar (no implementado por defecto, requiere endpoints).

---

## `Protection` (Protección)
- Archivo: `src/pages/Protection.tsx`.
- Propósito: agrupar controles de protección (firewall, IPS, antimalware) y su estado.
- Componentes: indicadores, tablas de políticas, estado de agents.
- Integración: exponer endpoints para listar políticas, estados y permitir acciones (activar/desactivar), o sincronizar con APIs del vendor.

---

## `Prevention` (Prevención)
- Archivo: `src/pages/Prevention.tsx`.
- Propósito: métricas e índice de prevención consolidadas.
- Componentes reutilizados: `PreventionIndex`, `MiniStats`.
- Interacciones: navegar a la configuración de políticas, ver detalles de cobertura por área.

---

## `Devices` (Dispositivos)
- Archivo: `src/pages/Devices.tsx`.
- Propósito: inventario y estado de dispositivos (firewalls, switches, endpoints).
- Contenido:
  - Tabla con dispositivos, IP, OS, CPU/RAM, tráfico y estado.
  - Filtros y búsqueda.
- Fuente de datos: idealmente una API de inventario/CMDB. En el repo: datos de ejemplo en `src/data/mock.ts`.
- Interacciones: ver detalle dispositivo (puede abrir modal), ejecutar comandos remotos (si la infra lo permite).

---

## `Logs` (Registros)
- Archivo: `src/pages/Logs.tsx`.
- Propósito: visor de logs/alertas y export.
- Contenido: listado de eventos con timestamp, severidad, origen; posibilidad de búsqueda y filtrado.
- Integración: consumir API/ELK/SQL; paginación y streaming para performance.

---

## `AIAnalysis` (Análisis IA)
- Archivo: `src/pages/AIAnalysis.tsx`.
- Propósito: mostrar análisis avanzados, predicciones y recomendaciones (detalladas) generadas por modelos IA.
- Componentes: tablas de hallazgos, paneles de explicación, recomendaciones.
- Datos: `aiRecommendations` es ejemplo. En producción, llamar a un servicio IA o microservicio que analice telemetría.

---

## `Policies` (Políticas)
- Archivo: `src/pages/Policies.tsx`.
- Propósito: gestión y visualización de reglas (firewall, IPS, web filter).
- Funcionalidad esperada: CRUD de políticas, validación, preview de impacto.

---

## `Executive` (Dashboard ejecutivo)
- Archivo: `src/pages/Executive.tsx`.
- Propósito: vista resumida para gerencia con KPI claves y tendencias.
- Contenido: gráficos de alto nivel, tarjetas KPI y export PDF/CSV.
- Recomendación: limitar detalles técnicos y mostrar métricas agregadas y comparativas.

---

## `Settings` (Configuración)
- Archivo: `src/pages/Settings.tsx`.
- Propósito: configuración de la app (credenciales de API, integración, usuarios, temas).
- Recomendación: asegurar controls de acceso y validar cambios vía backend.

---

## `Login` (Pantalla de autenticación)
- Archivo: `src/pages/Login.tsx`.
- Propósito: entrada a la aplicación. Actualmente integra video de fondo y una pantalla de carga previa.
- Componentes: formulario de usuario/contraseña, botones de autenticación social, animaciones de estado (loading / success).
- Integración: enlazar `onLogin` a la autenticación real (OAuth2, SSO o API de autenticación) y manejar tokens (almacenamiento seguro).

---

# Ejemplos de payloads recomendados para integrar
- `LiveStats` (usado por `useLive` / `Overview`):
```
{
  sessions: 124500,
  eps: 245,
  countries: 38,
  devices: 2345,
  simulations: 4200,
  attacks: 320,
  threats: 190,
  riskScore: 42,
  cpu: 28,
  ram: 34,
  firewall: 88,
  ips: 75
}
```
- `topThreats` (lista):
```
[ { name, severity, count, iconKey } ]
```
- `attackSources` / `worldDots`: coordenadas y metadatos para `ThreatMap`.

# Recomendaciones de integración y pruebas
- Hooks `useLive*`: adaptarlos para suscribirse a un WebSocket o poll a una API y transformar los mensajes a las estructuras usadas por los componentes.
- Performance: las visualizaciones SVG/Canvas pueden requerir throttling cuando llegan muchos eventos.
- Pruebas: crear fixtures JSON en `docs/fixtures/` y agregar tests unitarios para render del componente con datos estáticos.

---

Si quieres, puedo:
- añadir ejemplos JSON concretos para cada componente en `docs/fixtures/`;
- insertar un enlace "¿Qué muestra esto?" en cada componente que abra `docs/DASHBOARD-PANELS.md` desde la UI (pequeño botón). Indica cuál prefieres.
