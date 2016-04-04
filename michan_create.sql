create database michan;
use michan;
create table threads(
	id int auto_increment,
	primary key (id)
);
create table users(
	id int auto_increment,
	username varchar(16) not null unique,
	name varchar(16) not null,
	password varchar(64) not null,
	primary key (id)
);
create table posts(
	id int auto_increment,
	thread_id int not null,
	user_id int not null,
	subject varchar(32),
	content text not null,
	image varchar(24),
	date datetime not null,
	primary key (id),
	foreign key (thread_id) references threads(id),
	foreign key (user_id) references users(id)
);

