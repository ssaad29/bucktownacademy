
drop view if exists `student_attendance`;
CREATE VIEW `student_attendance` AS
SELECT t1.first_name, t1.last_name,t5.shortname AS class, t2.reason,t2.start_date_time,t2.end_date_time,t6.id AS user_id, t1.id AS student_id,
t2.id as absence_id,
t2.start_date_time >= CURDATE() and t2.end_date_time <= CURDATE() AS present
FROM `student` t1, absence t2, absence_owner t3, class_student t4, classroom t5,user t6,user_class t7
where t1.id = t3.student_id and 
t2.id = t3.absence_id and 
t1.id = t4.student_id and 
t6.id = t7.user_id and 
t5.id = t7.classroom_id

