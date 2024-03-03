-- seed.sql

-- Guest seed data
INSERT INTO Guests VALUES (12, '2004-12-12', 'hamza malik', 'hamza@gmal.com', '+92', 'pakistan', 'hamza.png', 'test1234', 'guest');
INSERT INTO Guests VALUES (13, '2004-12-12', 'hamza malik', 'hamza@gmal.com', '+92', 'pakistan', 'hamza.png', 'test1234', 'guest');

-- Cabin seed data
INSERT INTO Cabins VALUES (34, '2001-09-11', 'madagascar', 23, 211000, 1020, 'abca', 'abc', 0);
INSERT INTO Cabins VALUES (35, '2001-09-11', 'sdfdf', 23, 211000, 1020, 'abca', 'abc', 0);
INSERT INTO Cabins VALUES (36, '2001-09-11', 'anker', 23, 211000, 1020, 'abca', 'abc', 0);
INSERT INTO Cabins VALUES (37, '2001-09-11', 'rateXY', 23, 211000, 1020, 'abca', 'abc', 0);

-- Features seed data
INSERT INTO Features (featureName) VALUES ('wifi');
INSERT INTO Features (featureName) VALUES ('swimming pool');
INSERT INTO Features (featureName) VALUES ('balcony');
INSERT INTO Features (featureName) VALUES ('waterbed');

-- CabinFeatures seed data
INSERT INTO CabinFeatures VALUES (34, 1);
INSERT INTO CabinFeatures VALUES (35, 1);
INSERT INTO CabinFeatures VALUES (35, 2);
INSERT INTO CabinFeatures VALUES (35, 3);
INSERT INTO CabinFeatures VALUES (36, 1);
INSERT INTO CabinFeatures VALUES (37, 1);
INSERT INTO CabinFeatures VALUES (37, 4);

-- Booking seed data
INSERT INTO Bookings VALUES (1, NOW(), '2023-11-26', '2023-11-28', 2, 100.00, 'Confirmed', NULL, NULL, FALSE, 'abcd', 34, 12, 'cash');
INSERT INTO Bookings VALUES (2, NOW(), '2024-11-26', '2024-11-28', 2, 100.00, 'Confirmed', NULL, NULL, FALSE, 'abcd', 34, 12, 'cash');

-- Item seed data
INSERT INTO Items (itemId, name, price, picture) VALUES
(4, 'Oatmeal Bar', 20, 'oatmeal_bar_picture.jpg'),
-- ... (insert other items)

-- Order seed data
INSERT INTO Orders VALUES (1, 2000, 1, '2023-01-01');
INSERT INTO Orders VALUES (3, 2000, 1, '2023-01-01');
INSERT INTO Orders VALUES (2, 20020, 2, '2023-01-01');

-- OrderItem seed data
INSERT INTO OrderItems VALUES (1, 5, 2);
INSERT INTO OrderItems VALUES (1, 4, 2);
INSERT INTO OrderItems VALUES (3, 4, 2);
INSERT INTO OrderItems VALUES (2, 5, 2);

-- Admin seed data
INSERT INTO Admin VALUES (1, 'admin', 'admin@gmail.com', 'test1234', 'admin');
