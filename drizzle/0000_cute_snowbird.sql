CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"full_name" text,
	"password" text NOT NULL,
	"quiz_score" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" text PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"choice" json,
	"answer_idx" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" text PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"video_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "watched" (
	"user_id" text,
	"video_id" text
);
--> statement-breakpoint
ALTER TABLE "watched" ADD CONSTRAINT "watched_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watched" ADD CONSTRAINT "watched_video_id_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;