
# Biblioteca y Archivo Graciela Di Biase — Documentación del Proyecto

## Descripción General


"Biblioteca y Archivo Graciela Di Biase" es una aplicación web desarrollada con Next.js y React, orientada a la gestión, consulta y visualización de libros, normativas y documentos archivísticos. El sistema integra autenticación, manejo de archivos, visualización de datos desde Google Sheets, y una interfaz moderna y minimalista basada en Tailwind CSS.

## Dependencias


El archivo `package.json` contiene todas las dependencias y scripts necesarios para el desarrollo, build y despliegue del proyecto.


### Dependencias Principales

- `next`, `react`, `typescript`: Stack principal para desarrollo web moderno.
- `@clerk/nextjs`: Autenticación y gestión de usuarios.
- `@heroicons/react`, `react-icons`: Iconografía SVG para la UI.
- `tailwindcss`, `postcss`, `autoprefixer`: Estilos utilitarios y procesamiento CSS.
- `axios`, `googleapis`, `fs-extra`: Acceso a APIs externas, Google Sheets y manejo de archivos.
- `cloudinary`: Gestión y optimización de imágenes y PDFs.
- `pg-promise`: Acceso a base de datos PostgreSQL.
- `sweetalert2`: Alertas modales elegantes.
- `xlsx`, `papaparse`: Lectura y parseo de archivos Excel/CSV.
- `marked`, `highlight.js`: Renderizado y resaltado de Markdown.
- `styled-components`: Estilos CSS-in-JS para componentes específicos.

### Dependencias de Desarrollo

- `@types/node`, `@types/react`: Tipos para TypeScript.
- `eslint`: Linter de código.
- `tailwindcss`: Framework CSS utilitario.

src/

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera (resumido):

```
src/
├── app/
│   ├── api/                # Endpoints API (Next.js Route Handlers)
│   │   ├── agregarLibro/   # API para agregar libros
│   │   ├── assets/         # Archivos multimedia (imágenes, PDFs, etc.)
│   │   ├── crearLibro/     # API para crear libros
│   │   ├── crearTabla/     # API para crear tablas
│   │   ├── detail/         # API para detalles específicos
│   │   ├── form/           # Formularios API
│   │   ├── leerTablas/     # API para leer tablas
│   │   ├── proyectos/      # API para proyectos
│   │   ├── verLibros/      # API para visualizar libros
│   │   └── ...
│   ├── archivo/            # Páginas y componentes de archivo
│   ├── components/         # Componentes React reutilizables (tablas, headers, cards, etc.)
│   ├── lib/                # Utilidades y lógica compartida
│   ├── libros/             # Páginas y componentes de libros
│   ├── proyectos/          # Páginas y componentes de proyectos
│   ├── ceb/, com/, juntas/ # Otras secciones temáticas
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal de la app
│   ├── page.tsx            # Página principal
│   └── style.module.css    # Estilos modulares
├── public/                 # Archivos estáticos (imágenes, PDFs, etc.)
├── prisma/                 # Esquema y migraciones de base de datos
├── readme/                 # Documentación adicional
├── knowledge/              # Datos y recursos de conocimiento
├── ucdm/                   # Submódulo o microservicio (si aplica)
├── uploads/                # Archivos subidos
...otros archivos raíz (package.json, tailwind.config.ts, etc.)
```

### Descripción de Carpetas y Archivos Clave

- **app/api/**: Endpoints de backend (API Routes) para operaciones CRUD, integración con Google Sheets, manejo de archivos, etc.
- **app/components/**: Componentes React reutilizables (tablas, headers, formularios, etc.).
- **app/lib/**: Funciones utilitarias y lógica compartida.
- **app/libros/**: Páginas y componentes para gestión y visualización de libros.
- **app/proyectos/**: Páginas y componentes para proyectos.
- **app/archivo/**: Páginas y componentes para documentos archivísticos.
- **public/**: Archivos estáticos accesibles públicamente (imágenes, PDFs, etc.).
- **prisma/**: Esquema de base de datos y migraciones (PostgreSQL).
- **knowledge/**: Datos estructurados (JSON) para features de conocimiento.
- **uploads/**: Carpeta para archivos subidos por usuarios o admins.


## Workflow de Desarrollo y Despliegue

### Scripts Principales

- `npm run dev` — Inicia el servidor de desarrollo en modo hot-reload.
- `npm run build` — Compila la aplicación para producción (Next.js build).
- `npm start` — Inicia el servidor en modo producción (después de build).
- `npm run lint` — Ejecuta ESLint para comprobar la calidad del código.

### Flujo de trabajo recomendado

1. **Instalación de dependencias**
   ```bash
   npm install
   ```
2. **Desarrollo local**
   ```bash
   npm run dev
   ```
   Accede a la app en `http://localhost:3000`.
3. **Build de producción**
   ```bash
   npm run build
   npm start
   ```
4. **Linting y buenas prácticas**
   ```bash
   npm run lint
   ```

### Notas adicionales
- El proyecto utiliza rutas API para integración con Google Sheets y manejo de archivos.
- El frontend consume estas APIs y muestra los datos en tablas y componentes visuales minimalistas.
- Los estilos se basan en Tailwind CSS y algunos módulos CSS personalizados.



## Tecnologías y Herramientas Utilizadas

- **Next.js**: Framework React para SSR, SSG y API Routes.
- **React**: UI declarativa y componentes reutilizables.
- **TypeScript**: Tipado estático para mayor robustez.
- **Tailwind CSS**: Estilos utilitarios y diseño responsivo.
- **PostgreSQL**: Base de datos relacional (vía Prisma y/o pg-promise).
- **Cloudinary**: Gestión de imágenes y PDFs.
- **Google Sheets**: Fuente de datos dinámica para normativas y tablas.
- **ESLint**: Linter para mantener calidad de código.


## Ejemplos de Uso de la API

### Obtener normativas de juntas vecinales

**Endpoint:** `GET /api/juntasGenerales`

**Ejemplo con fetch (frontend):**
```js
fetch('/api/juntasGenerales')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Ejemplo con curl:**
```bash
curl http://localhost:3000/api/juntasGenerales
```

**Respuesta esperada:**
```json
[
  {
    "norma": "Ordenanza 1234",
    "descripcion": "Reglamento de funcionamiento de la Junta X",
    "link": "https://.../documento.pdf",
    "estado": "Vigente",
    "tipo": "Estatuto"
  },
  ...
]
```

---

### Agregar un libro (ejemplo de POST)

**Endpoint:** `POST /api/agregarLibro`

**Ejemplo con fetch:**
```js
fetch('/api/agregarLibro', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    titulo: 'Libro de Prueba',
    autor: 'Autor Demo',
    anio: 2024
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/agregarLibro \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Libro de Prueba","autor":"Autor Demo","anio":2024}'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Libro agregado correctamente"
}
```

---

### Obtener listado de libros

**Endpoint:** `GET /api/verLibros`

**Ejemplo con fetch:**
```js
fetch('/api/verLibros')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Ejemplo con curl:**
```bash
curl http://localhost:3000/api/verLibros
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "titulo": "Libro de Prueba",
    "autor": "Autor Demo",
    "anio": 2024
  },
  ...
]
```

---

> **Nota:** Algunos endpoints pueden requerir autenticación o privilegios de administrador. Consultar la documentación interna de cada ruta para más detalles.



## Contacto

Para más información, sugerencias o reportes de bugs, contactar a: [digestobariloche@gmail.com](mailto:digestobariloche@gmail.com)


## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulte el archivo `LICENSE` para más detalles.
