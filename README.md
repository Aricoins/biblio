<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
    <title>Documentación del Software para la Webapp "Biblioteca y Archivo Graciela Di Biase"</title>
  <h1>Descripción General</h1>
  <p>"Biblioteca y Archivo Graciela Di Biase" es una aplicación web desarrollada con Next.js. Esta aplicación permite la gestión y visualización de una colección de libros y documentos archivísticos. Utiliza varias tecnologías y bibliotecas para proporcionar una interfaz de usuario interactiva y funcionalidades de backend robustas.</p>

  <h2>Dependencias</h2>
  <p>El archivo <code>package.json</code> describe todas las dependencias y scripts necesarios para el funcionamiento del proyecto.</p>

  <h3>Dependencias Principales</h3>
  <ul>
    <li>@clerk/nextjs: Integración de autenticación y gestión de usuarios.</li>
    <li>@heroicons/react: Conjunto de iconos SVG para React.</li>
    <li>@tailwindcss/postcss7-compat: Compatibilidad de Tailwind CSS con PostCSS 7.</li>
    <li>axios: Cliente HTTP basado en promesas.</li>
    <li>cloudinary: Gestión y optimización de imágenes y vídeos.</li>
    <li>fs-extra: Extensiones de fs con métodos adicionales y promesas.</li>
    <li>googleapis: Librería oficial para acceder a las APIs de Google.</li>
    <li>highlight.js: Resaltado de sintaxis de código.</li>
    <li>marked: Parser de Markdown.</li>
    <li>next: Framework React para la creación de aplicaciones web.</li>
    <li>next-auth: Autenticación para Next.js.</li>
    <li>pg-promise: Interfaz de Promesas para la base de datos PostgreSQL.</li>
    <li>react: Biblioteca principal de React.</li>
    <li>styled-components: Librería para estilos CSS en JS.</li>
    <li>sweetalert2: Alertas modales bonitas.</li>
    <li>xlsx: Lectura y escritura de archivos Excel.</li>
  </ul>

  <h3>Dependencias de Desarrollo</h3>
  <ul>
    <li>@types/node: Tipos de TypeScript para Node.js.</li>
    <li>@types/react: Tipos de TypeScript para React.</li>
    <li>autoprefixer: Herramienta para añadir prefijos CSS automáticamente.</li>
    <li>eslint: Linter de JavaScript.</li>
    <li>tailwindcss: Framework CSS utilitario.</li>
    <li>typescript: Lenguaje de programación tipado.</li>
  </ul>

  <h2>Estructura del Proyecto</h2>
  <p>El proyecto está organizado de la siguiente manera:</p>
  <pre><code>src/
  ├── app/
  │   ├── api/
  │   │   ├── agregarLibro/
  │   │   │   └── route.tsx
  │   │   ├── assets/
  │   │   │   ├── libros/
  │   │   │   └── varios archivos multimedia
  │   │   ├── crearLibro/
  │   │   │   └── route.tsx
  │   │   ├── crearTabla/
  │   │   │   └── route.tsx
  │   │   ├── detail/
  │   │   │   └── route.tsx
  │   │   ├── form/
  │   │   │   └── route.tsx
  │   │   ├── leerTablas/
  │   │   │   └── route.tsx
  │   │   ├── proyectos/
  │   │   │   └── route.tsx
  │   │   ├── verLibros/
  │   │   │   └── route.tsx
  │   ├── archivo/
  │   │   └── varios archivos
  │   ├── components/
  │   │   └── varios componentes React
  │   ├── lib/
  │   │   └── varios archivos de librerías
  │   ├── libros/
  │   │   ├── form/
  │   │   │   └── varios archivos
  │   │   ├── [id]/
  │   │   │   └── varios archivos
  │   │   └── varios archivos
  │   ├── proyectos/
  │   │   └── varios archivos
  │   ├── bg.jpg
  │   ├── bgif.webp
  │   ├── globals.css
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── style.module.css
  </code></pre>

  <h2>Descripción de Carpetas y Archivos</h2>
  <ul>
    <li><strong>api</strong>: Contiene las rutas de la API que manejan las operaciones CRUD para los libros y proyectos.</li>
    <ul>
      <li>agregarLibro: Ruta para agregar un nuevo libro.</li>
      <li>assets: Archivos multimedia como imágenes y vídeos.</li>
      <li>crearLibro: Ruta para crear un nuevo libro.</li>
      <li>crearTabla: Ruta para crear tablas en la base de datos.</li>
      <li>detail: Ruta para obtener detalles específicos.</li>
      <li>form: Formularios de la aplicación.</li>
      <li>leerTablas: Ruta para leer datos de las tablas.</li>
      <li>proyectos: Ruta para manejar los proyectos.</li>
      <li>verLibros: Ruta para visualizar los libros.</li>
    </ul>
    <li><strong>archivo</strong>: Páginas y estilos relacionados con los archivos.</li>
    <li><strong>components</strong>: Componentes reutilizables de React utilizados en la aplicación.</li>
    <li><strong>lib</strong>: Contiene librerías y utilidades comunes.</li>
    <li><strong>libros</strong>: Páginas y componentes relacionados con los libros.</li>
    <ul>
      <li>form: Formularios para la gestión de libros.</li>
      <li>[id]: Páginas dinámicas para libros específicos.</li>
    </ul>
    <li><strong>proyectos</strong>: Páginas y estilos relacionados con los proyectos.</li>
    <li><strong>globals.css</strong>: Estilos globales de la aplicación.</li>

  <li><strong>layout.tsx</strong>: Componente de diseño principal.</li>
  <li><strong>page.tsx</strong>: Página principal de la aplicación.</li>
  <li><strong>style.module.css</strong>: Módulos de CSS para estilos específicos.</li>
</ul>
<h2>Scripts de NPM</h2>
<ul>
  <li><strong>dev</strong>: Inicia el servidor de desarrollo.</li>
  <li><strong>build</strong>: Compila la aplicación para producción.</li>
  <li><strong>start</strong>: Inicia el servidor en modo de producción.</li>
  <li><strong>lint</strong>: Ejecuta ESLint para comprobar el código.</li>
</ul>
<h2>Tecnologías y Herramientas Utilizadas</h2>
<ul>
  <li>Next.js: Framework React para SSR (Server-Side Rendering) y SSG (Static Site Generation).</li>
  <li>React: Biblioteca de JavaScript para construir interfaces de usuario.</li>
  <li>TypeScript: Lenguaje de programación que añade tipado estático a JavaScript.</li>
  <li>Tailwind CSS: Framework CSS utilitario para un diseño rápido.</li>
  <li>PostgreSQL: Base de datos relacional utilizada en el proyecto.</li>
  <li>Cloudinary: Gestión y optimización de imágenes.</li>
  <li>ESLint: Herramienta de análisis de código estático para identificar y reportar patrones en JavaScript.</li>
</ul>
</body>
</html>
