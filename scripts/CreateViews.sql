

drop view if exists students_signed_out_today;
CREATE VIEW students_signed_out_today AS
SELECT  t2.id AS student_id, DATE_FORMAT(t1.time_collected, '%Y-%m-%d'), t2.first_name, t2.last_name,'1' AS signed_out_today,t2.isTestStudent
FROM signature_records t1,student t2 where DATE(time_collected) = CURDATE() and t1.student_id = t2.id 
UNION
SELECT  t1.id AS student_id,DATE_FORMAT(t2.time_collected, '%Y-%m-%d'),t1.first_name, t1.last_name,'0' AS signed_out_today,t1.isTestStudent
FROM student t1 
LEFT JOIN signature_records t2
	ON DATE(t2.time_collected) != CURDATE();

drop view if exists staff_absent_today;
CREATE VIEW staff_absent_today AS
select  distinct t1.first_name, t1.id AS user_id,  t1.last_name,  t2.start_date_time, t2.end_date_time, t2.reason
from user t1, absence t2, absence_owner t3 
where t2.id = t3.absence_id and t3.user_id = t1.id
and (t1.roles LIKE '%T%' OR t1.roles LIKE '%S%' OR t1.roles LIKE '%A%')
and NOW() BETWEEN t2.start_date_time and t2.end_date_time 
group by t1.id,t1.last_name,t1.first_name,t2.reason,t2.start_date_time, t2.end_date_time
order by user_id;

drop view if exists  student_attendance;
CREATE VIEW student_attendance AS
SELECT t1.first_name, t1.last_name, t3.reason,t3.start_date_time,t3.end_date_time,t1.id AS student_id,t7.id AS user_id,
t3.id as absence_id,t1.isTestStudent,
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
	ON t6.user_id = t7.id;

drop view if exists  students_absent_today;
CREATE VIEW students_absent_today AS
SELECT t1.first_name, t1.last_name, t3.reason,t3.start_date_time,t3.end_date_time,t3.parent_entered, t3.type, t1.id AS student_id,
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
	ON t4.classroom_id = t5.id;

drop view if exists birthdays;
CREATE VIEW `birthdays` AS
SELECT
t1.first_name,t1.last_name,t1.id AS student_id,'student' AS type,
t1.birthdate, t2.school_id
FROM student t1, classroom t2,class_student t3 where 
(birthdate + INTERVAL(YEAR(CURRENT_TIMESTAMP) - YEAR(birthdate)) + 0 YEAR) between date(now()) AND date(DATE_ADD(NOW(), 
INTERVAL 30 DAY)) and t1.id = t3.student_id and t2.id = t3.classroom_id
UNION
SELECT
t1.first_name,t1.last_name,t1.id AS staff_id,'staff' AS type,
t1.birthdate,t2.school_id
FROM user t1,user_school t2 where (birthdate + INTERVAL(YEAR(CURRENT_TIMESTAMP) - YEAR(birthdate)) + 0 YEAR) between date(now()) 
AND date(DATE_ADD(NOW(), INTERVAL 30 DAY))
and  (roles LIKE '%T%' OR roles LIKE '%S%' OR roles LIKE '%A%') 
and t1.id = t2.user_id
order by birthdate;

drop view if exists  parents_students;
CREATE VIEW parents_students AS
select  t1.id AS student_id,t1.isTestStudent,t1.first_name AS student_first,t1.last_name AS student_last,t3.first_name AS 
parent_first,t3.id AS user_id, t3.last_name AS parent_last,t5.name AS class,t6.name as GRADE,t1.allergies,t1.comments,t3.city,t3.state,t3.addr1,t3.addr2,t3.zip,t3.email,t3.phone,t3.public_profile,t3.cell_phone,t3.school_id
from student t1
LEFT JOIN user_student t2
	ON t2.student_id = t1.id
LEFT JOIN user t3
	ON t2.user_id = t3.id
LEFT JOIN class_student t4
	ON t4.student_id = t1.id
LEFT JOIN classroom t5
	ON t4.classroom_id = t5.id
LEFT JOIN grades t6
	ON t1.grade_id = t6.id 

