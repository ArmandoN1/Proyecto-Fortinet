**Resumen del Dashboard — Paneles y contenido integrado**

Este documento describe cada panel del dashboard, qué muestra, de dónde provienen los datos y las interacciones disponibles.

**Ubicación de los archivos**
- Código principal del dashboard: [src/pages/Overview.tsx](src/pages/Overview.tsx)
- Componentes: [src/components/](src/components/)
- Datos simulados y fuentes: [src/data/mock.ts](src/data/mock.ts)

---

**StatusCards**
- Archivo: [src/components/StatusCards.tsx](src/components/StatusCards.tsx)
- Prop(s): `stats: LiveStats`
- Propósito: Mostrar métricas clave en tarjetas (simulaciones, ataques, amenazas) y un indicador de riesgo general.
- Contenido:
  - Tres tarjetas principales con: etiqueta, valor numérico, delta comparativo y mini-gráfica sparkline.
  - Tarjeta adicional "RIESGO GENERAL" con un anillo de riesgo (`RiskRing`) que visualiza un `riskScore` y etiqueta BAJO/MEDIO/ALTO.
- Fuente de datos: `stats` (generado por `useLive` hook) y valores iniciales en `src/data/mock.ts` para pruebas.
- Interacciones: Hover y animaciones; no hay acciones directas (solo visualización rápida).

**SystemIndicators**
- Archivo: [src/components/SystemIndicators.tsx](src/components/SystemIndicators.tsx)
- Prop(s): `stats: LiveStats`
- Propósito: Indicadores circulares de estado del sistema (CPU, RAM, FIREWALL, IPS).
- Contenido:
  - Indicadores gráficos tipo gauge con porcentaje y un icono representativo.
- Fuente de datos: `stats` del `useLive` hook.
- Interacciones: Visuales, actualizaciones en tiempo real vía hook.

**ThreatMap**
- Archivo: [src/components/ThreatMap.tsx](src/components/ThreatMap.tsx)
- Propósito: Mapa interactivo/visual de origenes de ataques y conexiones hacia HQ.
- Contenido:
  - Matriz de puntos globales (`worldDots`), arcos que representan ataques activos y overlay con leyenda de tipos y orígenes.
  - Radar central que marca la ubicación HQ
- Fuente de datos: `data/world.ts` (posiciones y proyección), `src/data/mock.ts` para leyendas y porcentajes.
- Interacciones: Auto-rotación/animación de ataques; overlays informativos; no hay selección persistente por ahora.

**MiniStats**
- Archivo: [src/components/MiniStats.tsx](src/components/MiniStats.tsx)
- Prop(s): `stats: LiveStats`
- Propósito: Cuatro métricas compactas de alto nivel (sesiones, eventos/s, países, dispositivos).
- Contenido: Icono + etiqueta + número animado (useAnimatedNumber).
- Fuente de datos: `stats`.
- Interacciones: Animación numérica; presentación compacta en rejilla.

**ThreatList**
- Archivo: [src/components/ThreatList.tsx](src/components/ThreatList.tsx)
- Propósito: Lista de "Top Threats" (amenazas más activas).
- Contenido: Entrada por amenaza con icono, nombre, severidad (badge) y contador.
- Fuente de datos: `topThreats` y `severityColor` en `src/data/mock.ts`.
- Interacciones: Pulsable (botón "VER TODAS"). Cada fila tiene hover y puede expandirse en futuras versiones.

**PreventionIndex**
- Archivo: [src/components/PreventionIndex.tsx](src/components/PreventionIndex.tsx)
- Propósito: Medir la fortaleza de controles preventivos con un gauge principal y barras de métricas.
- Contenido:
  - Gauge visual (0–100) con gradiente y ticks.
  - Lista de métricas (Control de Aplicaciones, IPS, Antimalware, etc.) con barras de progreso.
- Fuente de datos: `preventionMetrics` en `src/data/mock.ts`.
- Interacciones: Visual; barras animadas (prop `delay`).

**SimulationCards**
- Archivo: [src/components/SimulationCards.tsx](src/components/SimulationCards.tsx)
- Propósito: Mostrar tipos de simulaciones disponibles y permitir ejecutar una simulación de ejemplo.
- Contenido:
  - Cards por tipo (`simulationTypes`): icono, conteo, delta y botón `SIMULAR`.
- Fuente de datos: `simulationTypes` en `src/data/mock.ts`.
- Interacciones: Botón `SIMULAR` que dispara una animación/contador y simula aumento en el número de ejecuciones.

**AIPanel**
- Archivo: [src/components/AIPanel.tsx](src/components/AIPanel.tsx)
- Propósito: Mostrar recomendaciones y hallazgos generados por IA.
- Contenido:
  - Lista de recomendaciones clasificadas por nivel (`critical`, `warning`, `info`) con iconos y detalles.
- Fuente de datos: `aiRecommendations` en `src/data/mock.ts`.
- Interacciones: Botón «VER MÁS RECOMENDACIONES» para navegar a detalle (pendiente implementación back-end).

**Timeline**
- Archivo: [src/components/Timeline.tsx](src/components/Timeline.tsx)
- Propósito: Línea de tiempo con los eventos recientes en streaming.
- Contenido: Lista de eventos con hora, título, subtítulo y un icono contextual.
- Fuente de datos: Hook `useLiveTimeline` que provee eventos (basado en `src/data/mock.ts`).
- Interacciones: Visual; se actualiza periódicamente.

**Charts (RiskChart, DeviceStatusChart)**
- Archivo: [src/components/Charts.tsx](src/components/Charts.tsx)
- Propósito: Visualizaciones detalladas de tendencias y estado de dispositivos.
- Contenido:
  - `RiskChart`: curva de evolución del riesgo con área y línea de tendencia.
  - `DeviceStatusChart`: gráfico tipo pie con distribución de dispositivos (Protegidos, Advertencia, Críticos).
- Fuente de datos: `riskHistory`, `deviceStatus` en `src/data/mock.ts`.
- Interacciones: Tooltips; responsive container para adaptar tamaño.

---

**Notas de integración y recomendaciones**
- Datos: Actualmente la mayor parte de la información proviene de `src/data/mock.ts` y hooks (`useLive`) para simular streaming. Para integrar datos reales, conectar los hooks a APIs (WebSocket / REST) y mapear el payload al `LiveStats` y estructuras de datos usadas.
- Accesibilidad: Asegurar contraste del texto y etiquetas ARIA para botones interactivos.
- Extensibilidad: Cada componente es autónomo y recibe props (muchos usan hooks internos). Para convertirlos en micro-paneles configurables, exponer props para controlar fuentes de datos, actualización y filtros.

---

Si quieres, puedo:
- Generar un archivo README más detallado con ejemplos de payloads JSON para cada panel.
- Añadir enlaces directos en cada componente hacia este doc (pequeño enlace "¿Qué muestra esto?").

