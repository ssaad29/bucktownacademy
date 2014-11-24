drop view if exists students_signed_out_today;
CREATE VIEW students_signed_out_today AS
SELECT  t2.id AS student_id, DATE_FORMAT(t1.time_collected, '%Y-%m-%d'), t2.first_name, t2.last_name,'1' AS signed_out_today
FROM signature_records t1,student t2 where DATE(time_collected) = CURDATE() and t1.student_id = t2.id
UNION
SELECT  t2.id, DATE_FORMAT(t1.time_collected, '%Y-%m-%d'), t2.first_name, t2.last_name,'0' AS signed_out_today
FROM signature_records t1,student t2 where DATE(time_collected) != CURDATE() 