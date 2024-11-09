drop table if exists tasks;
drop table if exists account;

create table account (
 id serial primary key,
 email varchar(50) unique not null,
 password varchar(255) not null
);

create table tasks(
	id serial primary key,
	descriptions varchar(255) not null,
	is_deleted BOOLEAN DEFAULT FALSE,
	is_completed BOOLEAN DEFAULT FALSE
	
);


insert into tasks (descriptions) values('My test tasks');
insert into tasks (descriptions) values('My test tasks 2');