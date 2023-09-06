-- 
CREATE TABLE IF NOT EXISTS user_session(
    _id serial NOT NULL,
    cookie_id varchar NOT NULL,
    user_id bigint NOT NULL,
    date_of_creation timestamp NOT NULL,
    CONSTRAINT "user_session_pk0" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

-- Users table
CREATE TABLE IF NOT EXISTS users(
    _id serial NOT NULL,
    username varchar NOT NULL,
    password varchar NOT NULL,
    CONSTRAINT "users_pk0" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

--Book Review table
CREATE TABLE IF NOT EXISTS book_review(
    _id serial NOT NULL,
    title varchar NOT NULL,
    author varchar NOT NULL,
    genre varchar NOT NULL,
    rating varchar NOT NULL,
    feeling varchar NOT NULL,
    CONSTRAINT "book_review_pk0" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

/*
Sessions:
    -users
*/
ALTER TABLE user_session ADD CONSTRAINT "user_session_fk0" FOREIGN KEY ("user_id") REFERENCES users("_id");

/*
Users:
    -unique username
*/
ALTER TABLE users ADD CONSTRAINT "unique_username" UNIQUE ("username");

/*
Book Review:
    - group_id
*/
ALTER TABLE book_review ADD CONSTRAINT "book_review_fk0" FOREIGN KEY ("user_id") REFERENCES user("_id");

/*
Travel Group Members:
    - user_id: users
    - group_id: travel_group
*/

ALTER TABLE group_members ADD CONSTRAINT "group_members_fk0" FOREIGN KEY ("user_id") REFERENCES users("_id");
ALTER TABLE group_members ADD CONSTRAINT "group_members_fk1" FOREIGN KEY ("group_id") REFERENCES travel_group("_id");
-- Add UNIQUE constraint of user_id + group_id
ALTER TABLE group_members ADD CONSTRAINT "unique_user_group" UNIQUE ("user_id", "group_id");