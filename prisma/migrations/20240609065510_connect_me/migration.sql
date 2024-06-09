-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "expiresAt" TIMESTAMP(3);
