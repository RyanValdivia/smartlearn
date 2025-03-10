ALTER TABLE "sessions" ALTER COLUMN "sessionRole" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "sessionRole" DROP NOT NULL;