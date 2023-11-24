-- CREATE TABLE CABINS (
--     id BIGINT,
--     createdAt DATE NOT NULL,
--     name VARCHAR(1000),
--     maxCapacity INT NOT NULL,
--     regularPrice REAL NOT NULL,
--     discount REAL,
--     description VARCHAR(1000),
--     cabinImage VARCHAR(1000),
--     isAnimalFriendly BOOLEAN, 
--     totalBookings INT DEFAULT 0,
--     CONSTRAINT cabins_pkey PRIMARY KEY(id)
-- );
-- to keep data i'm using this table
CREATE TABLE Booking (
  id BIGINT PRIMARY KEY,
  createdAt DATETIME NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  numNights INT NOT NULL,
  numGuests INT NOT NULL,
  cabinPrice DECIMAL(10, 2) NOT NULL,
  extrasPrice DECIMAL(10, 2) NOT NULL,
  totalPrice DECIMAL(10, 2) NOT NULL,
--   can use trigger here to check if status is valid
  status VARCHAR(255) NOT NULL,
  checkInDate date default NULL,
  checkOutDate date default NULL,
  hasBreakfast BOOLEAN NOT NULL,
  isPaid BOOLEAN NOT NULL,
  observation BOOLEAN NOT NULL,
  cabinId INT,
  guestId INT,
  dealId INT,
  FOREIGN KEY (cabinId) REFERENCES CABINS(id),
  FOREIGN KEY (guestId) REFERENCES Guests(id),
  FOREIGN KEY (dealId) REFERENCES Deals(id)
);

create table deals(
	dealID bigint,
    itemId bigint,
    constraint deals_PK primary key(dealId,itemId),
    constraint deals_FK foreign key(itemId) REFERENCES items(itemId)
);
CREATE TABLE GUESTS(
    id bigint,
    createdAt date not null,
    fullName varchar(100),
    email varchar(1000),
    nationalId varchar(1000),
    countryFlag varchar(1000),
    profilePicture varchar(1000)
    constraint guests_pkey primary key(id)
)
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
ALTER TABLE Cabins
ADD COLUMN totalBookings INT DEFAULT 0;
ALTER TABLE Cabins
ADD COLUMN isAnimalFriendly boolean DEFAULT false;

--some data
insert into cabins values(34,'2001-09-11','madagacascar',23,211000,1020,'abca','abc','New York',1,0,1);
insert into cabins values(35,'2001-09-11','massion',23,211000,1020,'abca','abc','New York',1,0,1);
insert into cabins values(36,'2001-09-11','royal room',23,211000,1020,'abca','abc','New York',1,0,1);
insert into cabins values(37,'2001-09-11','jakoosi',23,211000,1020,'abca','abc','New York',1,0,1);
insert into cabins values(38,'2001-09-11','snt antonio',23,211000,1020,'abca','abc','New York',1,0,1);

CREATE TABLE features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    featureName VARCHAR(255) NOT NULL
);
--some data
insert into features(featureName) values('wifi');
insert into features(featureName) values('swimming pool');
insert into features(featureName) values('balcony');
insert into features(featureName) values('waterbed');


CREATE TABLE CabinFeatures (
    cabinID bigint(20),
    featureID int,
    FOREIGN KEY (cabinID) REFERENCES Cabins(id),
    FOREIGN KEY (featureID) REFERENCES features(id),
    PRIMARY KEY (cabinID, featureID)
);
--some data
insert into cabinFeatures values(33,1);
insert into cabinFeatures values(34,1);
insert into cabinFeatures values(35,1);
insert into cabinFeatures values(35,2);
insert into cabinFeatures values(35,3);
insert into cabinFeatures values(36,1);
insert into cabinFeatures values(37,1);
insert into cabinFeatures values(37,4);
insert into cabinFeatures values(38,4);


create table items(
	itemId bigint, // just for consistency
    price int,
    picture varchar(100),
    name varchar(100),
    constraint table_PK primary key(itemId)
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

