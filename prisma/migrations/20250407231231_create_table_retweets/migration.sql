-- CreateTable
CREATE TABLE "retweets" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tweet_id" INTEGER NOT NULL,

    CONSTRAINT "retweets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "retweets_usuario_id_tweet_id_key" ON "retweets"("usuario_id", "tweet_id");

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
