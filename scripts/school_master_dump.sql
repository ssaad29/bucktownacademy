-- MySQL dump 10.13  Distrib 5.6.11, for osx10.7 (x86_64)
--
-- Host: localhost    Database: school_master
-- ------------------------------------------------------
-- Server version	5.6.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `absence`
--

DROP TABLE IF EXISTS `absence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `absence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date_time` datetime NOT NULL,
  `end_date_time` datetime DEFAULT NULL,
  `reason` varchar(300) DEFAULT NULL,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absence`
--

LOCK TABLES `absence` WRITE;
/*!40000 ALTER TABLE `absence` DISABLE KEYS */;
/*!40000 ALTER TABLE `absence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `absence_owner`
--

DROP TABLE IF EXISTS `absence_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `absence_owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `absence_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `absence_owner.user_id_idx` (`user_id`),
  KEY `absence_owner.student_id_idx` (`student_id`),
  KEY `absence_owner.absence_id` (`absence_id`),
  CONSTRAINT `absence_owner?student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `absence_owner?absence_id` FOREIGN KEY (`absence_id`) REFERENCES `absence` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `absence_owner?user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absence_owner`
--

LOCK TABLES `absence_owner` WRITE;
/*!40000 ALTER TABLE `absence_owner` DISABLE KEYS */;
/*!40000 ALTER TABLE `absence_owner` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`),
  KEY `class_id_idx` (`classroom_id`),
  KEY `class_student.student_id_idx` (`student_id`),
  CONSTRAINT `class_student?class_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `class_student?student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=710 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_student`
--

LOCK TABLES `class_student` WRITE;
/*!40000 ALTER TABLE `class_student` DISABLE KEYS */;
INSERT INTO `class_student` VALUES (627,936,226),(628,937,226),(629,938,226),(630,939,226),(631,940,226),(632,941,226),(633,942,226),(634,943,226),(635,944,226),(636,945,226),(637,946,226),(638,947,226),(639,948,226),(640,949,226),(641,950,226),(642,951,226),(643,952,226),(644,953,226),(645,954,226),(646,955,226),(647,956,226),(648,957,226),(649,958,226),(650,959,226),(651,960,227),(652,961,227),(653,962,227),(654,963,227),(655,964,227),(656,965,227),(657,966,227),(658,967,227),(659,968,227),(660,969,227),(661,970,227),(662,971,227),(663,972,227),(664,973,227),(665,974,227),(666,975,227),(667,976,227),(668,977,227),(669,978,227),(670,979,227),(671,980,227),(672,981,227),(673,982,227),(674,983,227),(675,984,227),(676,985,227),(677,986,227),(678,987,226),(679,988,226),(680,989,229),(681,990,229),(682,991,229),(683,992,229),(684,993,229),(685,994,229),(686,995,229),(687,996,229),(688,997,229),(689,998,229),(690,999,229),(691,1000,229),(692,1001,229),(693,1002,229),(694,1003,229),(695,1004,229),(696,1005,229),(697,1006,229),(698,1007,229),(699,1008,229),(700,1009,229),(701,1010,229),(702,1011,229),(703,1012,229),(704,1013,229),(705,1014,229),(706,1015,229),(707,1016,229),(708,1017,229),(709,1018,229);
/*!40000 ALTER TABLE `class_student` ENABLE KEYS */;
UNLOCK TABLES;

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
  `isSubject` tinyint(4) NOT NULL,
  `shortName` varchar(8) NOT NULL,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `classroom.school_id` (`school_id`),
  CONSTRAINT `classroom?school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (226,1,'1A',0,'1A','2013-08-19 10:59:53'),(227,1,'1B',0,'1B','2013-08-19 10:59:53'),(228,1,'music',1,'music','2013-08-19 10:59:53'),(229,1,'1C',0,'1C','2013-08-19 10:59:53');
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `parents_students`
--

DROP TABLE IF EXISTS `parents_students`;
/*!50001 DROP VIEW IF EXISTS `parents_students`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `parents_students` (
  `student_id` tinyint NOT NULL,
  `user_id` tinyint NOT NULL,
  `student_first` tinyint NOT NULL,
  `student_last` tinyint NOT NULL,
  `grade` tinyint NOT NULL,
  `allergies` tinyint NOT NULL,
  `comments` tinyint NOT NULL,
  `class` tinyint NOT NULL,
  `parent_first` tinyint NOT NULL,
  `parent_last` tinyint NOT NULL,
  `city` tinyint NOT NULL,
  `state` tinyint NOT NULL,
  `addr1` tinyint NOT NULL,
  `addr2` tinyint NOT NULL,
  `zip` tinyint NOT NULL,
  `email` tinyint NOT NULL,
  `phone` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `school` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `addr1` varchar(100) DEFAULT NULL,
  `addr2` varchar(100) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip` varchar(12) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `admin_email` varchar(45) DEFAULT NULL,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'Drummond Montessori Magnet','1980 West Cortland','','IL','Chicago','60647','773 345 4567','marcos@sdfds.com','2013-06-21 10:35:30');
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `staff_absent_today`
--

