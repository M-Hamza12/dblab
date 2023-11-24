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
END; //

DELIMITER ;