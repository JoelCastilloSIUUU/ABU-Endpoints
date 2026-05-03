# Principal en React + Vite + JSX

Esta versión mantiene Express/Pug para login, registro y las demás páginas. Solo la ruta `/principal` carga una app React compilada con Vite.

## Qué se agregó

- `app_client/principal/src/main.jsx`: página principal hecha en React con JSX.
- `app_client/principal/src/principal.css`: estilos propios de la vista principal.
- `vite.config.js`: compila React hacia `public/principal-react`.
- `app_server/views/principal.pug`: ahora monta React sin tocar las otras vistas.
- `package.json`: agrega React, ReactDOM, Vite y scripts de build.

## Comandos para instalar y correr localmente

```bash
npm install
npm run build
npm start
```

La aplicación Express queda corriendo en:

```bash
http://localhost:3000
```

Para probar solo la vista React con Vite en modo desarrollo:

```bash
npm run dev:principal
```

Importante: ese comando usa el puerto 3000 para Vite. No lo ejecutes al mismo tiempo que `npm start`, porque Express también usa el puerto 3000.

## Render

En Render usa:

```bash
Build Command: npm install && npm run build
Start Command: npm start
```

Render asigna `PORT` automáticamente. El archivo `bin/www` ya usa `process.env.PORT || 3000`, así que no hay que cambiarlo.

## Endpoints consumidos por React

La vista principal consume estos endpoints existentes:

- `GET /api/users/:userid`
- `POST /api/users/:userid/cursos`
- `DELETE /api/users/:userid/cursos/:cursoid`
- `GET /api/cursos?creador=:userid&origen=dynamic`
- `DELETE /api/cursos/:cursoid`
- `GET /api/cursos/:cursoid/resenas`
- `POST /api/cursos/:cursoid/resenas`

