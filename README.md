# Futuristic Cybersecurity Dashboard

Este proyecto es un panel de seguridad cibernética tipo SOC/SIEM con estética futurista, animaciones de interfaz, visualización de métricas en tiempo real y flujo de navegación entre múltiples pantallas. El resultado actual ya integra diseño visual, arquitectura React + TypeScript, componentes reutilizables, datos simulados, hooks de tiempo real, páginas de dashboard y estilos avanzados con Tailwind y CSS personalizado.

## Visión general

La aplicación está construida como una experiencia inmersiva para monitorear amenazas, simulaciones, dispositivos, políticas, logs, recomendaciones de IA y métricas operativas. El panel está pensado para verse como un entorno de operación de ciberseguridad moderno, con un lenguaje visual inspirado en consoles de seguridad, neón, glassmorphism, overlays HUD y animaciones continuas.

## Stack tecnológico

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Recharts
- Lucide React
- clsx + tailwind-merge

## Funcionalidades ya integradas

- Pantalla de login con video de fondo, animaciones y transición a carga
- Pantalla de carga con efecto visual y cambio automático a dashboard
- Sidebar de navegación con modo SOC/LAB
- Header con reloj, estado del sistema, modo de operación y acciones rápidas
- Dashboard de resumen con múltiples paneles visuales
- Mapa global de amenazas con arcos y puntos de origen
- Tarjetas de estado con métricas y sparkline
- Indicadores de sistema (CPU, RAM, Firewall, IPS)
- Lista de amenazas activas
- Gauge de prevención y barras de control
- Simulaciones de ejemplo con interacción local
- Panel IA con recomendaciones y alertas
- Línea de tiempo de eventos
- Gráficas de riesgo y distribución de dispositivos
- Páginas adicionales para ataques, prevención, protección, dispositivos, logs, políticas, objetivos, ejecutivo y configuración
- Estilos holográficos, neón, efectos de scanline, parpadeo, glass, bordes y animaciones de entrada

## Estructura del proyecto

```text
src/
  App.tsx
  index.css
  main.tsx
  components/
    AIPanel.tsx
    Charts.tsx
    Header.tsx
    MiniStats.tsx
    Particles.tsx
    PreventionIndex.tsx
    Sidebar.tsx
    SimulationCards.tsx
    StatusCards.tsx
    SystemIndicators.tsx
    ThreatList.tsx
    ThreatMap.tsx
    Timeline.tsx
    ui.tsx
  data/
    mock.ts
    world.ts
  hooks/
    useLive.ts
  pages/
    AIAnalysis.tsx
    Attacks.tsx
    Devices.tsx
    Executive.tsx
    Loading.tsx
    Login.tsx
    Logs.tsx
    Objectives.tsx
    Overview.tsx
    Policies.tsx
    Prevention.tsx
    Protection.tsx
    Settings.tsx
    Simulations.tsx
  utils/
    cn.ts
```

## Arquitectura general

La aplicación sigue un patrón simple pero potente:

1. App.tsx actúa como orquestador general.
2. Maneja el ciclo de fases: login → loading → dashboard.
3. Controla la página activa seleccionada desde la sidebar.
4. Inyecta los datos en vivo simulados mediante hooks.
5. Cada página renderiza un conjunto de componentes visuales reutilizables.
6. El diseño visual se centraliza en index.css y en clases utilitarias creadas con Tailwind.

## Flujo de integración de la app

### 1. Inicio y autenticación
La experiencia inicia en la pantalla de login. Allí se muestra un panel futurista con:
- fondo video
- HUD decorativo
- campos de usuario y contraseña
- animación de carga
- transición al dashboard tras autenticación simulada

El componente Login no realiza autenticación real todavía; en su flujo actual simula un proceso de validación y luego invoca la función onLogin para pasar a la siguiente fase.

### 2. Carga inicial
La pantalla Loading sirve como transición entre la autenticación y el dashboard. Está pensada para ser usada cuando se necesite inicializar datos, verificar credenciales o preparar la sesión.

### 3. Dashboard principal
Una vez en App.tsx, el sistema selecciona la vista activa según el menú. El main content cambia dinámicamente entre las páginas, mientras el Header, Sidebar y el fondo global permanecen consistentes.

### 4. Datos en tiempo real simulados
El hook useLiveStats genera métricas como:
- sesiones
- eventos por segundo
- países involucrados
- dispositivos
- CPU y RAM
- firewall e IPS
- riesgo general

Estas métricas se actualizan periódicamente para dar sensación de “vivo” sin depender todavía de una API externa.

### 5. Renderizado de paneles
La página Overview compone los widgets principales del dashboard. Cada pieza consume datos de mocks o de hooks y se adapta al diseño general del sistema.

## Componentes

