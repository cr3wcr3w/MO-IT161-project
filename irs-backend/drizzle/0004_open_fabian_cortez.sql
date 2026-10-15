CREATE TYPE "public"."roleNameEnum" AS ENUM('admin', 'triage', 'researcher', 'guest');--> statement-breakpoint
ALTER TYPE "public"."severity" RENAME TO "severityEnum";--> statement-breakpoint
ALTER TABLE "auth"."roles" ALTER COLUMN "role" SET DATA TYPE "public"."roleNameEnum" USING "role"::"public"."roleNameEnum";