ALTER TABLE "onboarding"."steps" DROP CONSTRAINT "steps_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "onboarding"."steps" DROP COLUMN "user_id";