### [src/components/Sidebar.tsx](src/components/Sidebar.tsx)
Responsable de la navegación lateral. Muestra los módulos del SOC, marca la opción activa, incluye badges y un panel de hardware del FortiGate. Se integra directamente con App.tsx mediante la prop active y onSelect.

### [src/components/Header.tsx](src/components/Header.tsx)
Contiene la barra superior con:
- título y subtítulo de la sección actual
- alternador entre modo SOC y LAB
- reloj en tiempo real
- estado del sistema
- botones de notificaciones, configuración, pantalla completa y cierre de sesión

### [src/components/Particles.tsx](src/components/Particles.tsx)
Genera el fondo animado con efecto de partículas. Se utiliza como capa visual de fondo del dashboard para reforzar la estética de consola de seguridad.

### [src/components/StatusCards.tsx](src/components/StatusCards.tsx)
Muestra tarjetas clave del estado del sistema. Presenta métricas como simulaciones, ataques, amenazas y riesgo general, cada una con un estilo visual propio y un sparkline como soporte visual.

### [src/components/SystemIndicators.tsx](src/components/SystemIndicators.tsx)
Renderiza indicadores circulares de recursos y protección. Se usa para mostrar CPU, RAM, Firewall e IPS con una interpretación visual inmediata del estado del sistema.

### [src/components/ThreatMap.tsx](src/components/ThreatMap.tsx)
Representa visualmente la procedencia de ataques sobre un mapa estilizado. Usa datos de [src/data/world.ts](src/data/world.ts) para proyectar coordenadas geográficas y dibujar arcos animados hacia el centro del dashboard.

### [src/components/MiniStats.tsx](src/components/MiniStats.tsx)
Muestra un bloque compacto de KPIs de alto nivel: sesiones analizadas, eventos por segundo, países involucrados y dispositivos protegidos. Usa animación numérica para que los valores parezcan dinámicos.

### [src/components/ThreatList.tsx](src/components/ThreatList.tsx)
Muestra las amenazas más activas con severidad y conteo. Sirve como resumen rápido de la actividad del entorno.

### [src/components/PreventionIndex.tsx](src/components/PreventionIndex.tsx)
Muestra un gauge de prevención junto con barras de métricas por control. Está pensado para resumir la fortaleza de la postura de seguridad.

### [src/components/SimulationCards.tsx](src/components/SimulationCards.tsx)
Muestra cartas de simulación con su tipo, contador y botón de ejecución. Incluye interacción local para simular el arranque de una prueba y actualizar el estado visual.

### [src/components/AIPanel.tsx](src/components/AIPanel.tsx)
Presenta recomendaciones generadas por IA, organizadas por criticidad. El panel está dispuesto como una capa de soporte para alertas y sugerencias operativas.

### [src/components/Timeline.tsx](src/components/Timeline.tsx)
Muestra una línea temporal de eventos recientes con iconos y etiquetas. Se integra con el hook de timeline para simular eventos entrantes.

### [src/components/Charts.tsx](src/components/Charts.tsx)
Contiene dos visualizaciones:
- RiskChart: evolución del riesgo en el tiempo
- DeviceStatusChart: distribución del estado de los dispositivos

Ambas usan Recharts y datos desde [src/data/mock.ts](src/data/mock.ts).

### [src/components/ui.tsx](src/components/ui.tsx)
Contiene componentes visuales auxiliares y utilidades reutilizables como barras de progreso y helpers de UI. Centraliza elementos visuales para mantener consistencia entre paneles.

## Datos y modelo de información

### [src/data/mock.ts](src/data/mock.ts)
Es la capa de datos de ejemplo que alimenta gran parte de la interfaz actual. Define:
- items de menú
- amenazas top
- colores por severidad
- métricas de prevención
- tipos de simulación
- recomendaciones de IA
- eventos de timeline
- leyenda de orígenes de ataques
- estado de dispositivos
- historial de riesgo

Este archivo es el punto de transición perfecto para conectar luego una API real, un backend o un WebSocket.

### [src/data/world.ts](src/data/world.ts)
Contiene una representación simplificada de un mapa mundial en forma de puntos y coordenadas. Se usa para dibujar la vista de ThreatMap y proyectar los orígenes de ataque de forma visual.

## Hooks

### [src/hooks/useLive.ts](src/hooks/useLive.ts)
Es el corazón del comportamiento dinámico. Incluye:

- useClock: reloj local actualizado cada segundo
- useLiveStats: métricas cambian periódicamente para dar sensación de tiempo real
- useLiveTimeline: inserta eventos en la línea temporal de forma dinámica
- useLiveSeries: genera una serie temporal utilizada para visualizaciones
- useAnimatedNumber: anima valores numéricos cuando cambian
- formatCompact: formatea grandes números para que la UI se vea limpia

