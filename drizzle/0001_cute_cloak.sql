CREATE TABLE "quiz" (
	"id" text PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"choice" json,
	"answer_idx" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT;