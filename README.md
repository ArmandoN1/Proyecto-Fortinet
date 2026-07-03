# Proyecto-Fortinet

Proyecto front-end construido con Vite + React + TypeScript + Tailwind.

Requisitos
- Node.js 18+ (recomendado)
- npm

Instalación y desarrollo
1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

3. Construir para producción:

```bash
npm run build
```

4. Previsualizar la build:

```bash
npm run preview
```

Video de fondo del login
- Coloca `kling_20260704_VIDEO_Create_a_c_867_0.mp4` en la carpeta `public/` para que el login reproduzca el video automáticamente.
- Si prefieres versionarlo en el repo, quita la entrada correspondiente en `.gitignore`.

Notas técnicas
- TypeScript está configurado con `ignoreDeprecations: "6.0"` temporalmente para silenciar la advertencia sobre `baseUrl`.

CI
- Incluimos un workflow básico de GitHub Actions que hace `npm ci`, `npx tsc --noEmit` y `npm run build` en Node 18.