La idea de este hook es que, cuando haya una integración real, solo se reemplace la fuente de datos y la interfaz seguirá funcionando igual.

## Páginas

### [src/pages/Overview.tsx](src/pages/Overview.tsx)
Es la vista principal del dashboard. Compone la experiencia resumida con todos los paneles de monitoreo, métricas y alertas. Es la página de entrada del sistema.

### [src/pages/Simulations.tsx](src/pages/Simulations.tsx)
Vista enfocada en simulaciones. Está pensada para mostrar catálogos, resultados y ejecución controlada de pruebas de seguridad.

### [src/pages/Attacks.tsx](src/pages/Attacks.tsx)
Vista orientada a incidentes, detecciones y análisis de ataques. Se espera que en una versión más avanzada muestre tablas, filtros y detalles de eventos.

### [src/pages/Protection.tsx](src/pages/Protection.tsx)
Vista para el estado de módulos de protección como firewall, IPS, antivirus y componentes del Security Fabric.

### [src/pages/Prevention.tsx](src/pages/Prevention.tsx)
Vista de prevención y fortaleza de controles. Se centra en la cobertura preventiva y recomendación de mejoras.

### [src/pages/Devices.tsx](src/pages/Devices.tsx)
Vista de inventario y estado de dispositivos. Está preparada para convertirse en una tabla o resumen más completo con filtros y detalle por equipo.

### [src/pages/Logs.tsx](src/pages/Logs.tsx)
Vista para eventos, auditoría y exportación de reportes. Es el lugar natural para mostrar registros de sistema y correlación de alertas.

### [src/pages/AIAnalysis.tsx](src/pages/AIAnalysis.tsx)
Vista dedicada al análisis avanzado con IA. Está pensada para mostrar hallazgos, predicciones y recomendaciones más detalladas.

### [src/pages/Policies.tsx](src/pages/Policies.tsx)
Vista para políticas de seguridad y control de acceso. Está preparada para evolucionar a una consola de gestión de reglas.

### [src/pages/Objectives.tsx](src/pages/Objectives.tsx)
Vista orientada a objetivos, KPI y cumplimiento de seguridad.

### [src/pages/Executive.tsx](src/pages/Executive.tsx)
Vista ejecutiva para gerencia y nivel directivo, con métricas resumidas y tendencias.

### [src/pages/Settings.tsx](src/pages/Settings.tsx)
Vista para configuración general del producto, usuarios, conectores y preferencias.

### [src/pages/Login.tsx](src/pages/Login.tsx)
Pantalla principal de acceso con estética HUD, animaciones y transición visual.

### [src/pages/Loading.tsx](src/pages/Loading.tsx)
Pantalla intermedia para carga o transición antes de entrar al dashboard.

## Utilidades

### [src/utils/cn.ts](src/utils/cn.ts)
Pequeña utilidad para combinar clases CSS de forma limpia. Se usa para mantener lógica simple al aplicar clases condicionales en componentes React.

## Estilos y diseño visual

El aspecto visual completo de la app está definido principalmente en [src/index.css](src/index.css). Allí se incluyen:

- variables de color neón
- background de circuito
- glassmorphism
- overlays HUD con brackets en esquinas
- animaciones de entrada y de carga
- efectos de scanline, radar y pulso
- estilos para login, botones, cards y paneles

Los estilos están pensados para ser modernos, inmersivos y consistentes con una identidad visual de consola cibersegura.

## Cómo funciona la integración actual

La integración actual funciona de forma local y visualmente completa:

- App.tsx orquesta la navegación y el estado de fase.
- Los componentes visuales reciben datos ya preparados desde mocks o hooks.
- Los hooks simulan flujos de tiempo real con intervalos.
- Las páginas comparten un mismo layout visual y reutilizan componentes.
- El diseño global se mantiene uniforme gracias a index.css y a las clases de Tailwind.

Esto permite que la aplicación esté lista para recibir datos reales sin rediseñar la estructura. Solo hace falta sustituir la fuente de datos actual por una API, WebSocket o servicio backend.

## Instalación y ejecución

### Requisitos
- Node.js 18 o superior
- npm

### Instalar dependencias

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

### Construir para producción

```bash
npm run build
```

### Vista previa de la build

```bash
npm run preview
```

## Video de fondo del login

El login intenta reproducir un video de fondo localizado en:

```text
public/kling_20260704_VIDEO_Create_a_c_867_0.mp4
```

Si el archivo no existe, la pantalla seguirá funcionando sin el video, aunque se verá con el fondo estático correspondiente.

## Notas de mantenimiento

- Los datos actuales están simulados para mostrar la experiencia completa.
- El proyecto está preparado para convertirse en una interfaz conectada a servicios reales.
- Los componentes están desacoplados y son fáciles de extender.
- El sistema visual está centralizado, lo que facilita cambios de estilo globales.

