drop view if exists `staff_present_today`;
CREATE VIEW `staff_present_today` AS
select  distinct t1.id, t1.first_name, t1.last_name,  t2.start_date_time, t2.end_date_time
from user t1, absence t2, absence_owner t3 
where t2.id = t3.absence_id and t3.user_id = t1.id
and (t1.roles LIKE '%T%' OR t1.roles LIKE '%S%' OR t1.roles LIKE '%A%')
and CURDATE() BETWEEN t2.start_date_time and t2.end_date_time;
commit;