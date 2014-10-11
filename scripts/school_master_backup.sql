drop database school_master;
create database school_master;
use school_master;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `school` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `addr1` varchar(100) DEFAULT NULL,
  `addr2` varchar(100) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip` varchar(12) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `admin_email` varchar(45) DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulletins`
--

DROP TABLE IF EXISTS `bulletins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bulletins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `reminder` int(11) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bulletins.school_id` (`school_id`),
  CONSTRAINT `bulletins.school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulletins`
--

DROP TABLE IF EXISTS `sponsorship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sponsorship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `call to action` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `logo` varchar(500) DEFAULT NULL,
  `background_image` varchar(500) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sponsorship.school_id` (`school_id`),
  CONSTRAINT `sponsorship.school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `school_id` int(11) DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `school_id` (`school_id`),
  CONSTRAINT `school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classroom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `is_subject` tinyint(4) DEFAULT 1,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `classroom.school_id` (`school_id`),
  CONSTRAINT `classroom?school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `grade_id` int(11) DEFAULT NULL,
  `allergies` varchar(500) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `grade_id` (`grade_id`),
  CONSTRAINT `grade_id` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1019 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `roles` varchar(8) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `addr1` varchar(100) DEFAULT NULL,
  `addr2` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(15) DEFAULT NULL,
  `public_profile` tinyint(4) DEFAULT 1,
  `zip` varchar(15) DEFAULT NULL,
  `cell_phone` varchar(45) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  KEY `school_id_user_table` (`school_id`),
  CONSTRAINT `school_id_user_table` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1604 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


CREATE TABLE `absence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date_time` datetime NOT NULL,
  `end_date_time` datetime DEFAULT NULL,
  `reason` varchar(300) DEFAULT NULL,
  `tardy_dismissal_time` varchar(60) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `parent_entered` tinyint(4) DEFAULT 0,
  `school_entered` tinyint(4) DEFAULT 0,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `school_id_absence` (`school_id`),
  CONSTRAINT `school_id_absence` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `absence_owner`;
CREATE TABLE `absence_owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `absence_id` int(11) NOT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `absence_owner.user_id_idx` (`user_id`),
  KEY `absence_owner.student_id_idx` (`student_id`),
  KEY `absence_owner.absence_id` (`absence_id`),
  CONSTRAINT `absence_owner?absence_id` FOREIGN KEY (`absence_id`) REFERENCES `absence` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `absence_owner?student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `absence_owner?user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `class_bulletins`
--

DROP TABLE IF EXISTS `class_bulletins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_bulletins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bulletin_id` int(11) NOT NULL,
  `classroom_id` int(11) DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `class_id_idx` (`classroom_id`),
  KEY `class_.bulletin_id_idx` (`bulletin_id`),
  CONSTRAINT `class_bulletins?class_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `class_bulletins?bulletin_id` FOREIGN KEY (`bulletin_id`) REFERENCES `bulletins` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=710 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `class_student`
--

DROP TABLE IF EXISTS `class_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `classroom_id` int(11) DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `class_id_idx` (`classroom_id`),
  KEY `class_student.student_id_idx` (`student_id`),
  CONSTRAINT `class_student?class_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `class_student?student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=710 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_class`
--

DROP TABLE IF EXISTS `user_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classroom_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_class_classroom_id` (`classroom_id`),
  CONSTRAINT `user_class_classroom_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  KEY `user_class_user_id` (`user_id`),
  CONSTRAINT `user_class_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `user_student`
--

DROP TABLE IF EXISTS `user_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_student.user_id_idx` (`user_id`),
  KEY `user_student.student_id` (`student_id`),
  CONSTRAINT `user_student?student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_student?user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=553 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_school`
--

DROP TABLE IF EXISTS `user_school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_school` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_school.user_id_idx` (`user_id`),
  KEY `user_school.school_id` (`school_id`),
  CONSTRAINT `user_school?school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_school?user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=553 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_school`
--

DROP TABLE IF EXISTS `sponsorship_school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sponsorship_school` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `sponsorship_id` int(11) NOT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sponsorship_school.sponsorship_id_idx` (`sponsorship_id`),
  KEY `sponsorship_school.school_id` (`school_id`),
  CONSTRAINT `sponsorship_school?school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sponsorship_school?sponsorship_id` FOREIGN KEY (`sponsorship_id`) REFERENCES `sponsorship` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=553 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE VIEW staff_absent_today AS
select  distinct t1.first_name, t1.id AS user_id,  t1.last_name,  t2.start_date_time, t2.end_date_time, t2.reason
from user t1, absence t2, absence_owner t3 
where t2.id = t3.absence_id and t3.user_id = t1.id
and (t1.roles LIKE '%T%' OR t1.roles LIKE '%S%' OR t1.roles LIKE '%A%')
and NOW() BETWEEN t2.start_date_time and t2.end_date_time 
group by t1.id,t1.last_name,t1.first_name,t2.reason,t2.start_date_time, t2.end_date_time
order by user_id;

CREATE VIEW student_attendance AS
SELECT t1.first_name, t1.last_name, t3.reason,t3.start_date_time,t3.end_date_time,t1.id AS student_id,t7.id AS user_id,
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
	ON t6.user_id = t7.id;

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

CREATE VIEW parents_students AS
select t1.id AS student_id,t5.id AS user_id, t1.first_name AS student_first,t1.last_name AS student_last,t6.name as GRADE,t1.allergies,t1.comments,t3.name AS class,t5.first_name AS
parent_first,t5.last_name AS parent_last,t5.city,t5.state,t5.addr1,t5.addr2,t5.zip,t5.email,t5.phone,t5.public_profile,t5.cell_phone,t5.school_id
from student t1
INNER JOIN class_student t2
	ON t1.id = t2.student_id 
INNER JOIN classroom t3
	ON t3.id = t2.classroom_id
INNER JOIN user_student t4
	ON t1.id = t4.student_id  
INNER JOIN user t5
	ON t4.user_id = t5.id  
INNER JOIN grades t6
	ON t1.grade_id = t6.id  


-- Dump completed on 2013-10-25 20:44:09
