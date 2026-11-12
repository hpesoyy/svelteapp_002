create schema "data";

create extension ltree;
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";


create table "data"."users"(
	"id" integer primary key,
	"email" text not null,
	"hash_password" text not null,
	"name" text not null,
	"location" text not null,
	"occupation" text not null,
	"avatar_path" text not null
);

create table "data"."sessions"(
	"guid_id" uuid primary key,
	"user_id" integer not null,
	"expires" timestamp not null default(now() + interval '8 hour')
);

create table "data"."password_resets"(
	"guid_id" uuid primary key,
	"user_id" integer not null,
	"expires" timestamp not null default(now() + interval '7days'),
	"completed" boolean not null default TRUE
);

create table "data"."posts"(
	"id" integer primary key,
	"user_id" integer not null,
	"text" text not null,
	"created" timestamp not null default(now()),
	"visibility" text not null default 'public'
);

create table "data"."post_attachments"(
	"id" integer primary key,
	"post_id" integer not null,
	"path" text not null,
	"mime_type" text not null
);

create table "data"."post_comments"(
	"id" integer primary key,
	"post_id" integer not null,
	"user_id" integer not null,
	"created" timestamp not null default(now()),
	"text" text not null
);



create table "data"."post_tags"(
	"post_id" integer not null,
	"user_id" integer not null,
	primary key ("user_id","post_id")
);

CREATE TABLE "data"."friends"(
	"user_id" integer NOT NULL,
	"friend_id" integer NOT NULL,
	PRIMARY KEY("user_id","friend_id") 
);


create table "data"."notifications"(
	"id" integer not null,
	"created" timestamp not null default(now()),
	"user_id" integer not null,
	"friend_id" integer not null,
	"text" text not null,
	"viewed" boolean not null default false,
	"post_id" integer
);

ALTER TABLE "data"."sessions" ADD foreign key("user_id") references "data"."users"("id");
ALTER TABLE "data"."password_resets" ADD foreign key("user_id") references "data"."users"("id");
ALTER TABLE "data"."posts" ADD foreign key("user_id") references "data"."users"("id");
ALTER TABLE "data"."post_attachments" ADD foreign key("post_id") references "data"."posts"("id");
ALTER TABLE "data"."post_comments" ADD foreign key("post_id") references "data"."posts"("id");
ALTER TABLE "data"."post_comments" ADD foreign key("user_id") references "data"."users"("id");
ALTER TABLE "data"."post_tags" ADD foreign key("post_id") references "data"."posts"("id");
ALTER TABLE "data"."post_tags" ADD foreign key("user_id") references "data"."posts"("id");
ALTER TABLE "data"."friends" ADD foreign key("user_id") references "data"."users"("id");
ALTER TABLE "data"."friends" ADD foreign key("friend_id") references "data"."users"("id");
ALTER TABLE "data"."notifications" ADD foreign key("user_id") references "data"."users"("id");
ALTER TABLE "data"."notifications" ADD foreign key("friend_id") references "data"."users"("id");
ALTER TABLE "data"."notifications" ADD foreign key("post_id") references "data"."posts"("id");