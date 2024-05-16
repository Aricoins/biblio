<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentación del Software para la Webapp "Biblioteca y Archivo Graciela Di Biase"</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1, h2, h3 {
            color: #333;
        }
        pre {
            background: #f4f4f4;
            border: 1px solid #ccc;
            padding: 10px;
            overflow: auto;
        }
        code {
            background: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        ul li {
            margin: 5px 0;
        }
    </style>
</head>
<body>

<h1>Documentación del Software para la Webapp "Biblioteca y Archivo Graciela Di Biase"</h1>

<h2>Descripción General</h2>
<p>"Biblioteca y Archivo Graciela Di Biase" es una aplicación web desarrollada con Next.js. Esta aplicación permite la gestión y visualización de una colección de libros y documentos archivísticos. Utiliza varias tecnologías y bibliotecas para proporcionar una interfaz de usuario interactiva y funcionalidades de backend robustas.</p>

<h2>Dependencias</h2>
<p>El archivo <code>package.json</code> describe todas las dependencias y scripts necesarios para el funcionamiento del proyecto.</p>

<h3>Dependencias Principales</h3>
<ul>
    <li><code>@clerk/nextjs</code>: Integración de autenticación y gestión de usuarios.</li>
    <li><code>@heroicons/react</code>: Conjunto de iconos SVG para React.</li>
    <li><code>@tailwindcss/postcss7-compat</code>: Compatibilidad de Tailwind CSS con PostCSS 7.</li>
    <li><code>axios</code>: Cliente HTTP basado en promesas.</li>
    <li><code>cloudinary</code>: Gestión y optimización de imágenes y vídeos.</li>
    <li><code>fs-extra</code>: Extensiones de fs con métodos adicionales y promesas.</li>
    <li><code>googleapis</code>: Librería oficial para acceder a las APIs de Google.</li>
    <li><code>highlight.js</code>: Resaltado de sintaxis de código.</li>
    <li><code>marked</code>: Parser de Markdown.</li>
    <li><code>next</code>: Framework React para la creación de aplicaciones web.</li>
    <li><code>next-auth</code>: Autenticación para Next.js.</li>
    <li><code>pg-promise</code>: Interfaz de Promesas para la base de datos PostgreSQL.</li>
    <li><code>react</code>: Biblioteca principal de React.</li>
    <li><code>styled-components</code>: Librería para estilos CSS en JS.</li>
    <li><code>sweetalert2</code>: Alertas modales bonitas.</li>
    <li><code>xlsx</code>: Lectura y escritura de archivos Excel.</li>
</ul>

<h3>Dependencias de Desarrollo</h3>
<ul>
    <li><code>@types/node</code>: Tipos de TypeScript para Node.js.</li>
    <li><code>@types/react</code>: Tipos de TypeScript para React.</li>
    <li><code>autoprefixer</code>: Herramienta para añadir prefijos CSS automáticamente.</li>
    <li><code>eslint</code>: Linter de JavaScript.</li>
    <li><code>tailwindcss</code>: Framework CSS utilitario.</li>
    <li><code>typescript</code>: Lenguaje de programación tipado.</li>
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
    <li><strong>api</strong>: Contiene las rutas de la API que manejan las operaciones CRUD para los libros y proyectos.
        <ul>
            <li><strong>agregarLibro</strong>: Ruta para agregar un nuevo libro.</li>
            <li><strong>assets</strong>: Archivos multimedia como imágenes y vídeos.</li>
            <li><strong>crearLibro</strong>: Ruta para crear un nuevo libro.</li>
            <li><strong>crearTabla</strong>: Ruta para crear tablas en la base de datos.</li>
            <li><strong>detail</strong>: Ruta para obtener detalles específicos.</li>
            <li><strong>form</strong>: Formularios de la aplicación.</li>
            <li><strong>leerTablas</strong>: Ruta para leer datos de las tablas.</li>
            <li><strong>proyectos</strong>: Ruta para manejar los proyectos.</li>
            <li><strong>verLibros</strong>: Ruta para visualizar los libros.</li>
        </ul>
    </li>
    <li><strong>archivo</strong>: Páginas y estilos relacionados con los archivos.</li>
    <li><strong>components</strong>: Componentes reutilizables de React utilizados en la aplicación.</li>
    <li><strong>lib</strong>: Contiene librerías y utilidades comunes.</li>
    <li><strong>libros</strong>: Páginas y componentes relacionados con los libros.
        <ul>
            <li><strong>form</strong>: Formularios para la gestión de libros.</li>
            <li><strong>[id]</strong>: Páginas dinámicas para libros específicos.</li>
        </ul>
    </li>
    <li><strong>proyectos</strong>: Páginas y estilos relacionados con los proyectos.</li>
    <li><strong>globals.css</strong>: Estilos globales de la aplicación.</li>
    <li><strong>layout.tsx</strong>: Componente de diseño principal.</li>
    <li><strong>page.tsx</strong>: Página principal de la aplicación.</li>
    <li><strong>style.module.css</strong>: Módulos de CSS para estilos específicos.</li>
</ul>

<h2>Scripts de NPM</h2>
<ul>
    <li><code>dev</code>: Inicia el servidor de desarrollo.</li>
    <li><code>build</code>: Compila la aplicación para producción.</li>
    <li><code>start</code>: Inicia el servidor en modo de producción.</li>
    <li><code>lint</code>: Ejecuta ESLint para comprobar el código.</li>
</ul>

<h2>Tecnologías y Herramientas Utilizadas</h2>
<ul>
    <li><strong>Next.js</strong>: Framework React para SSR (Server-Side Rendering) y SSG (Static Site Generation).</li>
    <li><strong>React</strong>: Biblioteca de JavaScript para construir interfaces de usuario.</li>
    <li><strong>TypeScript</strong>: Lenguaje de programación que añade tipado estático a JavaScript.</li>
    <li><strong>Tailwind CSS</strong>: Framework CSS utilitario para un diseño rápido.</li>
    <li><strong>PostgreSQL</strong>: Base de datos relacional utilizada en el proyecto.</li>
    <li><strong>Cloudinary</strong>: Gestión y optimización de imágenes.</li>
    <li><strong>ESLint</strong>: Herramienta de análisis de código estático para identificar y reportar patrones en JavaScript.</li>
</ul>

</body>
</html>
