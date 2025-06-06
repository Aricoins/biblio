# Proyecto Biblio

Esta es una aplicación Next.js para gestionar y visualizar documentación del Archivo y Bilbioteca Graciela Di Biase  del Concejo Municipal de San Carlos de Bariloche.

Tecnologías utilizadas:
- React + Next.js (App Router)
- TypeScript
- Prisma ORM con PostgreSQL
- Tailwind CSS y CSS Modules para estilos
- Clerk para autenticación

## Requisitos previos

- Node.js v16+
- Base de datos PostgreSQL
- `pnpm`, `npm` o `yarn` como gestor de paquetes

## Configuración

1. Clonar el repositorio:
   ```powershell
   git clone <repo-url> .
   ```
2. Instalar dependencias:
   ```powershell
   npm install
   ```
3. Copiar variables de entorno:
   ```powershell
   cp .env.example .env
   ```
4. Configurar la conexión a la base de datos en `.env`:
   ```dotenv
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
   ```
5. Ejecutar migraciones de Prisma:
   ```powershell
   npx prisma migrate dev
   ```

## Desarrollo

Iniciar servidor de desarrollo:
```powershell
npm run dev
```
Abrir http://localhost:3000 en el navegador.

## Compilación y producción

Generar build de producción:
```powershell
npm run build
```
Iniciar en modo producción:
```powershell
npm start
```


## Contribuciones

1. Hacer fork del repositorio
2. Crear una rama nueva (feature)
3. Realizar commits de tus cambios
4. Abrir un pull request

---
## Qué es DiBiase.net

Se trata de una innovadora herramienta diseñada para optimizar la calidad legislativa mediante el acceso y manejo eficiente de documentos digitales. Desarrollada por nuestro equipo, DiBiase.net facilita la gestión de todo tipo de regulaciones y expedientes, promoviendo la modernización y la eficiencia en el trabajo diario.

### Objetivos
- **Acceso total** a documentos digitalizados (proyectos, ordenanzas, comunicaciones, declaraciones, resoluciones).
- **Despapelización**, reduciendo el uso de papel y liberando espacio físico.

### Principales funcionalidades
- Acceso a expedientes originales escaneados y normas en versión firmada.
- Índices avanzados: búsquedas por número, tipo, autor o palabras clave.
- Biblioteca digital de libros de interés municipal y otros materiales.
- Gestión de permisos y auditoría de accesos.
- Búsqueda avanzada y recuperación eficiente (reducción de tiempos de consulta en más de 60%).
- Integración con sistemas de gestión documental existentes.
- Analíticas y reportes de uso, accesos y frecuencia de consultas.

### Beneficios
- **Reducción de costos**: hasta 70% menos en almacenamiento y mantenimiento físico.
- **Accesibilidad remota**: consulta desde cualquier lugar por múltiples usuarios.
- **Seguridad y preservación**: respaldos en múltiples ubicaciones y control de accesos.
- **Impacto ambiental**: menor consumo de papel y reducción de residuos.

### Datos de interés
- Sólo el 20% de documentos físicos se consultan regularmente; el 80% restante ocupa espacio sin uso.
- Búsquedas digitalizadas pueden reducir tiempos de 15 minutos a menos de 1 minuto por documento.
- Encuestas muestran aumento del 70% en la satisfacción de usuarios.

**DiBiase.net** automatiza la digitalización, indexación y almacenamiento, transformando la gestión documental en un proceso eficiente, seguro y sostenible.

Para más información o demostraciones personalizadas, contáctenos.

