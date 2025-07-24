-- CreateTable: Mejorar tabla de mensajes con userId
ALTER TABLE "Message" ADD COLUMN "userId" VARCHAR(255);
ALTER TABLE "Message" ADD COLUMN "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Message" ALTER COLUMN "userInput" TYPE TEXT;
ALTER TABLE "Message" ALTER COLUMN "botReply" TYPE TEXT;

-- CreateIndex para mejor rendimiento
CREATE INDEX "Message_userId_idx" ON "Message"("userId");
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");

-- CreateTable: Nueva tabla de libros
CREATE TABLE "Libro" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "autor" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "imagen" VARCHAR(500),
    "creadoPor" VARCHAR(255) NOT NULL,
    "fechaCreacion" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualiz" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex para tabla Libro
CREATE INDEX "Libro_creadoPor_idx" ON "Libro"("creadoPor");
CREATE INDEX "Libro_fechaCreacion_idx" ON "Libro"("fechaCreacion");
CREATE INDEX "Libro_activo_idx" ON "Libro"("activo");

-- Mejorar tabla products
ALTER TABLE "products" ALTER COLUMN "price" TYPE DECIMAL(10,2);
ALTER TABLE "products" ADD COLUMN "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex para tabla products
CREATE INDEX "products_category_idx" ON "products"("category");
CREATE INDEX "products_disable_idx" ON "products"("disable");

-- Mejorar tabla proyectos
ALTER TABLE "proyectos" ADD COLUMN "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "proyectos" ADD COLUMN "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "proyectos" ALTER COLUMN "titulo_proyecto" TYPE TEXT;
ALTER TABLE "proyectos" ALTER COLUMN "colaboradores" TYPE TEXT;
ALTER TABLE "proyectos" ALTER COLUMN "observaciones" TYPE TEXT;
ALTER TABLE "proyectos" ALTER COLUMN "aprobado" SET DEFAULT false;

-- CreateIndex para tabla proyectos
CREATE UNIQUE INDEX "proyectos_numero_proyecto_anio_proyecto_key" ON "proyectos"("numero_proyecto", "anio_proyecto");
CREATE INDEX "proyectos_numero_proyecto_idx" ON "proyectos"("numero_proyecto");
CREATE INDEX "proyectos_anio_proyecto_idx" ON "proyectos"("anio_proyecto");
CREATE INDEX "proyectos_aprobado_idx" ON "proyectos"("aprobado");
CREATE INDEX "proyectos_tipo_norma_idx" ON "proyectos"("tipo_norma");