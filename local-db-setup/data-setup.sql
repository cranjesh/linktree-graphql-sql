DROP TABLE "music_player_type";
CREATE TABLE "music_player_type" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "music_player_type" ("id", "name") VALUES ('1', 'SPOTIFY');
INSERT INTO "music_player_type" ("id", "name") VALUES ('2', 'APPLE_MUSIC');
INSERT INTO "music_player_type" ("id", "name") VALUES ('3', 'SOUND_CLOUD');
INSERT INTO "music_player_type" ("id", "name") VALUES ('4', 'YOUTUBE_MUSIC');

DROP TABLE "status_of_show";
CREATE TABLE "status_of_show" (
	"id"	INTEGER,
	"status"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "status_of_show" ("id", "status") VALUES ('1', 'SOLD_OUT');
INSERT INTO "status_of_show" ("id", "status") VALUES ('2', 'NOT_ON_SALE');
INSERT INTO "status_of_show" ("id", "status") VALUES ('3', 'ON_SALE');

DROP TABLE "artist";
CREATE TABLE "artist" (
	"id"	TEXT,
	"name"	TEXT NOT NULL,
	"imageurl"	TEXT,
	PRIMARY KEY("id")
);
INSERT INTO "artist" ("id", "name", "imageurl") VALUES ('beatles_1234', 'The Beatles', 'http://img.com/thebeatles');

DROP TABLE "artist_classic_link";
CREATE TABLE "artist_classic_link" (
	"id"	INTEGER,
	"artistid"	TEXT NOT NULL,
	"title"	TEXT NOT NULL,
	"url"	TEXT,
    "created_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("artistid") REFERENCES  artist ("id")
	PRIMARY KEY("id" AUTOINCREMENT)
);

DROP TABLE "artist_music_player";
CREATE TABLE "artist_music_player" (
	"id"	INTEGER,
	"artistid" TEXT NOT NULL,
	"music_play_type_id" INTEGER NOT NULL,
	"url"	TEXT,
    "created_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("artistid") REFERENCES  artist ("id")
    FOREIGN KEY("music_play_type_id") REFERENCES  music_player_type ("id")
	PRIMARY KEY("id" AUTOINCREMENT)
);

DROP TABLE "artist_shows";
CREATE TABLE "artist_shows" (
	"id"	INTEGER,
	"artistid" TEXT NOT NULL,
	"status_of_show_id" INTEGER NOT NULL,
	"date"	DATE,
    "venue"	TEXT,
    "created_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY("artistid") REFERENCES  artist ("id")
    FOREIGN KEY("status_of_show_id") REFERENCES  status_of_show ("id")
	PRIMARY KEY("id" AUTOINCREMENT)
);