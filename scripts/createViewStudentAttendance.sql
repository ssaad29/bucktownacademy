
drop view if exists student_attendance;

CREATE VIEW student_attendance AS
SELECT t1.first_name, t1.last_name, t1.id AS student_id,t7.id AS user_id,
t3.id as absence_id,
(case when t3.start_date_time <= NOW() and t3.end_date_time >= NOW() then 1 else 0 end) AS present
FROM student t1
LEFT JOIN absence_owner t2
	ON t1.id = t2.student_id and t2.absence_id in (select absence_id from absence_owner t1, absence t2 where 
t1.absence_id = t2.id and t2.start_date_time <= NOW() and t2.end_date_time >= NOW())
LEFT JOIN absence t3
	ON t2.absence_id = t3.id
INNER JOIN class_student t4
	ON t1.id = t4.student_id 
INNER JOIN classroom t5
	ON t4.classroom_id = t5.id
INNER JOIN user_class t6
	ON t5.id = t6.classroom_id
INNER JOIN user t7
	ON t6.user_id = t7.id