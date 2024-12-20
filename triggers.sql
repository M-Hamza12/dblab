DELIMITER //

CREATE OR REPLACE TRIGGER counter_increment
AFTER INSERT ON bookings
FOR EACH ROW
BEGIN
    DECLARE counter int;
    Select totalBookings into counter 
    from Cabins 
    where Cabins.id = NEW.cabinId;
    
    update Cabins
    set totalBookings = counter + 1
    where Cabins.id = NEW.cabinId;
    
    update guests
    set totalBooking = totalBooking + 1
    where guests.id = New.guestId;
END; //

DELIMITER ;


DELIMITER //

CREATE OR REPLACE TRIGGER addPrice
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    update bookings
    set totalPrice = totalPrice + New.totalPrice
    where bookings.id = New.bookingId;
END; //

DELIMITER //

CREATE OR REPLACE TRIGGER payment
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
   	update bookings
    set bookings.isPaid = false
    where bookings.id = New.bookingId;
END; //

DELIMITER ;
