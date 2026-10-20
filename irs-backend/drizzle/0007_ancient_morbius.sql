CREATE SCHEMA "onboarding";
--> statement-breakpoint
CREATE TYPE "onboarding"."step_status" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED');--> statement-breakpoint
CREATE TABLE "onboarding"."progress" (
	"user_id" text PRIMARY KEY NOT NULL,
	"current_step_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "onboarding"."steps" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "onboarding"."steps_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "onboarding"."step_status" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "onboarding"."progress" ADD CONSTRAINT "progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding"."progress" ADD CONSTRAINT "progress_current_step_id_steps_id_fk" FOREIGN KEY ("current_step_id") REFERENCES "onboarding"."steps"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding"."steps" ADD CONSTRAINT "steps_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;