DROP TABLE IF EXISTS `staff_absent_today`;
/*!50001 DROP VIEW IF EXISTS `staff_absent_today`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `staff_absent_today` (
  `user_id` tinyint NOT NULL,
  `first_name` tinyint NOT NULL,
  `last_name` tinyint NOT NULL,
  `start_date_time` tinyint NOT NULL,
  `end_date_time` tinyint NOT NULL,
  `reason` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

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
  `grade` varchar(45) DEFAULT NULL,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `allergies` varchar(500) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1019 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (936,'Harry','Dexter','1','2013-08-19 10:59:53','',''),(937,'Jane','Richards','1','2013-08-19 10:59:53','Allergic to peanuts',''),(938,'Myra','Carina','1','2013-08-19 10:59:53','',''),(939,'Yin','Li','1','2013-08-19 10:59:53','',''),(940,'Miles','Davis','1','2013-08-19 10:59:53','',''),(941,'Jonah','Thomas','1','2013-08-19 10:59:53','',''),(942,'Amy','Masters','1','2013-08-19 10:59:53','',''),(943,'John','Henry','1','2013-08-19 10:59:53','','Vegetarian'),(944,'Thomas','Adams','1','2013-08-19 10:59:53','',''),(945,'John','Becker','1','2013-08-19 10:59:53','',''),(946,'Mary','Beckham','1','2013-08-19 10:59:53','Milk allergy',''),(947,'Anna','Younus','1','2013-08-19 10:59:53','',''),(948,'Alfred','Carlton','1','2013-08-19 10:59:53','',''),(949,'Jose','Rivera','1','2013-08-19 10:59:53','',''),(950,'Nina','Martin','1','2013-08-19 10:59:53','','Type 2 Diabetes'),(951,'Andy','Smith','1','2013-08-19 10:59:53','',''),(952,'John','Jeffries','1','2013-08-19 10:59:53','',''),(953,'Jane','North','1','2013-08-19 10:59:53','Gluten free diet',''),(954,'Scott','Wells','1','2013-08-19 10:59:53','',''),(955,'Carlton','Willis','1','2013-08-19 10:59:53','','Vegan diet'),(956,'Guy','Addison','1','2013-08-19 10:59:53','',''),(957,'Falkner','Stien','1','2013-08-19 10:59:53','',''),(958,'Larry',' Holmes','1','2013-08-19 10:59:53','',''),(959,'Marcos','Salas','1','2013-08-19 10:59:53','','No juice, only plain milk and water'),(960,'Anna','Dexter','2','2013-08-19 10:59:53','',''),(961,'Gigia','Connelli','2','2013-08-19 10:59:53','',''),(962,'Wilson','Gerard','2','2013-08-19 10:59:53','','Vegetarian'),(963,'David','Anderson','2','2013-08-19 10:59:53','',''),(964,'Landon','Boal-Walther','2','2013-08-19 10:59:53','',''),(965,'Felicia','Davis','2','2013-08-19 10:59:53','',''),(966,'Isabella','Salas','2','2013-08-19 10:59:53','',''),(967,'Anderson','Crawford','2','2013-08-19 10:59:53','',''),(968,'Carlos','Juarez','2','2013-08-19 10:59:53','',''),(969,'Soni','Jamal','2','2013-08-19 10:59:53','',''),(970,'Brett','Cooper','2','2013-08-19 10:59:53','',''),(971,'Paula','Bell','2','2013-08-19 10:59:53','',''),(972,'Colin','North','2','2013-08-19 10:59:53','No nuts',''),(973,'Gertie','Stien','2','2013-08-19 10:59:53','',''),(974,'Richard','Jeffries','2','2013-08-19 10:59:53','',''),(975,'Chelsea','Goldman','2','2013-08-19 10:59:53','',''),(976,'Chelsea ','Goldman','2','2013-08-19 10:59:53','',''),(977,'Tyler','Knudson','2','2013-08-19 10:59:53','',''),(978,'Carla','Willets','2','2013-08-19 10:59:53','',''),(979,'Sergei','Asimov','2','2013-08-19 10:59:53','',''),(980,'Mary','Addison','2','2013-08-19 10:59:53','',''),(981,'Falkner','Davis','2','2013-08-19 10:59:53','',''),(982,'William','Green','2','2013-08-19 10:59:53','',''),(983,'Betty','Pears','2','2013-08-19 10:59:53','',''),(984,'Susan','Ricketts','2','2013-08-19 10:59:53','',''),(985,'Eli ','Artemakis','2','2013-08-19 10:59:53','',''),(986,'Sonni','Goerge','2','2013-08-19 10:59:53','',''),(987,'Manny','Saunders','1','2013-08-19 10:59:53','',''),(988,'Fannie','Foster','1','2013-08-19 10:59:53','',''),(989,'Aman','Salas','3','2013-08-19 10:59:53','','No juice, only plain milk and water'),(990,'Devon','Berkowitz','2','2013-08-19 10:59:53','',''),(991,'Blake','Berkowitz','3','2013-08-19 10:59:53','',''),(992,'Cassidy','Goldman','3','2013-08-19 10:59:53','','No juice, only plain milk and water'),(993,'Ashley','Anderson','3','2013-08-19 10:59:53','',''),(994,'Lukia','Artemakis','3','2013-08-19 10:59:53','',''),(995,'Owen','Boal-Walther','3','2013-08-19 10:59:53','','No juice, only plain milk and water'),(996,'Jose','Carina','3','2013-08-19 10:59:53','',''),(997,'Sandi','Beckham','3','2013-08-19 10:59:53','',''),(998,'Frank',' Holmes','3','2013-08-19 10:59:53','',''),(999,'Joanna','Hunter','3','2013-08-19 10:59:53','',''),(1000,'Pearl','Horowitz','3','2013-08-19 10:59:53','','Slightly hard of hearing on left ear'),(1001,'Jade','Barnes','3','2013-08-19 10:59:53','',''),(1002,'Hannah','Sommers','3','2013-08-19 10:59:53','',''),(1003,'Olaf','Ulner','3','2013-08-19 10:59:53','',''),(1004,'Shaneeta','Harding','3','2013-08-19 10:59:53','',''),(1005,'Oliver','Brady','3','2013-08-19 10:59:53','',''),(1006,'Matthew','Carter','3','2013-08-19 10:59:53','',''),(1007,'Audrey','Campbell','3','2013-08-19 10:59:53','',''),(1008,'Hannah','Porter','3','2013-08-19 10:59:53','',''),(1009,'Brenda','Collins','3','2013-08-19 10:59:53','',''),(1010,'Nancy','Herrera','3','2013-08-19 10:59:53','',''),(1011,'Ursula','Frances','3','2013-08-19 10:59:53','',''),(1012,'Hunter','Lewis','3','2013-08-19 10:59:53','',''),(1013,'Anna','Guerrero','3','2013-08-19 10:59:53','',''),(1014,'Gianni','Leonicio','3','2013-08-19 10:59:53','Allergic to citrus',''),(1015,'Larry','Pauli','3','2013-08-19 10:59:53','',''),(1016,'Sally','Anderson','3','2013-08-19 10:59:53','',''),(1017,'Dean','Paulsen','1','2013-08-19 10:59:53','','Type 1 Diabetic'),(1018,'Billy','Paulsen','3','2013-08-19 10:59:53','','Type 1 Diabetic');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `student_attendance`
--

DROP TABLE IF EXISTS `student_attendance`;
/*!50001 DROP VIEW IF EXISTS `student_attendance`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `student_attendance` (
  `first_name` tinyint NOT NULL,
  `last_name` tinyint NOT NULL,
  `reason` tinyint NOT NULL,
  `start_date_time` tinyint NOT NULL,
  `end_date_time` tinyint NOT NULL,
  `student_id` tinyint NOT NULL,
  `user_id` tinyint NOT NULL,
  `absence_id` tinyint NOT NULL,
  `present` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `students_absent_today`
--

DROP TABLE IF EXISTS `students_absent_today`;
/*!50001 DROP VIEW IF EXISTS `students_absent_today`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `students_absent_today` (
  `first_name` tinyint NOT NULL,
  `last_name` tinyint NOT NULL,
  `reason` tinyint NOT NULL,
  `start_date_time` tinyint NOT NULL,
  `end_date_time` tinyint NOT NULL,
  `student_id` tinyint NOT NULL,
  `absence_id` tinyint NOT NULL,
  `present` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

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
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `hint` varchar(200) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `addr1` varchar(100) DEFAULT NULL,
  `addr2` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(15) DEFAULT NULL,
  `public_profile` tinyint(4) DEFAULT NULL,
  `zip` varchar(15) DEFAULT NULL,
  `cell_phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1604 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1513,'mholden','password','T','2013-08-19 10:59:53','Mary','Holden','city of birth','7734562345','mary@mary.com','','','Chicago','IL',1,'60647','7732343456'),(1514,'pbrice','password','T','2013-08-19 10:59:53','Paul','Brice','city of birth','7734562346','paul@paul.com','234 West Dickens','Upstairs apt','Chicago','IL',1,'60648','7732343457'),(1515,'apaulsen','password','PT','2013-08-19 10:59:53','Amy','Paulsen','fav pet','7734562347','amy@abc.vom','45 Main','','Chicago','IL',1,'60649','7732343458'),(1516,'mcarlos','password','T','2013-08-19 10:59:53','Maria','Carlos','city of birth','7734562348','maria@sd.com','345 East Wellington','','','',1,'',''),(1517,'pdale','password','T','2013-08-19 10:59:53','Paula','Dale','best friend','7734562349','paula@paula.com','111 North Harris','','Chicago','IL',1,'60651','7732343460'),(1518,'ksmith','password','S','2013-08-19 10:59:53','Kim','Smith','city of birth','7734562345','kelli@mary.com','','','Chicago','IL',1,'60647','7732343456'),(1519,'apauli','password','PA','2013-08-19 10:59:53','Anna','Pauli','city of birth','7734562346','anna@paul.com','234 West Dickens','Upstairs apt','Chicago','IL',1,'60648','7732343457'),(1520,'rharding','password','S','2013-08-19 10:59:53','Richard','Harding','fav pet','7734562347','rich@abc.vom','45 Main','','Chicago','IL',1,'60649','7732343458'),(1521,'aherrera','password','S','2013-08-19 10:59:53','Andres','Herrera','city of birth','7734562348','am@sd.com','345 East Wellington','','','',1,'',''),(1522,'cmcintosh','password','A','2013-08-19 10:59:53','Colleen','McIntosh','fav pet','7734562347','coll@abc.vom','45 Main','','Chicago','IL',1,'60649','7732343458'),(1523,'banderson','password','PS','2013-08-19 10:59:53','Bella','Anderson','best friend','7734562349','bell@paula.com','111 North Harris','','Chicago','IL',1,'60651','7732343460'),(1524,'jdexter','password','P','2013-08-19 10:59:54','John','Dexter','city of birth','7734562345','john@me.com','500 East Olson','','Chicago','IL',1,'60647','7732343456'),(1525,'sdexter','password','P','2013-08-19 10:59:54','Susie','Dexter','city of birth','7734562345','sdexter@me.com','500 East Olson','','Chicago','IL',1,'60647','7732343456'),(1526,'rsimons','password','P','2013-08-19 10:59:54','Simon','Richards','city of birth','7734562346','simon@paul.com','234 West Dickens','Upstairs apt','Chicago','IL',1,'60648','7732343457'),(1527,'acarina','password','P','2013-08-19 10:59:54','Anna','Carina','zip','7734562347','ani@dfs.com','','','Chicago','IL',1,'60649','7732343458'),(1528,'ali','password','P','2013-08-19 10:59:54','Anna','Li','zip','7734562348','annali@fds.com','','','Chicago','IL',1,'60650','7732363459'),(1529,'fli','password','P','2013-08-19 10:59:54','Fred','Li','','7734562348','fred@fds.com','','','Chicago','IL',1,'60650','7732343459'),(1530,'fdavis','password','P','2013-08-19 10:59:54','Faith','Davis','','7734562349','faith@erwr.com','','','Chicago','IL',1,'60651','7732343460'),(1531,'tadams','password','P','2013-08-19 10:59:54','Adam','Thomas','pet','','adam@fdg.com','234 North Wells','','Chicago','IL',1,'60652','7732343461'),(1532,'emasters','password','P','2013-08-19 10:59:54','Elias','Masters','','7734562351','elias@acme.com','','','Chicago','IL',1,'60653','7732343462'),(1533,'dhenry','password','P','2013-08-19 10:59:54','David','Henry','best friends','7734562352','davidhenry@sfsd.com','','','Chicago','IL',1,'60654','7732343463'),(1534,'lhenry','password','P','2013-08-19 10:59:54','Lisa','Henry','best friends','7734562352','lisa@sfsd.com','','','Chicago','IL',1,'60654','7732343463'),(1535,'radams','password','P','2013-08-19 10:59:54','Rebecca','Adams','','7734562353','beca@beca.com','','','Chicago','IL',1,'60655','7732343464'),(1536,'jbecker','password','P','2013-08-19 10:59:54','Jonas','Becker','','7734562354','jonas@sdsd.com','','','Chicago','IL',1,'60656','7732343465'),(1537,'cbeckham','password','P','2013-08-19 10:59:54','Carlton','Beckham','usual','7734562355','cc@fsdf.com','232 East Wells','','Chicago','IL',1,'60657','7732343466'),(1538,'jyounas','password','P','2013-08-19 10:59:54','Jacob','Younus','usual','7734562356','jy@dfs.com','','','Chicago','IL',1,'60658','7732343467'),(1539,'mcarlton','password','P','2013-08-19 10:59:54','Mina','Carlton','','','mina@mina.com','','','Chicago','IL',1,'60659','7732343468'),(1540,'nrivera','password','P','2013-08-19 10:59:54','Nathan','Rivera','first car','7734562358','nr@sdfs.com','2323 West Oakton','','Chicago','IL',1,'60660','7732343469'),(1541,'privera','password','P','2013-08-19 10:59:54','Paulina','Rivera','first car','7734562358','ppr@sdfs.com','2323 West Oakton','','Chicago','IL',1,'60660','7732343469'),(1542,'rmartin','password','P','2013-08-19 10:59:54','Rex','Martin','','7734562359','rma@sdfs.com','','','Chicago','IL',1,'60661','7732343470'),(1543,'amartin','password','P','2013-08-19 10:59:54','Alexis','Martin','','7734562359','am@sdfs.com','','','Chicago','IL',1,'60661','7732343470'),(1544,'msmith','password','P','2013-08-19 10:59:54','Martha','Smith','','7734562360','martha@smith.com','','','Chicago','IL',1,'60662','7732343471'),(1545,'rjeffries','password','P','2013-08-19 10:59:54','Robb','Jeffries','birthdate','7734562361','robbe@ere.com','','','Chicago','IL',1,'60663','7732343472'),(1546,'snorth','password','P','2013-08-19 10:59:54','Scott','North','','7734562362','ssv@sdfdsf.com','','','Chicago','IL',1,'60664','7732343473'),(1547,'knorth','password','P','2013-08-19 10:59:54','Kim','North','','7734562362','kmnorth@sdfdsf.com','','','Chicago','IL',1,'60664','7732343473'),(1548,'swells','password','P','2013-08-19 10:59:54','Susan','Wells','pin','7734562363','swells@wells.com','','','Chicago','IL',1,'60665','7732343474'),(1549,'swillis','password','P','2013-08-19 10:59:54','Susanna','Willis','','7734562364','sdfs@paul.com','343 frontage road','','Chicago','IL',1,'60666','7732343475'),(1550,'caddision','password','P','2013-08-19 10:59:54','Carlton','Addison','usual','7734562365','kdfsa@addison.com','','','Chicago','IL',1,'60667','7732343476'),(1551,'kaddision','password','P','2013-08-19 10:59:54','Katrina','Addison','usual','7734562365','ka@addison.com','232 West Hermitage','Suite 121','Chicago','IL',1,'60667','7732343476'),(1552,'cstien','password','P','2013-08-19 10:59:54','Cody','Stien','','7734562366','codys@gk.com','','','Chicago','IL',1,'60668','7732343477'),(1553,'sholmes','password','P','2013-08-19 10:59:54','Sampson',' Holmes','','7734562367','sh@holmes.com','1222 North hardings','','Chicago','IL',1,'60669','7732343478'),(1554,'ssalas','password','P','2013-08-19 10:59:54','Salma','Saad','usual','7734562367','sal@salma.com','122 rounds road','','Chicago','IL',1,'60669','7732343478'),(1555,'jsalas','password','P','2013-08-19 10:59:54','Jorge','Saad','','7734562367','jsalas@sw.com','122 rounds road','','Chicago','IL',1,'60669','7732343478'),(1556,'tconnelli','password','P','2013-08-19 10:59:54','Trudi','Connelli','','7734562346','tconnelli@mac.com','90 South Wilson','','Chicago','IL',1,'60647','7732343456'),(1557,'pgerard','password','P','2013-08-19 10:59:54','Paul','Gerard','','7734562347','wqe@ds.com','','','Chicago','IL',1,'60648','7732343457'),(1558,'aanderson','password','P','2013-08-19 10:59:54','Alan','Anderson','usual','7734562348','adam@sd.com','','','Chicago','IL',1,'60649','7732343458'),(1559,'panderson','password','P','2013-08-19 10:59:54','Pamela','Anderson','','7734562349','sdds@sfsd.com','','','Chicago','IL',1,'60650','7732343459'),(1560,'jboal','password','P','2013-08-19 10:59:54','Jane','Boal','usual','7734562350','jane@jane.com','','','Chicago','IL',1,'60651','7732343460'),(1561,'mwalther','password','P','2013-08-19 10:59:54','Mike','Walther','ssn','7734562351','mike@mike.com','','','Chicago','IL',1,'60652','7732343461'),(1562,'sdavis','password','P','2013-08-19 10:59:54','Susie','Davis','','7734562352','Hjj@.com','899 West Ohio','','Chicago','IL',1,'60653','7732343462'),(1563,'rsalas','password','P','2013-08-19 10:59:54','Rocio','Salas','','7734562353','rsalas@ds.com','','','Chicago','IL',1,'60654','7732343463'),(1564,'fcrawford','password','P','2013-08-19 10:59:54','Fran','Crawford','','7734562354','ac@sd.com','','','Chicago','IL',1,'60655','7732343464'),(1565,'mjuarez','password','P','2013-08-19 10:59:54','Martha','Juarez','ssn','7734562355','cjuarez@ds.com','111 Main Street','Upstairs apt','Chicago','IL',1,'60656','7732343465'),(1566,'sjamal','password','P','2013-08-19 10:59:54','Shazia','Jamal','','7734562356','','','','Chicago','IL',1,'60657','7732343466'),(1567,'acooper','password','P','2013-08-19 10:59:54','Annbelle','Cooper','','7734562357','','','','Chicago','IL',1,'60658','7732343467'),(1568,'ccooper','password','P','2013-08-19 10:59:54','Curtis','Cooper','','7734562358','','','','Chicago','IL',1,'60659','7732343468'),(1569,'jbell','password','P','2013-08-19 10:59:54','Jillian','Bell','','7734562359','','120 North East HWY','','Chicago','IL',1,'60660','7732343469'),(1570,'mbell','password','P','2013-08-19 10:59:54','Michael','Bell','','7734562360','','','','Chicago','IL',1,'60661','7732343470'),(1571,'mlasky','password','P','2013-08-19 10:59:54','Monica','Lasky','','7734562362','','','','Chicago','IL',1,'60664','7732343473'),(1572,'jgoldman','password','P','2013-08-19 10:59:54','Jonathan','Goldman','','7734562363','','1212 North Honore','','Chicago','IL',1,'60665','7732343474'),(1573,'jknudson','password','P','2013-08-19 10:59:54','John ','Knudson','birthdate','7734562364','','','','Chicago','IL',1,'60666','7732343475'),(1574,'nknudson','password','P','2013-08-19 10:59:54','Nancy','Knudson','','7734562365','','','','Chicago','IL',1,'60667','7732343476'),(1575,'wwillets','password','P','2013-08-19 10:59:54','Wilson','Willets','pet','','cwilets@ds.com','234 North Wells','','Chicago','IL',1,'60668','7732343477'),(1576,'vasimov','password','P','2013-08-19 10:59:54','Val','Asimov','','7734562367','','','','Chicago','IL',1,'60669','7732343478'),(1577,'jaddision','password','P','2013-08-19 10:59:54','Jordan','Addison','','7734562368','','','','Chicago','IL',1,'60670','7732343479'),(1578,'laddison','password','P','2013-08-19 10:59:54','Larry','Addison','birthdate','7734562369','','','','Chicago','IL',1,'60671','7732343480'),(1579,'adavis','password','P','2013-08-19 10:59:54','Andrew','Davis','','7734562370','','122 Cooper way','','Chicago','IL',1,'60672','7732343481'),(1580,'ngreen','password','P','2013-08-19 10:59:54','Niles','Green','ssn','','','','','Chicago','IL',1,'60673','7732343482'),(1581,'jpears','password','P','2013-08-19 10:59:54','Jordan','Pears','','7734562372','','','','Chicago','IL',1,'60674','7732343483'),(1582,'epears','password','P','2013-08-19 10:59:54','Ellie','Pears','pet','7734562373','','2324 Husdon Terrace','','Chicago','IL',1,'60675','7732343484'),(1583,'jricketts','password','P','2013-08-19 10:59:54','Jenna','Ricketts','','7734562374','','','','Chicago','IL',1,'60676','7732343485'),(1584,'ncantello','password','P','2013-08-19 10:59:54','Nicole','Cantello','','7734562375','niki@cantello.com','','','Chicago','IL',1,'60677','7732343486'),(1585,'aartemakis','password','P','2013-08-19 10:59:54','Angelo','Artemakis','','7734562376','','','','Chicago','IL',1,'60678','7732343487'),(1586,'dberkowitz','password','P','2013-08-19 10:59:54','Dana','Berkowitz','','7734562368','','334 North Oakley','','Chicago','IL',1,'60670','7732343479'),(1587,'ahunter','password','P','2013-08-19 10:59:54','Annie','Hunter','','7734562368','','','','Chicago','IL',1,'60683','7732343492'),(1588,'alanhunter','password','P','2013-08-19 10:59:54','Alan','Hunter','','7734562369','dfs@ds.com','','','Chicago','IL',1,'60684','7732343493'),(1589,'shorowitz','password','P','2013-08-19 10:59:54','Dean','Horowitz','','7734562370','ds@df.com','77 Jones Street','','Chicago','IL',1,'60685','7732343494'),(1590,'jbarnes','password','P','2013-08-19 10:59:54','Jim','Barnes','','7734562371','','','','Chicago','IL',1,'60686','7732343495'),(1591,'jsommers','password','P','2013-08-19 10:59:54','Justin','Sommers','','7734562372','','1212 North Honore','','Chicago','IL',1,'60687','7732343496'),(1592,'csommers','password','P','2013-08-19 10:59:54','Carla','Sommers','','7734562373','','','','Chicago','IL',1,'60688','7732343497'),(1593,'gulner','password','P','2013-08-19 10:59:54','Goergia','Ulner','','7734562374','','2323 West Oakton','','Chicago','IL',1,'60689','7732343498'),(1594,'sharding','password','P','2013-08-19 10:59:54','Janice','Harding','','7734562375','','','','Chicago','IL',1,'60690','7732343499'),(1595,'mbrady','password','P','2013-08-19 10:59:54','Michael','Brady','','7734562376','','454 South Hudson','','Chicago','IL',1,'60691','7732343500'),(1596,'pcarter','password','P','2013-08-19 10:59:54','Phillip','Carter','','7734562377','','232 East Wells','','Chicago','IL',1,'60692','7732343501'),(1597,'mcarter','password','P','2013-08-19 10:59:54','Marla','Carter','','7734562378','','454 South Hudson','','Chicago','IL',1,'60693','7732343502'),(1598,'jcampbell','password','P','2013-08-19 10:59:54','Joanna','Campbell','','7734562379','','','','Chicago','IL',1,'60694','7732343503'),(1599,'bPorter','password','P','2013-08-19 10:59:54','Bernie','Porter','','7734562380','','','','Chicago','IL',1,'60695','7732343504'),(1600,'jcollins','password','P','2013-08-19 10:59:54','Justin','Collins','','7734562381','','454 South Gerald','','Chicago','IL',1,'60696','7732343505'),(1601,'mcollins','password','P','2013-08-19 10:59:54','Maria','Collins','','7734562382','','','','Chicago','IL',1,'60697','7732343506'),(1602,'jherrera','password','P','2013-08-19 10:59:54','Jamie','Herrera','','7734562383','','120 North East HWY','','Chicago','IL',1,'60698','7732343507'),(1603,'billanderson','password','P','2013-08-19 10:59:54','Bill','Anderson','best friend','7734562349','bell@paula.com','111 North Harris','','Chicago','IL',1,'60651','7732343460');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`),
  KEY `user_class_classroom_id_idx` (`classroom_id`),
  KEY `user_class_user_id_idx` (`user_id`),
  CONSTRAINT `user_class_classroom_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_class_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_class`
--

LOCK TABLES `user_class` WRITE;
/*!40000 ALTER TABLE `user_class` DISABLE KEYS */;
INSERT INTO `user_class` VALUES (125,226,1513),(126,227,1514),(127,228,1515),(128,226,1516),(129,229,1517),(130,227,1515);
/*!40000 ALTER TABLE `user_class` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`),
  KEY `user_student.user_id_idx` (`user_id`),
  KEY `user_student.student_id` (`student_id`),
  CONSTRAINT `user_student?user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_student?student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=553 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_student`
--

LOCK TABLES `user_student` WRITE;
/*!40000 ALTER TABLE `user_student` DISABLE KEYS */;
INSERT INTO `user_student` VALUES (449,936,1524),(450,936,1525),(451,937,1526),(452,938,1527),(453,939,1528),(454,939,1529),(455,940,1530),(456,941,1531),(457,942,1532),(458,943,1533),(459,943,1534),(460,944,1535),(461,945,1536),(462,946,1537),(463,947,1538),(464,948,1539),(465,949,1540),(466,949,1541),(467,950,1542),(468,950,1543),(469,951,1544),(470,952,1545),(471,953,1546),(472,953,1547),(473,954,1548),(474,955,1549),(475,956,1550),(476,956,1551),(477,957,1552),(478,958,1553),(479,959,1554),(480,959,1555),(481,960,1524),(482,960,1525),(483,961,1556),(484,962,1557),(485,963,1558),(486,963,1559),(487,964,1560),(488,964,1561),(489,965,1562),(490,966,1563),(491,967,1564),(492,968,1565),(493,969,1566),(494,970,1567),(495,970,1568),(496,971,1569),(497,971,1570),(498,972,1546),(499,972,1547),(500,973,1552),(501,974,1545),(502,975,1571),(503,976,1572),(504,977,1573),(505,977,1574),(506,978,1575),(507,979,1576),(508,980,1577),(509,980,1578),(510,981,1579),(511,982,1580),(512,983,1581),(513,983,1582),(514,984,1583),(515,985,1584),(516,985,1585),(517,989,1554),(518,989,1555),(519,990,1586),(520,991,1586),(521,992,1571),(522,992,1572),(523,993,1558),(524,993,1559),(525,994,1584),(526,994,1585),(527,995,1560),(528,995,1561),(529,996,1527),(530,997,1537),(531,998,1553),(532,999,1587),(533,999,1588),(534,1000,1589),(535,1001,1590),(536,1002,1591),(537,1002,1592),(538,1003,1593),(539,1004,1594),(540,1005,1595),(541,1006,1596),(542,1006,1597),(543,1007,1598),(544,1008,1599),(545,1009,1600),(546,1009,1601),(547,1010,1602),(548,1015,1519),(549,1016,1523),(550,1016,1603),(551,1017,1515),(552,1018,1515);
/*!40000 ALTER TABLE `user_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `parents_students`
--

/*!50001 DROP TABLE IF EXISTS `parents_students`*/;
/*!50001 DROP VIEW IF EXISTS `parents_students`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`salma`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `parents_students` AS select `t1`.`id` AS `student_id`,`t5`.`id` AS `user_id`,`t1`.`first_name` AS `student_first`,`t1`.`last_name` AS `student_last`,`t1`.`grade` AS `grade`,`t1`.`allergies` AS `allergies`,`t1`.`comments` AS `comments`,`t3`.`name` AS `class`,`t5`.`first_name` AS `parent_first`,`t5`.`last_name` AS `parent_last`,`t5`.`city` AS `city`,`t5`.`state` AS `state`,`t5`.`addr1` AS `addr1`,`t5`.`addr2` AS `addr2`,`t5`.`zip` AS `zip`,`t5`.`email` AS `email`,`t5`.`phone` AS `phone` from ((((`student` `t1` join `class_student` `t2` on((`t1`.`id` = `t2`.`student_id`))) join `classroom` `t3` on((`t3`.`id` = `t2`.`classroom_id`))) join `user_student` `t4` on((`t1`.`id` = `t4`.`student_id`))) join `user` `t5` on((`t4`.`user_id` = `t5`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `staff_absent_today`
--

/*!50001 DROP TABLE IF EXISTS `staff_absent_today`*/;
/*!50001 DROP VIEW IF EXISTS `staff_absent_today`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`salma`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `staff_absent_today` AS select distinct `t1`.`id` AS `user_id`,`t1`.`first_name` AS `first_name`,`t1`.`last_name` AS `last_name`,`t2`.`start_date_time` AS `start_date_time`,`t2`.`end_date_time` AS `end_date_time`,`t2`.`reason` AS `reason` from ((`user` `t1` join `absence` `t2`) join `absence_owner` `t3`) where ((`t2`.`id` = `t3`.`absence_id`) and (`t3`.`user_id` = `t1`.`id`) and ((`t1`.`roles` like '%T%') or (`t1`.`roles` like '%S%') or (`t1`.`roles` like '%A%')) and (curdate() between `t2`.`start_date_time` and `t2`.`end_date_time`)) group by `t3`.`user_id` order by `user_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `student_attendance`
--

/*!50001 DROP TABLE IF EXISTS `student_attendance`*/;
/*!50001 DROP VIEW IF EXISTS `student_attendance`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`salma`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student_attendance` AS select `t1`.`first_name` AS `first_name`,`t1`.`last_name` AS `last_name`,`t3`.`reason` AS `reason`,`t3`.`start_date_time` AS `start_date_time`,`t3`.`end_date_time` AS `end_date_time`,`t1`.`id` AS `student_id`,`t7`.`id` AS `user_id`,`t3`.`id` AS `absence_id`,((`t3`.`start_date_time` <= curdate()) and (`t3`.`end_date_time` >= curdate())) AS `present` from ((((((`student` `t1` left join `absence_owner` `t2` on(((`t1`.`id` = `t2`.`student_id`) and `t2`.`absence_id` in (select `t1`.`absence_id` from (`absence_owner` `t1` join `absence` `t2`) where ((`t1`.`absence_id` = `t2`.`id`) and (`t2`.`start_date_time` <= curdate()) and (`t2`.`end_date_time` >= curdate())))))) left join `absence` `t3` on((`t2`.`absence_id` = `t3`.`id`))) join `class_student` `t4` on((`t1`.`id` = `t4`.`student_id`))) join `classroom` `t5` on((`t4`.`classroom_id` = `t5`.`id`))) join `user_class` `t6` on((`t5`.`id` = `t6`.`classroom_id`))) join `user` `t7` on((`t6`.`user_id` = `t7`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `students_absent_today`
--

/*!50001 DROP TABLE IF EXISTS `students_absent_today`*/;
/*!50001 DROP VIEW IF EXISTS `students_absent_today`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`salma`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `students_absent_today` AS select `t1`.`first_name` AS `first_name`,`t1`.`last_name` AS `last_name`,`t3`.`reason` AS `reason`,`t3`.`start_date_time` AS `start_date_time`,`t3`.`end_date_time` AS `end_date_time`,`t1`.`id` AS `student_id`,`t3`.`id` AS `absence_id`,((`t3`.`start_date_time` <= curdate()) and (`t3`.`end_date_time` >= curdate())) AS `present` from ((((`student` `t1` left join `absence_owner` `t2` on(((`t1`.`id` = `t2`.`student_id`) and `t2`.`absence_id` in (select `t1`.`absence_id` from (`absence_owner` `t1` join `absence` `t2`) where ((`t1`.`absence_id` = `t2`.`id`) and (`t2`.`start_date_time` <= curdate()) and (`t2`.`end_date_time` >= curdate())))))) left join `absence` `t3` on((`t2`.`absence_id` = `t3`.`id`))) join `class_student` `t4` on((`t1`.`id` = `t4`.`student_id`))) join `classroom` `t5` on((`t4`.`classroom_id` = `t5`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-08-20 11:33:13
