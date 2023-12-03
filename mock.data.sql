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
CREATE TABLE Bookings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
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
--   observation is string
  observation BOOLEAN NOT NULL,
  cabinId BIGINT,
  guestId BIGINT,
  dealId BIGINT,
  paymentMethod VARCHAR(255) NOT NULL default 'cash',
  FOREIGN KEY (cabinId) REFERENCES CABINS(id),
  FOREIGN KEY (guestId) REFERENCES Guests(id),
  FOREIGN KEY (dealId) REFERENCES Deals(dealID)
);
ALTER TABLE bookings 
add COLUMN description varchar(100) 
create table deals(
	dealID bigint,
    itemId bigint,
    constraint deals_PK primary key(dealId,itemId),
    constraint deals_FK foreign key(itemId) REFERENCES items(itemId)
);
CREATE TABLE GUESTS(
    id bigint AUTO_INCREMENT,
    createdAt date not null,
    fullName varchar(100),
    email varchar(1000),
    nationalId varchar(1000),
    countryFlag varchar(1000),
    profilePicture varchar(1000)
    constraint guests_pkey primary key(id)
    password varchar(1000) not null 
    role varchar(100) default 'guest'
)
-- to keep data i'm using this table
ALTER TABLE Guests
ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'guest',
ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '12345678';
-- token varchar(1000) not null
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
	itemId bigint , // just for consistency
    price int not null default 10,
    picture varchar(100),
    name varchar(100),
    constraint table_PK primary key(itemId)
);
Alter table items add column deleted Boolean default false;
INSERT INTO items (itemId, name, price, picture) VALUES
(4, 'Oatmeal Bar', 20, 'oatmeal_bar_picture.jpg'),
(5, 'Pancakes', 20, 'pancakes_picture.jpg'),
(6, 'Yogurt', 20, 'yogurt_picture.jpg'),
(7, 'Granola', 20, 'granola_picture.jpg'),
(8, 'Fruit', 20, 'fruit_picture.jpg'),
(9, 'Muffins', 20, 'muffins_picture.jpg'),
(10, 'Banana Pancakes', 20, 'banana_pancakes_picture.jpg'),
(11, 'Toast with Nut Butter', 20, 'toast_nut_butter_picture.jpg'),
(12, 'Salmon Toast', 20, 'salmon_toast_picture.jpg'),
(13, 'Dippy Eggs', 20, 'dippy_eggs_picture.jpg'),
(14, 'No Breakfast', 20, 'not_included_picture.jpg'),
(15, 'Croissant', 20, 'croissant_picture.jpg'),
(16, 'Cereal', 20, 'cereal_picture.jpg'),
(17, 'Smoothie', 20, 'smoothie_picture.jpg'),
(18, 'Bagel', 20, 'bagel_picture.jpg'),
(19, 'French Toast', 20, 'french_toast_picture.jpg'),
(20, 'Tea', 20, 'tea_picture.jpg');

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


INSERT INTO Bookings (createdAt, startDate, endDate, numNights, numGuests, cabinPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observation, cabinId, guestId)
VALUES (NOW(), '2023-11-26', '2023-11-28', 2, 1, 100.00, 20.00, 120.00, 'Confirmed', TRUE, FALSE, FALSE, 22, 12);
INSERT INTO Bookings (createdAt, startDate, endDate, numNights, numGuests, cabinPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observation, cabinId, guestId)
VALUES (NOW(), '2023-11-29', '2023-11-30', 1, 1, 120.00, 30.00, 150.00, 'Confirmed', FALSE, FALSE, FALSE, 33, 122);
INSERT INTO Bookings (createdAt, startDate, endDate, numNights, numGuests, cabinPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observation, cabinId, guestId)
VALUES (NOW(), '2023-11-30', '2023-12-01', 1, 1, 150.00, 40.00, 190.00, 'Confirmed', TRUE, FALSE, FALSE, 44, 12);
INSERT INTO Bookings (createdAt, startDate, endDate, numNights, numGuests, cabinPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observation, cabinId, guestId)
VALUES (NOW(), '2023-12-05', '2023-12-07', 2, 1, 100.00, 20.00, 120.00, 'Confirmed', TRUE, FALSE, FALSE, 22, 122);
INSERT INTO Bookings (createdAt, startDate, endDate, numNights, numGuests, cabinPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observation, cabinId, guestId)
VALUES (NOW(), '2023-12-08', '2023-12-10', 2, 1, 120.00, 30.00, 150.00, 'Confirmed', FALSE, FALSE, FALSE, 33, 12);
INSERT INTO Bookings (createdAt, startDate, endDate, numNights, numGuests, cabinPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observation, cabinId, guestId)
VALUES (NOW(), '2023-12-11', '2023-12-15', 4, 1, 150.00, 40.00, 190.00, 'Confirmed', TRUE, FALSE, FALSE, 44, 122);


create table Orders(
	id bigInt,
    totalPrice int,
    bookingId bigInt,
    orderDate date,
    PRIMARY KEY (id),
    FOREIGN KEY(bookingId) REFERENCES Bookings(id)
);
insert into orders values(1,2000,2730419903,'2023-01-01');
insert into orders values(2,20020,4469851924,'2023-01-01');

create table OrderItems(
	orderId bigInt,
    itemId bigint, -- remember in my scehma it is int and not bigINT so chceck for your schema
    quantity int,
    PRIMARY KEY(orderId,itemId),
    FOREIGN KEY(orderId) REFERENCES Orders(id),
    FOREIGN KEY(itemId) REFERENCES items(itemId) 
);

insert into orderItems values(1,2,5);
insert into orderItems values(1,3,23);
insert into orderItems values(1,4,22);
insert into orderItems values(1,5,3);
insert into orderItems values(2,5,5);
insert into orderItems values(2,6,23);
insert into orderItems values(2,7,22);
insert into orderItems values(2,8,3);