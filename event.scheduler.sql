
CREATE EVENT update_order_status
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 30 MINUTE
DO
  UPDATE orders
  SET status = 'completed'
  WHERE status = 'pending' AND placementTime <= NOW() - INTERVAL 30 MINUTE;
