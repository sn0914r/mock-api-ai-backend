CREATE TABLE "fake_apis" (
	"id" uuid PRIMARY KEY NOT NULL,
	"route" text NOT NULL,
	"schema_json" jsonb NOT NULL,
	"data_json" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