## Próximos pasos recomendados

- Conectar los hooks a un backend real o WebSocket
- Sustituir mocks por respuestas de API
- Añadir autenticación real con token y sesión persistente
- Implementar filtrado y detalle de eventos en páginas como Attacks y Logs
- Añadir tests unitarios y de UI
- Preparar la app para despliegue en producción con variables de entorno

## Integración completa para un dashboard operativo

Para que este dashboard pueda funcionar de forma real y escalable, además del frontend visual ya implementado, es necesario completar una capa de backend e integración de datos. El objetivo es que la interfaz deje de depender solo de mocks y pase a consumir información viva, persistida y analizada automáticamente.

### 1. Conexión a una base de datos

La base de datos debe almacenar toda la información que alimenta el panel y que permita análisis histórico, alertas, correlación y trazabilidad.

#### Propuesta de arquitectura de datos

- Base de datos relacional o tiempo-serie para almacenar eventos y métricas.
- PostgreSQL como opción recomendada por su robustez, soporte para JSONB y facilidad de integración con servicios modernos.
- TimescaleDB o una estrategia de particionado si se espera alto volumen de eventos por segundo.

#### Entidades recomendadas

- devices: inventario de endpoints, firewalls, servidores, switches y otros activos.
- alerts: incidentes, amenazas, bloqueos y eventos de seguridad detectados.
- telemetry: métricas en tiempo real como CPU, RAM, tráfico, uso de red y estado de sensores.
- policies: reglas de firewall, IPS, DLP y control de acceso.
- users: cuentas y permisos del sistema.
- ai_insights: resultados generados por IA, recomendaciones y explicaciones.
- audit_logs: trazabilidad de cambios, acciones del operador y eventos del sistema.

#### Flujo recomendado

1. Los agentes o conectores recolectan información desde dispositivos y herramientas de seguridad.
2. El backend recibe los eventos vía API REST, WebSocket o mensajería.
3. Los datos se normalizan y se almacenan en la base de datos.
4. El frontend consulta los recursos consolidados para renderizar métricas, mapas y listas.
5. Se mantienen tablas históricas para comparativas, tendencias y análisis de comportamiento.

### 2. API de recopilación de información

Para que el dashboard sea funcional en producción, se recomienda implementar una API que exponga endpoints para recibir y devolver datos.

#### Endpoints sugeridos

- POST /api/telemetry: ingesta de métricas y estados en tiempo real.
- POST /api/alerts: registro de nuevas alertas o incidentes.
- GET /api/alerts: listado de alertas activas o históricas.
- GET /api/devices: inventario completo de dispositivos.
- GET /api/policies: políticas vigentes.
- GET /api/metrics/summary: KPIs ejecutivos y métricas del dashboard.
- GET /api/ai/recommendations: recomendaciones generadas por IA.

#### Recomendación de arquitectura backend

- Node.js + Express o NestJS para la API.
- Prisma o TypeORM para la capa de acceso a datos.
- WebSockets para streaming de eventos en tiempo real.
- Queues como RabbitMQ o Kafka si se requieren cargas altas y procesamiento asíncrono.

### 3. Integración con API de IA

La integración de IA puede convertir el dashboard de un panel visual en una consola inteligente capaz de analizar, resumir, priorizar y recomendar acciones.

#### Casos de uso recomendados

- detectar anomalías en el tráfico o comportamiento de usuarios
- resumir alertas complejas en lenguaje natural
- priorizar incidentes según criticidad y contexto
- proponer acciones de mitigación o contención
- generar narrativas ejecutivas para reportes y presentaciones

#### Flujo de IA sugerido

1. El backend recoge eventos y métricas desde la base de datos.
2. Se construye un contexto estructurado con alertas, dispositivos, políticas y tendencias.
3. Se envía ese contexto a una API de IA como OpenAI, Azure OpenAI o un modelo local desplegado.
4. El modelo devuelve recomendaciones, resúmenes o puntuaciones de riesgo.
5. Los resultados se almacenan y se exponen al frontend para mostrarlos en paneles como AIPanel, Executive o Overview.

#### Ejemplo de respuesta esperada

```json
{
  "risk_score": 78,
  "summary": "Se detectó un patrón de acceso anómalo en varios dispositivos con comportamiento sospechoso.",
  "recommendations": [
    "Aislar el segmento afectado",
    "Revisar credenciales comprometidas",
    "Aplicar parcheo inmediato"
  ],
  "priority": "high"
}
```

### 4. Conexión del frontend con los servicios reales

El frontend ya está preparado para evolucionar a una arquitectura de datos real. El cambio sería principalmente este:

