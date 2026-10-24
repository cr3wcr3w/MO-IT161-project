ALTER TABLE "onboarding"."steps" ADD COLUMN "order" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "onboarding"."steps" ADD CONSTRAINT "steps_order_unique" UNIQUE("order");