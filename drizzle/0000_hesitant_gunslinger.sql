CREATE TABLE "user" (
	"id" text PRIMARY KEY DEFAULT '2b645607-a46b-4411-ba18-78f83f1a04d8' NOT NULL,
	"email" text NOT NULL,
	"full_name" text,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
