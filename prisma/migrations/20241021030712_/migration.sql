-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "consumer" TEXT NOT NULL,
    "distributor" TEXT NOT NULL,
    "invoiceMonth" TEXT NOT NULL,
    "installationNumber" BIGINT NOT NULL,
    "clientNumber" BIGINT NOT NULL,
    "energyValue" DECIMAL(65,30) NOT NULL,
    "energyQuantity" DECIMAL(65,30) NOT NULL,
    "sceeeValue" DECIMAL(65,30) NOT NULL,
    "sceeeQuantity" DECIMAL(65,30) NOT NULL,
    "compensatedValue" DECIMAL(65,30) NOT NULL,
    "compensatedQuantity" DECIMAL(65,30) NOT NULL,
    "publicLighting" DECIMAL(65,30) NOT NULL,
    "invoiceUrl" TEXT,
    "invoiceName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
