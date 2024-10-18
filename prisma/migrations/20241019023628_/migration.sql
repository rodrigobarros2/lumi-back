-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "installationNumber" INTEGER NOT NULL,
    "distributor" TEXT NOT NULL,
    "consumer" TEXT NOT NULL,
    "clientNumber" INTEGER NOT NULL,
    "invoiceMonth" TEXT NOT NULL,
    "energyValue" DOUBLE PRECISION NOT NULL,
    "energyQuantity" DOUBLE PRECISION NOT NULL,
    "sceeeValue" DOUBLE PRECISION NOT NULL,
    "sceeeQuantity" DOUBLE PRECISION NOT NULL,
    "compensatedValue" DOUBLE PRECISION NOT NULL,
    "compensatedQuantity" DOUBLE PRECISION NOT NULL,
    "publicLighting" DOUBLE PRECISION NOT NULL,
    "invoiceUrl" TEXT,
    "invoiceName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
