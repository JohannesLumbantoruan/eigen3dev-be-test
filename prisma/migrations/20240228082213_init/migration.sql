-- CreateTable
CREATE TABLE "members" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "books" (
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "book_loans" (
    "id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "date_borrowed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_due" TIMESTAMP(3) NOT NULL,
    "date_returned" TIMESTAMP(3),
    "returned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "book_loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penalties" (
    "id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "penalty_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "penalty_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penalties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_username_key" ON "members"("username");

-- CreateIndex
CREATE UNIQUE INDEX "penalties_member_id_key" ON "penalties"("member_id");

-- AddForeignKey
ALTER TABLE "book_loans" ADD CONSTRAINT "book_loans_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_loans" ADD CONSTRAINT "book_loans_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalties" ADD CONSTRAINT "penalties_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("code") ON DELETE CASCADE ON UPDATE CASCADE;
