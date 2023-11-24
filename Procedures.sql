--Procedures
-- 1
DELIMITER //

CREATE OR REPLACE PROCEDURE GetFutureBookingsForCabin(IN cabinIdParam INT,dateParam date)
BEGIN
    SELECT
       startDate,endDate
    FROM
        Bookings
    WHERE
        cabinId = cabinIdParam
        AND startDate > dateParam;
END //

DELIMITER ;
call GetFutureBookingsForCabin(44,'1912-06-01');