- reemplazar los mocks de [src/data/mock.ts](src/data/mock.ts) por llamadas a la API
- sustituir los hooks simulados de [src/hooks/useLive.ts](src/hooks/useLive.ts) por datos provenientes de WebSocket o polling
- consumir endpoints de alertas, métricas, dispositivos y recomendaciones
- mantener la capa visual actual sin reescribir el diseño

### 5. Seguridad y producción

Para que el sistema sea seguro y estable en producción, se recomienda:

- autenticación real con JWT o sesiones seguras
- control de permisos por rol
- cifrado de datos sensibles
- rate limiting en la API
- logging y auditoría de acciones
- monitoreo de salud del servicio y de la base de datos
- respaldo y recuperación ante fallos

### 6. Roadmap de integración recomendada

1. Crear el backend y definir el esquema de base de datos.
2. Implementar ingestión para eventos y métricas.
3. Exponer APIs para dashboard y alertas.
4. Integrar IA para análisis y recomendaciones.
5. Conectar el frontend a esos endpoints.
6. Añadir autenticación real, roles y paneles operativos avanzados.
## Qué falta integrar para que el proyecto funcione al 100%

Para que este dashboard deje de ser una maqueta visual y se convierta en una herramienta real de análisis de ciberseguridad, faltan integrar varias capas clave. Estas son las piezas que deben completarse para que el proyecto funcione de verdad y permita analizar tipos de ataques desde el backend.

### 1. Backend de ingestión de eventos

El frontend actual muestra datos simulados, pero no recibe información real ni procesada de forma continua. Es necesario crear un backend que reciba eventos de seguridad desde diferentes fuentes, como:

- firewalls
- sistemas EDR/XDR
- IDS/IPS
- servidores
- aplicaciones web
- proxies
- sistemas de correo
- logs de red y endpoint

Ese backend debe ser el encargado de normalizar y clasificar los eventos para que el dashboard pueda representarlos correctamente.

### 2. Clasificación automática de tipos de ataque

El sistema debe poder analizar los eventos y clasificarlos en categorías como:

- malware
- ransomware
- phishing
- intrusión
- fuerza bruta
- DDoS
- explotación de vulnerabilidades
- botnet
- exfiltración
- escaneo de red

Esta clasificación debe ejecutarse en el backend, no en el frontend. El backend puede hacer esto mediante:

- reglas definidas
- correlación de eventos
- modelos de detección
- IA para contexto y resumen
- heurísticas de comportamiento anómalo

La idea es que el dashboard no solo muestre que hubo un ataque, sino también qué tipo de ataque fue, con qué severidad, desde dónde y qué recomendación se debe aplicar.

### 3. Base de datos para historial y correlación

La información debe persistirse en una base de datos para poder:

- comparar ataques por hora, día o semana
- ver tendencias históricas
- correlacionar eventos que ocurren en distintos puntos del entorno
- generar reportes y alertas
- alimentar dashboards ejecutivos y operativos

Se recomienda que el backend almacene:

- eventos crudos
- alertas procesadas
- tipo de amenaza detectada
- severidad
- origen
- destino
- estado de mitigación
- evidencia o contexto asociado

### 4. Motor de reglas o correlación

Para que el sistema analice ataques de forma útil, el backend necesita un motor que pueda correlacionar múltiples señales. Por ejemplo:

- un intento de login fallido repetido desde la misma IP
- un acceso anómalo a varios hosts
- un archivo encriptado seguido de conexiones salientes sospechosas
- un correo phishing seguido de múltiples clics y descargas

Este motor puede implementarse con:

- reglas simples de negocio
- reglas de correlación temporal
- reglas probabilísticas
- modelos de IA para clasificación

### 5. API de análisis de amenazas

El backend debe exponer una API que permita:

- recibir eventos de seguridad y clasificarlos
- devolver alertas procesadas al frontend
- devolver resumen ejecutivo por tipo de amenaza
- devolver recomendaciones de mitigación
- devolver métricas por severidad, origen y tiempo

Ejemplo de endpoint:

- POST /api/attacks/analyze
- GET /api/attacks
- GET /api/attacks/types
- GET /api/attacks/summary

### 6. Integración con IA para análisis contextual

La IA no debería reemplazar la detección, sino complementar el procesamiento. Su función ideal es:

- resumir alertas complejas
- interpretar patrones de comportamiento
- generar recomendaciones accionables
- traducir datos técnicos a lenguaje claro para usuarios y directivos

Por ejemplo, el backend podría enviar a la IA un conjunto de eventos y recibir una conclusión como:

- ataque de phishing coordinado
- posible compromisos de credenciales
- alta probabilidad de movimiento lateral
- recomendación de aislamiento inmediato

### 7. Seguridad de la integración

Para que el sistema sea serio y seguro, hay que incluir:

