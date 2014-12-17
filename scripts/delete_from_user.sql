SET FOREIGN_KEY_CHECKS = 0;

delete from user_class where user_id = 1891;
commit;
delete from absence_owner where user_id = 1891;
commit;
delete from user_school where user_id = 1891;
commit;
delete from user_student where user_id = 1891;
commit;
delete from user where id = 1891;
commit;

SET FOREIGN_KEY_CHECKS = 1;
