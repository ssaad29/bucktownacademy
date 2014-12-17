SET FOREIGN_KEY_CHECKS = 0;

delete from absence_owner where student_id = 1231;
delete from student_notes where student_id = 1231;
delete from user_student where student_id = 1231;
delete from class_student where student_id = 1231;
delete from signature_records where student_id = 1231;
delete from student where id = 1231;

SET FOREIGN_KEY_CHECKS = 1;