- autenticación del backend
- validación de origen de eventos
- permisos por rol
- cifrado de datos sensibles
- control de integridad de eventos
- trazabilidad de cada acción de análisis

### 8. Qué debería ver el frontend final

Una vez completadas estas capas, el dashboard debería poder mostrar de forma real:

- tipos de ataques detectados
- severidad por evento
- origen geográfico o IP de los ataques
- frecuencia y tendencia de incidentes
- recomendaciones automáticas de IA
- estado de contención o mitigación
- alertas en tiempo real y su historial

## Propuesta formal de arquitectura backend recomendada

La estructura ideal para este producto sería la siguiente:

### 1. Arquitectura general

- Frontend: React + TypeScript + Vite + Tailwind
- Backend: Node.js con NestJS o Express
- Base de datos: PostgreSQL o TimescaleDB
- Cola de eventos: RabbitMQ o Kafka si el volumen crece
- Servicios de IA: Azure OpenAI, OpenAI u otro proveedor compatible
- Motor de detección: reglas de negocio, correlación de eventos y análisis contextual con IA

### 2. Capas del sistema

1. Capa de ingesta
   - recibe eventos de firewalls, EDR/XDR, IDS/IPS, logs y otros sensores
   - valida y normaliza los eventos
   - los publica a la cola de procesamiento

2. Capa de procesamiento
   - clasifica los eventos por tipo de amenaza
   - calcula severidad y contexto
   - correlaciona eventos relacionados
   - genera alertas y recomendaciones

3. Capa de persistencia
   - almacena eventos brutos, alertas, métricas, políticas y resultados de IA
   - mantiene historial para análisis y reporting

4. Capa de API
   - expone endpoints para el frontend
   - devuelve métricas, alertas, amenazas y recomendaciones

5. Capa de presentación
   - consume los datos del backend y los muestra en el dashboard visual actual

### 3. Esquema de base de datos recomendado

Se recomienda una estructura con tablas para eventos, alertas, métricas, dispositivos, políticas, usuarios y resultados de IA.

