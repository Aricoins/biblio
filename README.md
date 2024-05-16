Documentación del Software para la Webapp "Biblioteca y Archivo Graciela Di Biase"
Descripción General
"Biblioteca y Archivo Graciela Di Biase" es una aplicación web desarrollada con Next.js. Esta aplicación permite la gestión y visualización de una colección de libros y documentos archivísticos. Utiliza varias tecnologías y bibliotecas para proporcionar una interfaz de usuario interactiva y funcionalidades de backend robustas.

Dependencias
El archivo package.json describe todas las dependencias y scripts necesarios para el funcionamiento del proyecto.

Dependencias Principales
@clerk/nextjs: Integración de autenticación y gestión de usuarios.
@heroicons/react: Conjunto de iconos SVG para React.
@tailwindcss/postcss7-compat: Compatibilidad de Tailwind CSS con PostCSS 7.
axios: Cliente HTTP basado en promesas.
cloudinary: Gestión y optimización de imágenes y vídeos.
fs-extra: Extensiones de fs con métodos adicionales y promesas.
googleapis: Librería oficial para acceder a las APIs de Google.
highlight.js: Resaltado de sintaxis de código.
marked: Parser de Markdown.
next: Framework React para la creación de aplicaciones web.
next-auth: Autenticación para Next.js.
pg-promise: Interfaz de Promesas para la base de datos PostgreSQL.
react: Biblioteca principal de React.
styled-components: Librería para estilos CSS en JS.
sweetalert2: Alertas modales bonitas.
xlsx: Lectura y escritura de archivos Excel.
Dependencias de Desarrollo
@types/node: Tipos de TypeScript para Node.js.
@types/react: Tipos de TypeScript para React.
autoprefixer: Herramienta para añadir prefijos CSS automáticamente.
eslint: Linter de JavaScript.
tailwindcss: Framework CSS utilitario.
typescript: Lenguaje de programación tipado.
Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

css
Copiar código
src/
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
Descripción de Carpetas y Archivos
api: Contiene las rutas de la API que manejan las operaciones CRUD para los libros y proyectos.

agregarLibro: Ruta para agregar un nuevo libro.
assets: Archivos multimedia como imágenes y vídeos.
crearLibro: Ruta para crear un nuevo libro.
crearTabla: Ruta para crear tablas en la base de datos.
detail: Ruta para obtener detalles específicos.
form: Formularios de la aplicación.
leerTablas: Ruta para leer datos de las tablas.
proyectos: Ruta para manejar los proyectos.
verLibros: Ruta para visualizar los libros.
archivo: Páginas y estilos relacionados con los archivos.

components: Componentes reutilizables de React utilizados en la aplicación.

lib: Contiene librerías y utilidades comunes.

libros: Páginas y componentes relacionados con los libros.

form: Formularios para la gestión de libros.
[id]: Páginas dinámicas para libros específicos.
proyectos: Páginas y estilos relacionados con los proyectos.

globals.css: Estilos globales de la aplicación.

layout.tsx: Componente de diseño principal.

page.tsx: Página principal de la aplicación.

style.module.css: Módulos de CSS para estilos específicos.

Scripts de NPM
dev: Inicia el servidor de desarrollo.
build: Compila la aplicación para producción.
start: Inicia el servidor en modo de producción.
lint: Ejecuta ESLint para comprobar el código.
Tecnologías y Herramientas Utilizadas
Next.js: Framework React para SSR (Server-Side Rendering) y SSG (Static Site Generation).
React: Biblioteca de JavaScript para construir interfaces de usuario.
TypeScript: Lenguaje de programación que añade tipado estático a JavaScript.
Tailwind CSS: Framework CSS utilitario para un diseño rápido.
PostgreSQL: Base de datos relacional utilizada en el proyecto.
Cloudinary: Gestión y optimización de imágenes.
ESLint: Herramienta de análisis de código estático para identificar y reportar patrones en JavaScript.
