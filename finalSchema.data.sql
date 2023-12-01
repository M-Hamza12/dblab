CREATE OR REPLACE TABLE GUESTS(
    id bigint AUTO_INCREMENT,
    createdAt date not null,
    fullName varchar(100),
    email varchar(1000),
    nationalId varchar(1000),
    countryFlag varchar(1000),
    profilePicture varchar(1000),
    password varchar(1000) not null ,
    role varchar(100) default 'guest',
    constraint guests_pkey primary key(id)
    
);
insert into guests values(12,'2004-12-12','hamza malik','hamza@gmal.com','+92','pakistan','hamza.png','test1234','guest');
insert into guests values(13,'2004-12-12','hamza malik','hamza@gmal.com','+92','pakistan','hamza.png','test1234','guest');




CREATE OR Replace TABLE CABINS(
    id bigint,
    createdAt date not null,
    name varchar(1000),
    maxCapacity int not null,
    regularPrice real not null,
    discount real,
    description varchar(1000),
    cabinImage varchar(1000),
    totalBookings int default 0,
    constraint cabins_pkey primary key(id)
);
insert into cabins values(34,'2001-09-11','madagacascar',23,211000,1020,'abca','abc',0);
insert into cabins values(35,'2001-09-11','sdfdf',23,211000,1020,'abca','abc',0);
insert into cabins values(36,'2001-09-11','anker',23,211000,1020,'abca','abc',0);
insert into cabins values(37,'2001-09-11','rateXY',23,211000,1020,'abca','abc',0);


CREATE TABLE features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    featureName VARCHAR(255) NOT NULL
);

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


insert into cabinFeatures values(34,1);
insert into cabinFeatures values(35,1);
insert into cabinFeatures values(35,2);
insert into cabinFeatures values(35,3);
insert into cabinFeatures values(36,1);
insert into cabinFeatures values(37,1);
insert into cabinFeatures values(37,4);

CREATE OR REPLACE TABLE Bookings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  createdAt DATETIME NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  numNights INT NOT NULL,
  totalPrice DECIMAL(10, 2) NOT NULL,
--   can use trigger here to check if status is valid
  status VARCHAR(255) NOT NULL,
  checkInDate date default NULL,
  checkOutDate date default NULL,
  isPaid BOOLEAN NOT NULL,
  description varchar(100) NOT NULL,
  cabinId BIGINT,
  guestId BIGINT,
  paymentMethod VARCHAR(255) NOT NULL default 'cash',
  FOREIGN KEY (cabinId) REFERENCES CABINS(id),
  FOREIGN KEY (guestId) REFERENCES Guests(id)
);
INSERT INTO Bookings VALUES (1, NOW(),'2023-11-26', '2023-11-28', 2,  100.00, 'Confirmed',NUll,NUll,False, 'abcd', 34,12,'cash');
INSERT INTO Bookings VALUES (2, NOW(),'2024-11-26', '2024-11-28', 2,  100.00, 'Confirmed',NUll,NUll,False, 'abcd', 34,12,'cash');
create table items(
	itemId bigint , 
    price int not null default 10,
    picture varchar(100),
    name varchar(100),
    constraint table_PK primary key(itemId)
);

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

create table Orders(
	id bigInt,
    totalPrice int,
    bookingId bigInt,
    orderDate date,
    PRIMARY KEY (id),
    FOREIGN KEY(bookingId) REFERENCES Bookings(id)
);

insert into orders values(1,2000,1,'2023-01-01');
insert into orders values(3,2000,1,'2023-01-01');
insert into orders values(2,20020,2,'2023-01-01');

create table OrderItems(
	orderId bigInt,
    itemId bigint, 
    quantity int,
    PRIMARY KEY(orderId,itemId),
    FOREIGN KEY(orderId) REFERENCES Orders(id),
    FOREIGN KEY(itemId) REFERENCES items(itemId) 
);
insert into orderitems values(1,5,2);
insert into orderitems values(1,4,2);
insert into orderitems values(3,4,2);
insert into orderitems values(2,5,2);