```sql
CREATE TABLE devices (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  ip VARCHAR(64),
  status VARCHAR(50),
  os VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE alerts (
  id UUID PRIMARY KEY,
  device_id UUID REFERENCES devices(id),
  title VARCHAR(255) NOT NULL,
  severity VARCHAR(50) NOT NULL,
  attack_type VARCHAR(100),
  description TEXT,
  status VARCHAR(50) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE telemetry (
  id UUID PRIMARY KEY,
  device_id UUID REFERENCES devices(id),
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC NOT NULL,
  collected_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE policies (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ai_insights (
  id UUID PRIMARY KEY,
  alert_id UUID REFERENCES alerts(id),
  risk_score INT,
  summary TEXT,
  recommendations JSONB,
  priority VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Endpoints principales recomendados

#### Autenticación

- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

#### Dispositivos

- GET /api/devices
- GET /api/devices/:id
- POST /api/devices

#### Alertas y ataques

- GET /api/alerts
- GET /api/alerts/:id
- POST /api/alerts
- GET /api/attacks/types
- GET /api/attacks/summary
- POST /api/attacks/analyze

#### Métricas y dashboard

- GET /api/metrics/summary
- GET /api/metrics/series
- GET /api/metrics/live

#### IA y recomendaciones

- GET /api/ai/recommendations
- POST /api/ai/analyze

### 5. Flujo completo de análisis de ataques

Este es el flujo recomendado desde la ingesta hasta la interfaz:

1. Ingesta de eventos
   - un sensor o conector envía un evento al backend

2. Normalización
   - el backend transforma el dato a un formato interno estándar

3. Clasificación
   - se identifica el tipo de ataque: malware, phishing, intrusión, DDoS, etc.

4. Correlación
   - se unen eventos relacionados para detectar campañas o patrones

5. Evaluación de severidad
   - se calcula el impacto y prioridad del evento

6. Generación de alerta
   - se crea una alerta en base de datos con contexto y severidad

7. Análisis con IA
   - el sistema envía el contexto a la API de IA para obtener resumen y recomendaciones

8. Persistencia
   - la alerta, el análisis y la recomendación se almacenan para trazabilidad

9. Consumo por el frontend
   - la UI consume esos datos y los muestra en tarjetas, mapas, timelines y gráficas

## Plan de implementación ejecutivo

Este proyecto ya tiene una base visual sólida, pero para pasar de demo a plataforma operativa se recomienda ejecutar la implementación en etapas claras, con entregables medibles y prioridad funcional.

### Fase 1 — Base técnica y estructura backend

Objetivo: dejar preparado el entorno para recibir datos reales y exponer servicios al frontend.

Entregables:
- creación del backend con Node.js + NestJS o Express
- configuración de base de datos PostgreSQL
- estructura de carpetas por módulos: auth, devices, alerts, telemetry, ai
- endpoints base de health check y autenticación

Prioridad: alta

### Fase 2 — Ingesta de eventos y persistencia

Objetivo: recibir información de seguridad y almacenarla de forma estructurada.

Entregables:
- endpoint para recibir eventos de seguridad
- endpoint para registrar alertas
- endpoint para almacenar métricas en tiempo real
- tablas de dispositivos, alertas, telemetry y políticas
- lógica mínima de validación y normalización

Prioridad: alta

### Fase 3 — Clasificación y correlación de ataques

Objetivo: convertir eventos crudos en alertas entendibles y clasificables.

Entregables:
- motor de reglas para clasificar tipos de ataque
- lógica de severidad
- correlación de eventos relacionados
- endpoints para consultar ataques y resúmenes por tipo

Tipos de ataques que deberían soportar:
- ransomware
- phishing
- intrusión
- malware
- fuerza bruta
- DDoS
- explotación de vulnerabilidades
- botnet
- escaneo
- exfiltración

Prioridad: alta

### Fase 4 — Integración con IA para análisis contextual

Objetivo: transformar los datos en recomendaciones útiles para operadores y directivos.

Entregables:
- servicio de IA para resumir alertas
- generación de recomendaciones accionables
- scoring de riesgo por incidente
- endpoint para consultar insights de IA

Prioridad: media-alta

### Fase 5 — Integración con el frontend

Objetivo: que la interfaz actual deje de mostrar solo mocks y consuma datos reales.

Entregables:
- reemplazo de mock data por consumo de API
- hooks conectados a endpoints reales
- actualización de los paneles para mostrar alertas y tendencias reales
- streaming en tiempo real para mapas, timelines y métricas

Prioridad: alta

### Fase 6 — Producción y operación

Objetivo: dejar el sistema listo para uso real y seguro.

Entregables:
- autenticación real con roles y permisos
- logs de auditoría
- seguridad por capas y cifrado
- monitoreo, alertas del sistema y backup
- despliegue con variables de entorno y pipeline CI/CD

Prioridad: media

## Entregables mínimos para considerar el proyecto listo

El proyecto se podría considerar funcional al 100% cuando cumpla con los siguientes puntos:

- recibe y almacena eventos reales de seguridad
- detecta y clasifica tipos de ataque
- correlaciona eventos y genera alertas operativas
- expone datos claros al frontend
- muestra recomendaciones accionables mediante IA
- permite trazabilidad, seguridad y uso real por parte de operadores

## Qué necesitan ver tus compañeros para entender el proyecto

Para que el proyecto sea claro para el equipo, además del código y del README, conviene dejar documentados estos puntos clave:

### 1. Qué hace el proyecto hoy

- muestra un dashboard visual de ciberseguridad con estética futurista
- simula métricas en tiempo real
- presenta amenazas, ataques, dispositivos, políticas y recomendaciones
- permite navegar entre varias vistas del SOC

### 2. Qué falta para que sea funcional de verdad

- backend real para recibir y procesar eventos
- base de datos persistente
- motor de clasificación de ataques
- correlación de alertas
- integración con IA para recomendaciones
- autenticación y permisos reales

### 3. Cómo se vería la arquitectura final

El equipo debería entender que el proyecto tiene dos capas principales:

- frontend: interfaz visual y experiencia de usuario
- backend: ingesta, procesamiento, análisis y persistencia

Sin esa separación, el dashboard solo sería una demo visual.

### 4. Qué se debe definir antes de empezar a programar

Antes de desarrollar la siguiente fase, conviene acordar:

- qué fuentes de datos van a alimentar el sistema
- qué tipos de ataques se priorizan
- qué métricas deben aparecer en el dashboard
- qué nivel de IA se quiere integrar
- qué base de datos se usará
- qué permisos y roles tendrán los usuarios

### 5. Qué entregables deben ver en el proyecto

Para que el equipo lo entienda rápido, el proyecto debería incluir:

- una arquitectura clara de backend
- un esquema de base de datos inicial
- endpoints principales documentados
- ejemplos de payloads de eventos y alertas
- una propuesta de flujo desde ingesta hasta visualización
- una lista de prioridades para desarrollo incremental

### 6. Qué conviene mostrar en una reunión con el equipo

Si lo van a presentar, lo más útil es mostrar:

1. el estado actual del frontend
2. lo que ya está funcionando visualmente
3. lo que falta integrar para convertirlo en producto real
4. la propuesta de arquitectura backend
5. el plan de implementación por fases

## Resumen final para compartir con el equipo

Este proyecto ya demuestra una base sólida de interfaz de seguridad cibernética: visualmente es potente, está bien estructurado y ofrece una experiencia de usuario moderna. Sin embargo, para pasar de una demo a una plataforma real, el siguiente salto importante es integrar la capa de backend y análisis de datos.

En resumen, lo que hace falta es:

- conectar el frontend con datos reales
- recopilar información desde fuentes de seguridad
- almacenar esa información en una base de datos
- analizar eventos para identificar tipos de ataque
- correlacionar alertas y generar contexto operativo
- usar IA para resumen y recomendaciones
- dejar el sistema listo para producción con seguridad y permisos reales

Con estas capas integradas, este dashboard dejará de ser una maqueta visual para convertirse en una herramienta real de monitoreo, análisis y respuesta ante amenazas.

El siguiente paso lógico es comenzar por la arquitectura backend, la base de datos y los primeros endpoints de ingestión y alertas.

Lo que falta integrar para que este proyecto funcione de verdad es la parte de backend y análisis de eventos. El frontend ya está bien visualmente, pero para que sea funcional al 100% hace falta:

- recibir datos reales desde fuentes de seguridad
- almacenar esa información en una base de datos
- clasificar automáticamente los tipos de ataque
- correlacionar eventos y generar alertas
- exponer una API para que el dashboard consuma esos resultados
- integrar IA para análisis contextual y recomendaciones

Sin estas capas, el proyecto seguirá siendo una demo visual. Con ellas, se convierte en una plataforma real de monitoreo y análisis de seguridad.
## Mapa de navegación del producto

La experiencia está pensada como una consola modular con un flujo claro:

1. Login: punto de entrada y presentación visual del producto.
2. Loading: transición de arranque y preparación de sesión.
3. Dashboard principal: resumen ejecutivo y visión operativa.
4. Módulos especializados: simulaciones, ataques, prevención, protección, dispositivos, logs, políticas, objetivos y ejecutivo.
5. Configuración: cierre del ciclo de administración y personalización.

Esta estructura permite que la interfaz crezca sin perder coherencia visual ni de usabilidad.

## Flujo de datos y composición de la UI

El flujo actual sigue este patrón:

- App.tsx obtiene el estado global de la vista y gestiona las fases de autenticación y navegación.
- Los hooks de [src/hooks/useLive.ts](src/hooks/useLive.ts) generan datos dinámicos simulados.
- Los datos se pasan a los componentes visuales desde la página principal o desde las vistas específicas.
- Cada componente renderiza su propia capa visual y se mantiene enfocado en una responsabilidad concreta.
- El diseño global se comparte mediante [src/index.css](src/index.css), evitando repetir estilos en cada pantalla.

En una integración real, este mismo flujo podría reemplazarse por llamadas a APIs, WebSockets o servicios de evento sin reescribir el modelo de interfaz.

## Experiencia de usuario y microinteracciones

El dashboard no solo muestra información, sino que también ofrece una experiencia de uso inmersiva:

- animaciones de entrada al cambiar de sección
- transiciones suaves en botones, cards y paneles
- efectos HUD para reforzar la identidad cyber
- scanlines, pulso de red, brillo neón y overlays visuales
- animación del login con parpadeos, hologramas y cambio de estado
- interacción de simulaciones con feedback visual inmediato

Estas microinteracciones hacen que el producto se sienta vivo y orientado a operaciones en tiempo real.

## Patrones de diseño aplicados

El proyecto ya aplica varios patrones de arquitectura y diseño de interfaz:

- separación entre vistas y componentes reutilizables
- centralización del estilo visual en CSS global y clases Tailwind
- uso de hooks para lógica dinámica y estados de tiempo real
- uso de datos mock como capa inicial para prototipado y validación
- diseño modular para facilitar la sustitución de módulos por servicios reales

Esto lo convierte en una base sólida para evolucionar hacia un producto más complejo o empresarial.

## Guía de extensibilidad

Para añadir nuevas funcionalidades de forma ordenada, se recomienda:

- crear nuevas páginas en [src/pages](src/pages) siguiendo la misma estructura visual de las existentes
- reutilizar componentes en [src/components](src/components) en lugar de duplicar UI
- encapsular lógica nueva en hooks propios en [src/hooks](src/hooks)
- mantener los datos de ejemplo en [src/data](src/data) como fuente de referencia o fixture inicial
- conectar cada módulo a un adaptador de datos cuando se integre con APIs reales

## Resumen ejecutivo del avance actual

El proyecto ya no es solo una maqueta visual: es una base funcional de dashboard ciberseguro con:

- navegación completa entre múltiples vistas
- sistema visual cohesionado y premium
- componentes reutilizables y listos para escalar
- datos en vivo simulados con comportamiento dinámico
- arquitectura preparada para integración con backend y servicios de seguridad reales

Este README documenta el avance completo del dashboard, desde la arquitectura y el diseño hasta la integración de componentes, datos, hooks, páginas y estilos ya implementados.

