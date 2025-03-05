CREATE TYPE "public"."cycle_mode" AS ENUM('IN_PERSON', 'VIRTUAL', 'HYBRID');--> statement-breakpoint
CREATE TYPE "public"."subject_area" AS ENUM('SOCIALES', 'BIOMEDICAS', 'INGENIERIAS');--> statement-breakpoint
CREATE TABLE "cycles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"mode" "cycle_mode" DEFAULT 'IN_PERSON' NOT NULL,
	"monthlyTuition" real NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lectures" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"subjectId" integer NOT NULL,
	"teacherId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"studentLimit" integer NOT NULL,
	"cycleId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sections_to_students" (
	"sectionId" integer NOT NULL,
	"studentId" uuid NOT NULL,
	"enrollmentDate" timestamp DEFAULT now(),
	CONSTRAINT "sections_to_students_sectionId_studentId_pk" PRIMARY KEY("sectionId","studentId")
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"weeklyHours" integer NOT NULL,
	"area" "subject_area" NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN "enrollmentDate";--> statement-breakpoint
ALTER TABLE "teachers" DROP COLUMN "hireDate";