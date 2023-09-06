DELETE FROM user_session
WHERE DATEADD(MINUTE, 30, date_of_creation) < to_timestamp(to_char(now()));
