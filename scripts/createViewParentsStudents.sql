drop view if exists parents_students;
CREATE VIEW parents_students AS
select t1.id AS student_id,t5.id AS user_id, t1.first_name AS student_first,t1.last_name AS student_last,t1.grade,t1.allergies,t1.comments,t3.name AS class,t5.first_name AS
parent_first,t5.last_name AS parent_last,t5.city,t5.state,t5.addr1,t5.addr2,t5.zip,t5.email,t5.phone
from student t1
INNER JOIN class_student t2
	ON t1.id = t2.student_id 
INNER JOIN classroom t3
	ON t3.id = t2.classroom_id
INNER JOIN user_student t4
	ON t1.id = t4.student_id  
INNER JOIN public.user t5
	ON t4.user_id = t5.id  
