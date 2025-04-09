-- CreateTable
CREATE TABLE "seguidores" (
    "usuario_id" INTEGER NOT NULL,
    "seguidor_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "seguidores_usuario_id_seguidor_id_key" ON "seguidores"("usuario_id", "seguidor_id");

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidores" ADD CONSTRAINT "seguidores_seguidor_id_fkey" FOREIGN KEY ("seguidor_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
