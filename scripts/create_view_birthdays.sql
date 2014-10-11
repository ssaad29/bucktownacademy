drop view if exists `birthdays`;
CREATE VIEW `birthdays` AS
SELECT
first_name,last_name,id,'student' AS type,
birthdate
FROM student where 
(birthdate + INTERVAL(YEAR(CURRENT_TIMESTAMP) - YEAR(birthdate)) + 0 YEAR) between date(now()) AND date(DATE_ADD(NOW(), INTERVAL 30 DAY)) 
UNION
SELECT
first_name,last_name,id,'staff' AS type,
birthdate
FROM user where (birthdate + INTERVAL(YEAR(CURRENT_TIMESTAMP) - YEAR(birthdate)) + 0 YEAR) between date(now()) AND date(DATE_ADD(NOW(), INTERVAL 30 DAY))
and  (roles LIKE '%T%' OR roles LIKE '%S%' OR roles LIKE '%A%') order by birthdate

