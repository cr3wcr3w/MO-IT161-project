CREATE SCHEMA "incident";
--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TABLE "incident"."reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"bounty" integer DEFAULT 0 NOT NULL,
	"severity" "severity",
	"report_by" text NOT NULL,
	"status_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "incident"."statuses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "incident"."statuses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "statuses_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "incident"."timeline" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "auth"."user" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "incident"."reports" ADD CONSTRAINT "reports_report_by_user_id_fk" FOREIGN KEY ("report_by") REFERENCES "auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident"."reports" ADD CONSTRAINT "reports_status_id_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "incident"."statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident"."timeline" ADD CONSTRAINT "timeline_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "incident"."reports"("id") ON DELETE cascade ON UPDATE no action;