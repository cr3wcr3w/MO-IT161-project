CREATE TYPE "public"."role_request_role" AS ENUM('triage', 'researcher');--> statement-breakpoint
CREATE TYPE "public"."role_request_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "auth"."role_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"requested_role" "role_request_role" NOT NULL,
	"status" "role_request_status" DEFAULT 'pending' NOT NULL,
	"reviewed_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "auth"."role_requests" ADD CONSTRAINT "role_requests_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth"."role_requests" ADD CONSTRAINT "role_requests_reviewed_by_user_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "auth"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "role_requests_user_id_idx" ON "auth"."role_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "role_requests_status_idx" ON "auth"."role_requests" USING btree ("status");