CREATE SCHEMA "logging";
--> statement-breakpoint
CREATE TYPE "logging"."log_level" AS ENUM('error', 'warn', 'info', 'debug');--> statement-breakpoint
CREATE TABLE "logging"."application_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"level" "logging"."log_level" NOT NULL,
	"message" text NOT NULL,
	"user_id" text,
	"method" varchar(10),
	"path" text,
	"status_code" integer,
	"error_stack" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "logging"."audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_user_id" text,
	"action" varchar(100) NOT NULL,
	"table_name" varchar(100),
	"primary_key" text,
	"old_values" jsonb,
	"new_values" jsonb,
	"ip_address" varchar(45),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "logging"."application_logs" ADD CONSTRAINT "application_logs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logging"."audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_user_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "auth"."user"("id") ON DELETE set null ON UPDATE no action;