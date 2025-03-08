ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "dni" varchar(8);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_dni_unique" UNIQUE("dni");