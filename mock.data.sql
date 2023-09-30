CREATE TABLE CABINS(
    id bigint,
    createdAt date not null,
    name varchar(1000),
    maxCapacity int not null,
    regularPrice real not null,
    discout real,
    description varchar(1000),
    cabinImage varchar(1000),
    constraint cabins_pkey primary key(id)
);

CREATE TABLE GUESTS(
    id bigint,
    createdAt date not null,
    fullName varchar(100),
    email varchar(1000) UNIQUE,
    nationalId varchar(1000),
    countryFlag varchar(1000),
    constraint guests_pkey primary key(id)
);

insert into cabins values(221,'2003-09-11','ala',2,100034,100,'abca','abc');
insert into cabins values(22,'2002-09-11','adcala',23,104300,1001,'abca','abc');
insert into cabins values(33,'2001-09-11','algdsga',23,211000,1020,'abca','abc');
insert into cabins values(44,'2006-09-11','algsdgsa',12,211000,200,'abca','abc');

insert into guests(id,createdAt,fullName,nationalId,countryFlag) values(12,'2004-12-12','hamza malik','12121212','pakistan');
insert into guests(id,createdAt,fullName,nationalId,countryFlag) values(122,'2004-12-12','talha malik','12121212','pakistan');