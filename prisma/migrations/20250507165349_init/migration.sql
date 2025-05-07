-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "userInput" TEXT NOT NULL,
    "botReply" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "specs" JSONB NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "price" DECIMAL NOT NULL,
    "video" VARCHAR(255),
    "disable" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyectos" (
    "id" INTEGER NOT NULL,
    "numero_proyecto" VARCHAR(50) NOT NULL,
    "anio_proyecto" VARCHAR(10) NOT NULL,
    "titulo_proyecto" TEXT NOT NULL,
    "tipo_proyecto" VARCHAR(100) NOT NULL,
    "autor" JSON NOT NULL,
    "colaboradores" TEXT,
    "girado_a" VARCHAR(255) NOT NULL,
    "acta_fecha" DATE,
    "aprobado" BOOLEAN NOT NULL,
    "tipo_norma" VARCHAR(100) NOT NULL,
    "numero_norma" VARCHAR(50) NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "proyectos_pkey" PRIMARY KEY ("id")
);

