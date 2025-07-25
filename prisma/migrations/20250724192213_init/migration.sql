-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "userInput" TEXT NOT NULL,
    "botReply" TEXT NOT NULL,
    "userId" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Libro" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "autor" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "imagen" VARCHAR(500),
    "creadoPor" VARCHAR(255) NOT NULL,
    "fechaCreacion" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualiz" TIMESTAMPTZ(6) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "specs" JSONB NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "video" VARCHAR(255),
    "disable" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyectos" (
    "id" SERIAL NOT NULL,
    "numero_proyecto" VARCHAR(50) NOT NULL,
    "anio_proyecto" VARCHAR(10) NOT NULL,
    "titulo_proyecto" TEXT NOT NULL,
    "tipo_proyecto" VARCHAR(100) NOT NULL,
    "autor" JSON NOT NULL,
    "colaboradores" TEXT,
    "girado_a" VARCHAR(255) NOT NULL,
    "acta_fecha" DATE,
    "aprobado" BOOLEAN NOT NULL DEFAULT false,
    "tipo_norma" VARCHAR(100) NOT NULL,
    "numero_norma" VARCHAR(50) NOT NULL,
    "observaciones" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "proyectos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Message_userId_idx" ON "Message"("userId");

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");

-- CreateIndex
CREATE INDEX "Libro_creadoPor_idx" ON "Libro"("creadoPor");

-- CreateIndex
CREATE INDEX "Libro_fechaCreacion_idx" ON "Libro"("fechaCreacion");

-- CreateIndex
CREATE INDEX "Libro_activo_idx" ON "Libro"("activo");

-- CreateIndex
CREATE INDEX "products_category_idx" ON "products"("category");

-- CreateIndex
CREATE INDEX "products_disable_idx" ON "products"("disable");

-- CreateIndex
CREATE INDEX "proyectos_numero_proyecto_idx" ON "proyectos"("numero_proyecto");

-- CreateIndex
CREATE INDEX "proyectos_anio_proyecto_idx" ON "proyectos"("anio_proyecto");

-- CreateIndex
CREATE INDEX "proyectos_aprobado_idx" ON "proyectos"("aprobado");

-- CreateIndex
CREATE INDEX "proyectos_tipo_norma_idx" ON "proyectos"("tipo_norma");

-- CreateIndex
CREATE UNIQUE INDEX "proyectos_numero_proyecto_anio_proyecto_key" ON "proyectos"("numero_proyecto", "anio_proyecto");
