DROP DATABASE IF EXISTS earworm;
CREATE DATABASE earworm;

\c earworm;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  genre_name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  img_url VARCHAR NOT NULL,
  user_id INT REFERENCES users(id),
  genre_id INT REFERENCES genres(id),
  posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  userfav_id INT REFERENCES users(id),
  songfav_id INT REFERENCES songs(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment_body VARCHAR NOT NULL,
  usercom_id INT REFERENCES users(id),
  songcom_id INT REFERENCES songs(id)
);

INSERT INTO users (username)
VALUES ('hackamorealike'), ('uprootlint'), ('icesilk'), ('jemoryclubbed'), ('boveschili'), ('rubbermosque'), ('makeshiftflooming'), ('routeshusky'), ('underfootpastrami'), ('batontantrum');

INSERT INTO genres (genre_name)
VALUES ('Hip-Hop'), ('Pop'), ('Rock'), ('Latin'), ('neo-classical');

INSERT INTO songs (title, img_url, user_id, genre_id)
VALUES ('Middle Child by JCole', 'https://static.stereogum.com/uploads/2019/01/Middle-Child-1548260765-640x640.jpg', 1, 1), ('ALOT by 21 Savage', 'https://ssle.ulximg.com/image/750x750/cover/1545378883_b12804857c71cbb1815a4204c454ba07.jpg/ccc7026048c19452fe9888226d3b30a3/1545378883_3970b2e3e8b09d667140507d98f4ea85.jpg', 1, 1), ('WOW by Post Malone', 'https://upload.wikimedia.org/wikipedia/en/5/5e/Post_Malone_-_Wow.png', 2, 1), ('Thank U, Next by Ariana Grande', 'https://upload.wikimedia.org/wikipedia/en/b/b2/Ariana_Grande_Thank_U_Next.png' , 2, 2), ('High Hopes by Panic! At the Disco', 'http://d2lubch9d26anb.cloudfront.net/cdn/farfuture/riCmkk36BSpnk8gyyai6VzzZ20aOOeI-UmdwOH6neo4/mtime:1545429187/sites/default/files/panic_at_the_disco-high_hopes_s.jpg', 1, 2), ('Bohemian Rhapsody by Queen', 'https://img.discogs.com/1WIiym3cdowg4OO7w4ImCxNUe74=/fit-in/600x588/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-486489-1432753423-4760.jpeg.jpg', 1, 3), ('Chlorine by twenty one pilots', 'https://img.discogs.com/Z71XSro-dlLT9IYQVQAN6O28QKM=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-13001168-1546892886-9200.jpeg.jpg', 1, 3), ('Ella Quiere Beber by Anuel AA & Romeo Santos', 'https://crank11.news/wp-content/uploads/sites/3/2018/11/ba4bc9e6b75b4f15a0961372c11a3d84.jpg', 1, 4), ('Solo de Mi by BadBunny', 'https://crank11.news/wp-content/uploads/sites/3/2018/12/9789b111f9384d4f9843bd51eafaaab2.jpg', 1, 4), ('Victory by Two Steps From Hell', 'https://vignette.wikia.nocookie.net/two-steps-from-hell/images/7/7d/Battlecry_Anthology.png/revision/latest?cb=20170408005522', 1, 5), ('Blue Strips by Lil Skies', 'https://images.genius.com/31a21dbbb6b8d2cfbae34cc418a132b7.770x770x1.jpg', 1, 1), ('Sin Pijama by Becky G, Natti Natasha', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Sin_Pijama.png/220px-Sin_Pijama.png', 4, 4), ('High Top Versace by 2 Chainz Featuring Young Thug', 'https://i2.wp.com/www1.24naijamuzic.com/wp-content/uploads/2019/03/Rap-Or-Go-To-The-League.png?w=620&ssl=1', 6, 1), ('No Plan by Hozier', 'https://media.pitchfork.com/photos/5c6daa5ea042db4303a2fa85/1:1/w_320/Hozier_WastelandBaby.jpg', 10, 3), ('Be Alright by Dean Lewis', 'https://upload.wikimedia.org/wikipedia/en/1/11/Be_Alright_by_Dean_Lewis.jpg', 7, 2);

INSERT INTO favorites (userfav_id, songfav_id)
VALUES (1, 15), (1, 5), (1, 3), (1, 10), (1, 1), (1, 11), (1, 12), (1, 2), (1, 6), (1, 13), (1, 14), (4, 1), (4, 6), (4, 15), (4, 2), (10, 2), (10, 1), (10, 4), (10, 5), (3, 8), (3, 1), (5, 15), (5, 2), (5, 6), (8, 2), (8, 6), (8, 1), (9, 1), (9, 11), (6, 1), (6, 3), (6, 13), (2, 1), (2, 4), (2, 13), (2, 15), (7, 1), (7, 4), (7, 8), (7, 15);

INSERT INTO comments (comment_body, usercom_id, songcom_id)
VALUES ('Lorem ipsum dolor sit amet, mea ei nullam molestie dissentias.', 1, 3), ('amet, pri ex appareat adipisci, praesent.', 1, 15), ('eu vitae putent vim, vel facilis admodum at! No mea minim nominavi vulputate? Te vel.', 2, 13), ('dolor sit ame', 3, 1), ('error similique assueverit eu eam.', 4, 1), ('Harum postea cum an. Populo signiferumque quo ut.
', 2, 5), ('In usu vocibus omnesque maluisset', 5, 13), ('In quot dicit referrentur vel, mea tota noster delenit.', 10, 1), ('Eos no maiorum explicari, ei his vitae legere soluta?', 4, 10), ('conceptam rationibus, ne justo scaevola pertinacia usu?', 7, 1), ('Eos impetus apeirian cu.', 6, 11), ('Vix et probo option, vel cu tota verterem', 8, 2), ('Zril scripserit vix ut, qui agam putant placerat cu', 1, 14), ('vix audire verterem te! Eam cu vivendum menandri', 9, 1), ('Id eos reque graeco ancillae', 4, 8), ('populo eruditi', 3, 6), ('duo at!', 7, 3), ('laudem ex mei. Ex est facilis principes', 1, 5), ('Meis assum voluptaria', 4, 2), ('ne, malis laudem', 10, 14);
