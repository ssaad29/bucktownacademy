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
  `tardy_dismissal_time` varchar(60) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `parent_entered` tinyint(4) DEFAULT '0',
  `school_entered` tinyint(4) DEFAULT '0',
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `school_id_absence` (`school_id`),
  CONSTRAINT `school_id_absence` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absence`
--

LOCK TABLES `absence` WRITE;
/*!40000 ALTER TABLE `absence` DISABLE KEYS */;
INSERT INTO `absence` VALUES (158,'2013-11-07 00:00:00','2013-11-07 23:59:59',NULL,NULL,2,NULL,1,0,'2013-11-07 10:20:41','2013-11-07 23:59:59','1736',NULL),(159,'2013-11-07 00:00:00','2013-11-07 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2013-11-07 12:06:39','2013-11-07 23:59:59','1704',NULL),(160,'2013-11-13 00:00:00','2013-11-13 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2013-11-13 09:33:55','2013-11-13 23:59:59','1696',NULL),(161,'2013-11-13 00:00:00','2013-11-13 23:59:59','Teacher reported','2013-11-13T09:34:00',2,NULL,0,1,'2013-11-13 09:34:24','2013-11-13 23:59:59','1696',NULL),(162,'2013-11-13 00:00:00','2013-11-19 00:00:00','Going to Mexico',NULL,1,NULL,1,0,'2013-11-13 09:35:19','2013-11-19 00:00:00',NULL,NULL),(163,'2013-11-13 00:00:00','2013-11-17 00:00:00','Going to a conference',NULL,1,NULL,1,0,'2013-11-13 09:37:08','2013-11-17 00:00:00',NULL,NULL),(164,'2013-11-13 00:00:00','2013-11-13 23:59:59','sick',NULL,1,NULL,1,0,'2013-11-13 09:37:35','2013-11-13 23:59:59','1696',NULL),(165,'2013-11-18 00:00:00','2013-11-18 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2013-11-18 17:20:30','2013-11-18 23:59:59','1696',NULL),(166,'2013-11-18 00:00:00','2013-11-18 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2013-11-18 23:47:53','2013-11-18 23:59:59','1696',NULL),(167,'2013-11-27 00:00:00','2013-11-27 23:59:59','',NULL,1,NULL,1,0,'2013-11-27 15:54:49','2013-11-27 23:59:59','1736',NULL),(168,'2013-12-03 00:00:00','2013-12-03 23:59:59','',NULL,1,NULL,1,0,'2013-12-03 18:57:48','2013-12-03 23:59:59','1736',NULL),(169,'2013-12-05 00:00:00','2013-12-05 23:59:59','',NULL,1,NULL,1,0,'2013-12-05 12:40:52','2013-12-05 23:59:59','1736',NULL),(170,'2013-12-05 00:00:00','2013-12-05 23:59:59',NULL,NULL,2,NULL,1,0,'2013-12-05 12:43:11','2013-12-05 23:59:59','1736',NULL),(171,'2013-12-05 00:00:00','2013-12-05 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2013-12-05 12:44:34','2013-12-05 23:59:59','1696',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absence_owner`
--

LOCK TABLES `absence_owner` WRITE;
/*!40000 ALTER TABLE `absence_owner` DISABLE KEYS */;
INSERT INTO `absence_owner` VALUES (1,1125,NULL,158,'2013-11-07 10:20:41','2013-11-07 23:59:59','1736',NULL),(2,1123,NULL,159,'2013-11-07 12:06:39','2013-11-07 23:59:59','1704',NULL),(3,1148,NULL,160,'2013-11-13 09:33:55','2013-11-13 23:59:59','1696',NULL),(4,1137,NULL,161,'2013-11-13 09:34:24','2013-11-13 23:59:59','1696',NULL),(5,1125,NULL,162,'2013-11-13 09:35:19','2013-11-19 00:00:00',NULL,NULL),(6,1125,NULL,163,'2013-11-13 09:37:08','2013-11-17 00:00:00',NULL,NULL),(7,NULL,1696,164,'2013-11-13 09:37:35','2013-11-13 23:59:59','1696',NULL),(8,1129,NULL,165,'2013-11-18 17:20:30','2013-11-18 23:59:59','1696',NULL),(9,1137,NULL,166,'2013-11-18 23:47:53','2013-11-18 23:59:59','1696',NULL),(10,1125,NULL,167,'2013-11-27 15:54:49','2013-11-27 23:59:59','1736',NULL),(11,1125,NULL,168,'2013-12-03 18:57:48','2013-12-03 23:59:59','1736',NULL),(12,1125,NULL,169,'2013-12-05 12:40:52','2013-12-05 23:59:59','1736',NULL),(13,1125,NULL,170,'2013-12-05 12:43:11','2013-12-05 23:59:59','1736',NULL),(14,1140,NULL,171,'2013-12-05 12:44:34','2013-12-05 23:59:59','1696',NULL);
/*!40000 ALTER TABLE `absence_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `birthdays`
--

DROP TABLE IF EXISTS `birthdays`;
/*!50001 DROP VIEW IF EXISTS `birthdays`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `birthdays` (
  `first_name` tinyint NOT NULL,
  `last_name` tinyint NOT NULL,
  `id` tinyint NOT NULL,
  `type` tinyint NOT NULL,
  `birthdate` tinyint NOT NULL,
  `school_id` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

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
  CONSTRAINT `bulletins?school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bulletins`
--

LOCK TABLES `bulletins` WRITE;
/*!40000 ALTER TABLE `bulletins` DISABLE KEYS */;
INSERT INTO `bulletins` VALUES (1,'Congratulations Nolan Freidman','Congratulations Nolan on winning the state spelling bee',1,NULL,2,NULL,NULL,'2013-11-06 22:57:29','workbench',NULL),(2,'No afterschool 12/12/2013','Afterschool is cancelled due to a religous holiday',0,NULL,2,NULL,NULL,'2013-11-06 22:57:29','workbench',NULL),(3,'Please don\'t double park','Please avoid double parking. The police are issuing tickets',0,NULL,2,NULL,NULL,'2013-11-06 22:57:29','workbench',NULL),(4,'Pasta Palooza volunteers needed','We need some volunteers to clean up after the event. Contact Cindy Krahn to sign up',0,NULL,2,NULL,NULL,'2013-11-06 22:57:29','workbench',NULL),(5,'No school Thursday 12/07/2013','No school due to professional development day',0,NULL,2,NULL,NULL,'2013-11-06 22:57:29','workbench',NULL),(6,'Goodbye Mr Richmond','Friday is Dennis Richmonds last day at Demo School. We wish him the best in his new endavours',0,NULL,2,NULL,NULL,'2013-11-06 22:57:29','workbench',NULL),(7,'Mighty Acorns field trip 12/14/2013','Class 101 has a field trip tomorrow. Please send a bag lunch and have your child wear snowpants and boots',1,NULL,2,NULL,NULL,'2013-11-06 22:57:29','workbench',NULL),(8,'Please turn in your scholastic orders','Class 101 parents please send your orders in by Monday at the latest',1,NULL,2,NULL,NULL,'2013-11-06 22:57:29','workbench',NULL);
/*!40000 ALTER TABLE `bulletins` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `class_bulletins?bulletin_id` FOREIGN KEY (`bulletin_id`) REFERENCES `bulletins` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `class_bulletins?class_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_bulletins`
--

LOCK TABLES `class_bulletins` WRITE;
/*!40000 ALTER TABLE `class_bulletins` DISABLE KEYS */;
INSERT INTO `class_bulletins` VALUES (1,1,320,'2013-12-16 11:18:09','2013-12-16 11:18:09','loader',NULL),(2,2,320,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(3,8,320,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(4,3,320,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(5,4,321,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(6,1,321,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(7,5,321,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(8,6,322,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(9,3,322,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(10,7,322,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(11,8,323,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(12,1,323,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(13,5,323,'2013-12-16 11:18:10','2013-12-16 11:18:10','loader',NULL),(14,7,320,'2013-12-16 12:14:14','2013-12-16 12:14:14','loader',NULL),(15,8,321,'2013-12-16 12:14:14','2013-12-16 12:14:14','loader',NULL),(16,8,322,'2013-12-16 12:14:14','2013-12-16 12:14:14','loader',NULL);
/*!40000 ALTER TABLE `class_bulletins` ENABLE KEYS */;
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
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `class_id_idx` (`classroom_id`),
  KEY `class_student.student_id_idx` (`student_id`),
  CONSTRAINT `class_student?class_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `class_student?student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=935 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_student`
--

LOCK TABLES `class_student` WRITE;
/*!40000 ALTER TABLE `class_student` DISABLE KEYS */;
INSERT INTO `class_student` VALUES (821,1102,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(822,1103,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(823,1104,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(824,1105,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(825,1106,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(826,1107,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(827,1108,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(828,1109,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(829,1110,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(830,1111,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(831,1112,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(833,1114,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(834,1115,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(835,1116,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(836,1117,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(837,1118,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(838,1119,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(839,1120,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(841,1122,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(842,1123,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(843,1124,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(845,1126,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(846,1127,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(847,1128,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(848,1129,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(849,1130,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(850,1131,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(851,1132,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(852,1133,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(853,1134,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(854,1135,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(855,1136,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(856,1137,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(857,1138,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(858,1139,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(859,1140,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(860,1141,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(861,1142,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(862,1143,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(863,1144,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(864,1145,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(865,1146,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(866,1147,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(867,1148,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(868,1149,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(869,1150,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(870,1151,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(871,1152,321,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(872,1153,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(873,1154,320,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(874,1155,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(875,1156,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(876,1157,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(877,1158,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(878,1159,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(879,1160,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(881,1162,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(882,1163,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(883,1164,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(884,1165,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(885,1166,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(886,1167,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(887,1168,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(888,1169,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(889,1170,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(890,1171,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(891,1172,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(892,1173,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(893,1174,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(894,1175,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(895,1176,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(896,1177,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(897,1178,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(898,1179,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(899,1180,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(900,1181,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(901,1182,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(902,1183,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(903,1184,323,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(904,1123,321,'2013-12-03 15:19:52','2013-12-03 15:19:52','1704',NULL),(905,1121,323,'2013-12-04 16:04:59','2013-12-04 16:04:59','1704',NULL),(906,1161,320,'2013-12-04 17:02:22','2013-12-04 17:02:22','1704',NULL),(934,1125,320,'2013-12-09 20:32:04','2013-12-09 20:32:04','loader',NULL);
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
  `is_subject` tinyint(4) DEFAULT '1',
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `classroom.school_id` (`school_id`),
  CONSTRAINT `classroom?school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (320,2,'1A',0,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(321,2,'1B',0,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(322,2,'music',1,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(323,2,'1C',0,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL);
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (12,'prek1',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(13,'prek2',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(14,'K',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(15,'first',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(16,'second',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(17,'third',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(18,'fourth',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(19,'fifth',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(20,'sixth',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(21,'seventh',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(22,'eighth',2,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL);
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
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
  `GRADE` tinyint NOT NULL,
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
  `phone` tinyint NOT NULL,
  `public_profile` tinyint NOT NULL,
  `cell_phone` tinyint NOT NULL,
  `school_id` tinyint NOT NULL
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (2,'district 456','Demo School','1980 West Cortland','','IL','Chicago','60647','000 000 0000','admin@demo.com.com',NULL,'2013-11-06 22:57:25','loader',NULL);
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsorship`
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
  CONSTRAINT `sponsorship?school_id` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsorship`
--

LOCK TABLES `sponsorship` WRITE;
/*!40000 ALTER TABLE `sponsorship` DISABLE KEYS */;
/*!40000 ALTER TABLE `sponsorship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsorship_school`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsorship_school`
--

LOCK TABLES `sponsorship_school` WRITE;
/*!40000 ALTER TABLE `sponsorship_school` DISABLE KEYS */;
/*!40000 ALTER TABLE `sponsorship_school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `staff_absent_today`
--

DROP TABLE IF EXISTS `staff_absent_today`;
/*!50001 DROP VIEW IF EXISTS `staff_absent_today`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `staff_absent_today` (
  `first_name` tinyint NOT NULL,
  `user_id` tinyint NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=1185 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1102,'Harry','Dexter',15,'','','2002-10-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1103,'Jane','Richards',15,'Allergic to peanuts','','2004-02-22','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1104,'Myra','Carina',15,'','','2003-02-11','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1105,'Yin','Li',15,'','','2007-06-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1106,'Bart','Davis',15,'','','2002-11-01','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1107,'Jonah','Thomas',15,'','','2003-11-12','2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1704'),(1108,'Amy','Masters',15,'','','2002-09-22','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1109,'John','Henry',15,'','Vegetarian','2009-08-11','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1110,'Thomas','Adams',15,'','','2002-07-01','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1111,'John','Becker',15,'','','2005-06-22','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1112,'Mary','Beckham',15,'Milk allergy','','2006-05-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1113,'Anna','Younus',16,'','','2002-04-11','2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1704'),(1114,'Alfred','Carlton',15,'','','2006-05-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1115,'Jose','Rivera',15,'','','2005-06-22','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1116,'Belinda','Martin',15,'','Type 2 Diabetes','2007-07-01','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1117,'Andy','Smith',15,'','','2002-08-08','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1118,'John','Jeffries',15,'','','2002-09-08','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1119,'Jane','North',15,'Gluten free diet','','2007-10-22','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1120,'Scott','Wells',15,'','',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1704'),(1121,'Carlton','Willis',16,'','Vegan diet','2002-12-22','2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1704'),(1122,'Guy','Addison',15,'','','2006-11-08','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1123,'Falkner','Stien',15,'','','2007-12-07','2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1704'),(1124,'Larry',' Holmes',15,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1125,'Marco','Gladwell',12,'Eggs','No juice, just plain milk and water','1981-01-03','2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1704'),(1126,'Anna','Dexter',16,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1127,'Gigia','Connelli',16,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1128,'Wilson','Gerard',16,'','Vegetarian','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1129,'David','Anderson',16,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1130,'Landon','Emerson',16,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1131,'Felicia','Davis',16,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1132,'Isabella','Oltman',16,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1133,'Anderson','Crawford',16,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1134,'Carlos','Juarez',16,'','','2002-11-22','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1135,'Soni','Jamal',16,'','','2002-11-19','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1136,'Brett','Cooper',16,'','','2002-09-07','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1137,'Paula','Bell',16,'','','2009-08-04','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1138,'Colin','North',16,'No nuts','','2002-07-15','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1139,'Gertie','Stien',16,'','','2005-06-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1140,'Richard','Jeffries',16,'','','2002-05-07','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1141,'Chelsea','Charnelie',16,'','','2002-04-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1142,'Chelsea ','Charnelie',16,'','','2002-03-11','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1143,'Thomas','Knudson',16,'','','2002-12-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1144,'Carla','Willets',16,'','','2002-01-15','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1145,'Sergei','Asimov',16,'','','2002-01-07','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1146,'Mary','Addison',16,'','','2009-02-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1147,'Falkner','Davis',16,'','','2005-03-04','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1148,'William','Green',16,'','','2004-04-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1149,'Betty','Pears',16,'','','2002-05-03','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1150,'Susan','Ricketts',16,'','','2002-06-11','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1151,'Eli ','Fisher',16,'','','2005-07-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1152,'Sonni','Goerge',16,'','','2004-08-17','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1153,'Manny','Saunders',15,'','','2002-11-19','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1154,'Fannie','Foster',15,'','','2002-10-15','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1155,'Sally','Gladwell',17,'','No juice, only plain milk and water','2007-12-12','2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1736'),(1156,'Devon','Anders',17,'','','2004-12-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1157,'William','Anders',17,'','','2002-01-15','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1158,'Sarah','Cernelie',17,'','No juice, only plain milk and water','2002-02-03','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1159,'Brooke','Anderson',17,'','','2002-03-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1160,'Lucy','Fisher',17,'','','2004-03-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1161,'Owen','Emerson',16,'','No juice, only plain milk and water','2002-11-30','2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1704'),(1162,'Jose','Carina',17,'','','2007-05-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1163,'Sandi','Beckham',17,'','','2004-06-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1164,'Frank',' Holmes',17,'','','2002-07-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1165,'Joanna','Hunter',17,'','','2007-08-03','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1166,'Pearl','Horowitz',17,'','Slightly hard of hearing on left ear','2002-09-17','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1167,'Jade','Barnes',17,'','','2002-10-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1168,'Hannah','Sommers',17,'','','2002-11-12','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1169,'Olaf','Ulner',17,'','','2004-12-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1170,'Shaneeta','Harding',17,'','','2002-05-04','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1171,'Oliver','Brady',17,'','','2005-07-15','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1172,'Matthew','Carter',17,'','','2002-06-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1173,'Audrey','Campbell',17,'','','2002-05-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1174,'Hannah','Porter',17,'','','2006-02-02','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1175,'Brenda','Collins',17,'','','2002-02-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1176,'Nancy','Herrera',17,'','','2004-10-12','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1177,'Ursula','Frances',17,'','','2004-09-15','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1178,'Hunter','Lewis',17,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1179,'Anna','Guerrero',17,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1180,'Gianni','Leonicio',17,'Allergic to citrus','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1181,'Larry','Pauli',17,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1182,'Sally','Anderson',17,'','','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1183,'Dean','Paulsen',15,'','Type 1 Diabetic','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1184,'Billy','Paulsen',17,'','Type 1 Diabetic','2013-12-18','2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL);
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
  `parent_entered` tinyint NOT NULL,
  `type` tinyint NOT NULL,
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
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `addr1` varchar(100) DEFAULT NULL,
  `addr2` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(15) DEFAULT NULL,
  `public_profile` tinyint(4) DEFAULT '1',
  `zip` varchar(15) DEFAULT NULL,
  `cell_phone` varchar(45) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `school_id` int(11) DEFAULT NULL,
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `school_id_user_table` (`school_id`),
  CONSTRAINT `school_id_user_table` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1787 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1695,'mholden','password','T','Mary','Holden','(000) 000-0000','test300@schoolishness.com','','','Chicago','IL',1,'60647','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(1696,'demoteacher','password','T','Paul','Brice','7732312348','test301@schoolishness.com','2342 West Dickens St','Upstairs apt #2','Chicago','IL',0,'60647','(121) 111-1234','1988-07-10',NULL,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader','1696'),(1697,'apaulsen','password','PT','Amy','Paulsen','(000) 000-0003','test302@schoolishness.com','45 Main','','Chicago','IL',0,'60649','(000) 0000002','1986-12-18',NULL,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader','1697'),(1698,'mcarlos','password','T','Maria','Carlos','(000) 000-0000','test303@schoolishness.com','345 East Wellington','','','',1,'','(000) 0000003','1973-11-05',NULL,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(1699,'pdale','password','T','Paula','Dale','(000) 000-0000','test304@schoolishness.com','111 North Harris','','Chicago','IL',1,'60651','(000) 0000004','1981-02-11',NULL,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(1700,'ksmith','password','S','Kim','Smith','(000) 000-0000','testing200@schoolishness.com','','','Chicago','IL',1,'60647','(000) 000-0000','1978-08-09',2,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1701,'apauli','password','APR','Anna','Pauli','(000) 000-0000','testing201@schoolishness.com','234 West Dickens','Upstairs apt','Chicago','IL',1,'60648','(000) 0000001','1988-07-10',2,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1696'),(1702,'rharding','password','S','Richard','Harding','(000) 000-0000','testing202@schoolishness.com','45 Main','','Chicago','IL',1,'60649','(000) 0000002','1986-12-18',2,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1703,'aherrera','password','S','Andres','Herrera','(000) 000-0000','testing203@schoolishness.com','345 East Wellington','','','',1,'','(000) 0000003','1973-11-05',2,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1704,'demoadmin','password','A','Colleen','Kaufman','(000) 000-0000','testing204@schoolishness.com','45 Main','','Chicago','IL',1,'60649','(000) 0000004','1981-02-11',2,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1705,'banderson','password','ASTPR','Bella','Anderson','(000) 000-0000','testing205@schoolishness.com','111 North Harris','','Chicago','IL',1,'60651','(000) 0000005','1972-01-14',2,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1696'),(1706,'jdexter','password','P','John','Dexter','(000) 000-0000','test1@schoolishness.com','500 East Olson','','Chicago','IL',1,'60647','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1696'),(1707,'sdexter','password','PR','Susie','Dexter','(000) 000-0000','test2@schoolishness.com','500 East Olson','','Chicago','IL',1,'60647','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader','1696'),(1708,'rsimons','password','P','Simon','Richards','(000) 000-0000','test3@schoolishness.com','234 West Dickens','Upstairs apt','Chicago','IL',1,'60648','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1709,'acarina','password','P','Anna','Carina','(000) 000-0000','test4@schoolishness.com','','','Chicago','IL',1,'60649','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1710,'ali','password','P','Anna','Li','(000) 000-0000','test5@schoolishness.com','','','Chicago','IL',1,'60650','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1711,'fli','password','P','Fred','Li','(000) 000-0000','test6@schoolishness.com','','','Chicago','IL',1,'60650','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1712,'fdavis','password','P','Faith','Davis','(000) 000-0000','test7@schoolishness.com','','','Chicago','IL',1,'60651','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1713,'tadams','password','P','Adam','Thomas','(000) 000-0000','test8@schoolishness.com','234 North Wells','','Chicago','IL',1,'60652','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1714,'emasters','password','P','Elias','Masters','(000) 000-0000','test9@schoolishness.com','','','Chicago','IL',1,'60653','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1715,'dhenry','password','P','David','Henry','(000) 000-0000','test10@schoolishness.com','','','Chicago','IL',1,'60654','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1716,'lhenry','password','P','Lisa','Henry','(000) 000-0000','test11@schoolishness.com','','','Chicago','IL',1,'60654','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1717,'radams','password','P','Rebecca','Adams','(000) 000-0000','test12@schoolishness.com','','','Chicago','IL',1,'60655','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1718,'jbecker','password','P','Jonas','Becker','(000) 000-0000','test13@schoolishness.com','','','Chicago','IL',1,'60656','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1719,'cbeckham','password','P','Carlton','Beckham','(000) 000-0000','test14@schoolishness.com','232 East Wells','','Chicago','IL',1,'60657','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1720,'jyounas','password','P','Jacob','Younus','(000) 000-0000','test15@schoolishness.com','','','Chicago','IL',1,'60658','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1721,'mcarlton','password','P','Mina','Carlton','(000) 000-0000','test16@schoolishness.com','','','Chicago','IL',1,'60659','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1722,'nrivera','password','P','Nathan','Rivera','(000) 000-0000','test17@schoolishness.com','2323 West Oakton','','Chicago','IL',1,'60660','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1723,'privera','password','P','Paulina','Rivera','(000) 000-0000','test18@schoolishness.com','2323 West Oakton','','Chicago','IL',1,'60660','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1724,'rmartin','password','P','Rex','Martin','(000) 000-0000','test19@schoolishness.com','','','Chicago','IL',1,'60661','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1725,'amartin','password','P','Alexis','Martin','(000) 000-0000','test20@schoolishness.com','','','Chicago','IL',1,'60661','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1726,'msmith','password','P','Martha','Smith','(000) 000-0000','test21@schoolishness.com','','','Chicago','IL',1,'60662','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1727,'rjeffries','password','P','Robb','Jeffries','(000) 000-0000','test22@schoolishness.com','','','Chicago','IL',1,'60663','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1728,'snorth','password','P','Scott','North','(000) 000-0000','test23@schoolishness.com','','','Chicago','IL',1,'60664','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1729,'knorth','password','P','Kim','North','(000) 000-0000','test24@schoolishness.com','','','Chicago','IL',1,'60664','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1730,'swells','password','P','Susan','Wells','(000) 000-0000','test25@schoolishness.com','','','Chicago','IL',1,'60665','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1731,'swillis','password','P','Susanna','Willis','(000) 000-0000','test26@schoolishness.com','343 frontage road','','Chicago','IL',1,'60666','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1732,'caddision','password','P','Carlton','Addison','(000) 000-0000','test27@schoolishness.com','','','Chicago','IL',1,'60667','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1733,'kaddision','password','P','Katrina','Addison','(000) 000-0000','test28@schoolishness.com','232 West Hermitage','Suite 121','Chicago','IL',1,'60667','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1734,'cstien','password','P','Cody','Stien','(000) 000-0000','test29@schoolishness.com','','','Chicago','IL',1,'60668','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1735,'sholmes','password','P','Sampson',' Holmes','(000) 000-0000','test30@schoolishness.com','1222 North hardings','','Chicago','IL',1,'60669','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1736,'demoparent','password','P','Paula','Gladwell','(000) 000-0000','test31@schoolishness.com','122 rounds road','','Chicago','IL',1,'60669','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1737,'jgladwell','password','P','James','Gladwell','(000) 000-0000','test32@schoolishness.com','122 rounds road','','Chicago','IL',1,'60669','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1738,'tconnelli','password','P','Trudi','Connelli','(000) 000-0000','test35@schoolishness.com','90 South Wilson','','Chicago','IL',1,'60647','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1739,'pgerard','password','P','Paul','Gerard','(000) 000-0000','test36@schoolishness.com','','','Chicago','IL',1,'60648','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1740,'aanderson','password','P','Andy','Anderson','(000) 000-0000','test37@schoolishness.com','','','Chicago','IL',1,'60649','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1741,'panderson','password','P','Paula','Anderson','(000) 000-0000','test38@schoolishness.com','','','Chicago','IL',1,'60650','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1742,'jemerson','password','P','Jane','Emerson','(000) 000-0000','test39@schoolishness.com','','','Chicago','IL',1,'60651','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1743,'memerson','password','P','Mike','Emerson','(000) 000-0000','test40@schoolishness.com','','','Chicago','IL',1,'60652','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1744,'sdavis','password','P','Susie','Davis','(000) 000-0000','test41@schoolishness.com','899 West Ohio','','Chicago','IL',1,'60653','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1745,'goltman','password','P','Goerge','Oltman','(000) 000-0000','test42@schoolishness.com','','','Chicago','IL',1,'60654','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1746,'fcrawford','password','P','Fran','Crawford','(000) 000-0000','test43@schoolishness.com','','','Chicago','IL',1,'60655','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1747,'mjuarez','password','P','Martha','Juarez','(000) 000-0000','test44@schoolishness.com','111 Main Street','Upstairs apt','Chicago','IL',1,'60656','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1748,'sjamal','password','P','Shazia','Jamal','(000) 000-0000','test45@schoolishness.com','','','Chicago','IL',1,'60657','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1749,'acooper','password','P','Annbelle','Cooper','(000) 000-0000','test46@schoolishness.com','','','Chicago','IL',1,'60658','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1750,'ccooper','password','P','Curtis','Cooper','(000) 000-0000','test47@schoolishness.com','','','Chicago','IL',1,'60659','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1751,'jbell','password','P','Jillian','Bell','(000) 000-0000','test48@schoolishness.com','120 North East HWY','','Chicago','IL',1,'60660','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1752,'mbell','password','P','Michael','Bell','(000) 000-0000','test49@schoolishness.com','','','Chicago','IL',1,'60661','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1753,'ccernelie','password','P','Monica','Charnelie','(000) 000-0000','test54@schoolishness.com','','','Chicago','IL',1,'60664','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1754,'bcernelie','password','P','Bernie','Charnelie','(000) 000-0000','test55@schoolishness.com','1212 North Honore','','Chicago','IL',1,'60665','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1755,'jknudson','password','P','John ','Knudson','(000) 000-0000','test56@schoolishness.com','','','Chicago','IL',1,'60666','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1756,'nknudson','password','P','Nancy','Knudson','(000) 000-0000','test57@schoolishness.com','','','Chicago','IL',1,'60667','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1757,'wwillets','password','P','Wilson','Willets','(000) 000-0000','test58@schoolishness.com','234 North Wells','','Chicago','IL',1,'60668','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1758,'vasimov','password','P','Val','Asimov','(000) 000-0000','test59@schoolishness.com','','','Chicago','IL',1,'60669','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1759,'jaddision','password','P','Jordan','Addison','(000) 000-0000','test60@schoolishness.com','','','Chicago','IL',1,'60670','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1760,'laddison','password','P','Larry','Addison','(000) 000-0000','test61@schoolishness.com','','','Chicago','IL',1,'60671','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1761,'adavis','password','P','Andrew','Davis','(000) 000-0000','test62@schoolishness.com','122 Cooper way','','Chicago','IL',1,'60672','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1762,'ngreen','password','P','Niles','Green','(000) 000-0000','test63@schoolishness.com','','','Chicago','IL',1,'60673','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1763,'jpears','password','P','Jordan','Pears','(000) 000-0000','test64@schoolishness.com','','','Chicago','IL',1,'60674','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1764,'epears','password','P','Ellie','Pears','(000) 000-0000','test65@schoolishness.com','2324 Husdon Terrace','','Chicago','IL',1,'60675','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1765,'jricketts','password','P','Jenna','Ricketts','(000) 000-0000','test66@schoolishness.com','','','Chicago','IL',1,'60676','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1766,'nfisher','password','RP','Nicole','Fisher','(000) 000-0000','test67@schoolishness.com','','','Chicago','IL',1,'60677','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1767,'mfisher','password','P','Mark','Fisher','(000) 000-0000','test68@schoolishness.com','','','Chicago','IL',1,'60678','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1768,'danders','password','P','Diana','Anders','(000) 000-0000','test74@schoolishness.com','334 North Oakley','','Chicago','IL',1,'60670','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1769,'ahunter','password','P','Annie','Hunter','(000) 000-0000','test87@schoolishness.com','','','Chicago','IL',1,'60683','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1770,'alanhunter','password','P','Alan','Hunter','(000) 000-0000','test88@schoolishness.com','','','Chicago','IL',1,'60684','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1771,'shorowitz','password','P','Dean','Horowitz','(000) 000-0000','test89@schoolishness.com','77 Jones Street','','Chicago','IL',1,'60685','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1772,'jbarnes','password','P','Jim','Barnes','(000) 000-0000','test90@schoolishness.com','','','Chicago','IL',1,'60686','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1773,'jsommers','password','P','Justin','Sommers','(000) 000-0000','test91@schoolishness.com','1212 North Honore','','Chicago','IL',1,'60687','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1774,'csommers','password','P','Carla','Sommers','(000) 000-0000','test92@schoolishness.com','','','Chicago','IL',1,'60688','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1775,'gulner','password','P','Goergia','Ulner','(000) 000-0000','test93@schoolishness.com','2323 West Oakton','','Chicago','IL',1,'60689','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1776,'sharding','password','P','Janice','Harding','(000) 000-0000','test94@schoolishness.com','','','Chicago','IL',1,'60690','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1777,'mbrady','password','P','Michael','Brady','(000) 000-0000','test95@schoolishness.com','454 South Hudson','','Chicago','IL',1,'60691','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1778,'pcarter','password','P','Phillip','Carter','(000) 000-0000','test96@schoolishness.com','232 East Wells','','Chicago','IL',1,'60692','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1779,'mcarter','password','P','Marla','Carter','(000) 000-0000','test97@schoolishness.com','454 South Hudson','','Chicago','IL',1,'60693','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1780,'jcampbell','password','P','Joanna','Campbell','(000) 000-0000','test98@schoolishness.com','','','Chicago','IL',1,'60694','(000) 000-0000','1988-07-10',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1781,'bPorter','password','P','Bernie','Porter','(000) 000-0000','test99@schoolishness.com','','','Chicago','IL',1,'60695','(000) 000-0000','1986-12-18',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1782,'jcollins','password','P','Justin','Collins','(000) 000-0000','test100@schoolishness.com','454 South Gerald','','Chicago','IL',1,'60696','(000) 000-0000','1973-11-05',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1783,'mcollins','password','P','Maria','Collins','(000) 000-0000','test101@schoolishness.com','','','Chicago','IL',1,'60697','(000) 000-0000','1981-02-11',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1784,'jherrera','password','P','Jamie','Herrera','(000) 000-0000','test102@schoolishness.com','120 North East HWY','','Chicago','IL',1,'60698','(000) 000-0000','1972-01-14',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1785,'billanderson','password','P','Bill','Anderson','(000) 000-0000','test109@schoolishness.com','111 North Harris','','Chicago','IL',1,'60651','(000) 000-0000','1978-08-09',NULL,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(1786,'ssaad29@hotmail.com','secret','P','Salma','Saad','','ssaad29@hotmail.com','','','','AK',0,'','',NULL,NULL,'2013-12-15 13:55:12','2013-12-15 13:55:12','',NULL);
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
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_class_classroom_id` (`classroom_id`),
  KEY `user_class_user_id` (`user_id`),
  CONSTRAINT `user_class_classroom_id` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_class_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_class`
--

LOCK TABLES `user_class` WRITE;
/*!40000 ALTER TABLE `user_class` DISABLE KEYS */;
INSERT INTO `user_class` VALUES (137,320,1695,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(138,321,1696,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(139,322,1697,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(140,320,1698,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(141,323,1699,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(142,321,1697,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL);
/*!40000 ALTER TABLE `user_class` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=735 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_school`
--

LOCK TABLES `user_school` WRITE;
/*!40000 ALTER TABLE `user_school` DISABLE KEYS */;
INSERT INTO `user_school` VALUES (644,2,1695,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(645,2,1696,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(646,2,1697,'2013-11-06 23:16:14','2013-11-06 23:16:14','loader',NULL),(647,2,1698,'2013-11-06 23:16:15','2013-11-06 23:16:14','loader',NULL),(648,2,1699,'2013-11-06 23:16:15','2013-11-06 23:16:14','loader',NULL),(649,2,1700,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(650,2,1701,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(651,2,1702,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(652,2,1703,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(653,2,1704,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(654,2,1705,'2013-11-06 23:16:15','2013-11-06 23:16:15','loader',NULL),(655,2,1706,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(656,2,1707,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(657,2,1708,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(658,2,1709,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(659,2,1710,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(660,2,1711,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(661,2,1712,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(662,2,1713,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(663,2,1714,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(664,2,1715,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(665,2,1716,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(666,2,1717,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(667,2,1718,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(668,2,1719,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(669,2,1720,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(670,2,1721,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(671,2,1722,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(672,2,1723,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(673,2,1724,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(674,2,1725,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(675,2,1726,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(676,2,1727,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(677,2,1728,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(678,2,1729,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(679,2,1730,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(680,2,1731,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(681,2,1732,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(682,2,1733,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(683,2,1734,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(684,2,1735,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(685,2,1736,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(686,2,1737,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(687,2,1738,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(688,2,1739,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(689,2,1740,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(690,2,1741,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(691,2,1742,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(692,2,1743,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(693,2,1744,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(694,2,1745,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(695,2,1746,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(696,2,1747,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(697,2,1748,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(698,2,1749,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(699,2,1750,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(700,2,1751,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(701,2,1752,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(702,2,1753,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(703,2,1754,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(704,2,1755,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(705,2,1756,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(706,2,1757,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(707,2,1758,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(708,2,1759,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(709,2,1760,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(710,2,1761,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(711,2,1762,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(712,2,1763,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(713,2,1764,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(714,2,1765,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(715,2,1766,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(716,2,1767,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(717,2,1768,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(718,2,1769,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(719,2,1770,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(720,2,1771,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(721,2,1772,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(722,2,1773,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(723,2,1774,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(724,2,1775,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(725,2,1776,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(726,2,1777,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(727,2,1778,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(728,2,1779,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(729,2,1780,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(730,2,1781,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(731,2,1782,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(732,2,1783,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(733,2,1784,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(734,2,1785,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL);
/*!40000 ALTER TABLE `user_school` ENABLE KEYS */;
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
  `last_update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(60) DEFAULT NULL,
  `last_updated_by` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_student.user_id_idx` (`user_id`),
  KEY `user_student.student_id` (`student_id`),
  CONSTRAINT `user_student?student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_student?user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=763 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_student`
--

LOCK TABLES `user_student` WRITE;
/*!40000 ALTER TABLE `user_student` DISABLE KEYS */;
INSERT INTO `user_student` VALUES (657,1102,1706,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(658,1102,1707,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(659,1103,1708,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(660,1104,1709,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(661,1105,1710,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(662,1105,1711,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(663,1106,1712,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(664,1107,1713,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(665,1108,1714,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(666,1109,1715,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(667,1109,1716,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(668,1110,1717,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(669,1111,1718,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(670,1112,1719,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(672,1114,1721,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(673,1115,1722,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(674,1115,1723,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(675,1116,1724,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(676,1116,1725,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(677,1117,1726,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(678,1118,1727,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(679,1119,1728,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(680,1119,1729,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(681,1120,1730,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(682,1121,1731,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(683,1122,1732,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(684,1122,1733,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(685,1123,1734,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(686,1124,1735,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(687,1125,1736,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(688,1125,1737,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(689,1126,1706,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(690,1126,1707,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(691,1127,1738,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(692,1128,1739,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(693,1129,1740,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(694,1129,1741,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(695,1130,1742,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(696,1130,1743,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(697,1131,1744,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(698,1132,1745,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(699,1133,1746,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(700,1134,1747,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(701,1135,1748,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(702,1136,1749,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(703,1136,1750,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(704,1137,1751,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(705,1137,1752,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(706,1138,1728,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(707,1138,1729,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(708,1139,1734,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(709,1140,1727,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(710,1141,1753,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(711,1142,1754,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(712,1143,1755,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(713,1143,1756,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(714,1144,1757,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(715,1145,1758,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(716,1146,1759,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(717,1146,1760,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(718,1147,1761,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(719,1148,1762,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(720,1149,1763,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(721,1149,1764,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(722,1150,1765,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(723,1151,1766,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(724,1151,1767,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(725,1155,1736,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(726,1155,1737,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(727,1156,1768,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(728,1157,1768,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(729,1158,1753,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(730,1158,1754,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(731,1159,1740,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(732,1159,1741,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(733,1160,1766,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(734,1160,1767,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(735,1161,1742,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(736,1161,1743,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(737,1162,1709,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(738,1163,1719,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(739,1164,1735,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(740,1165,1769,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(741,1165,1770,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(742,1166,1771,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(743,1167,1772,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(744,1168,1773,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(745,1168,1774,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(746,1169,1775,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(747,1170,1776,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(748,1171,1777,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(749,1172,1778,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(750,1172,1779,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(751,1173,1780,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(752,1174,1781,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(753,1175,1782,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(754,1175,1783,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(755,1176,1784,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(756,1181,1701,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(757,1182,1705,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(758,1182,1785,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(759,1183,1697,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(760,1184,1697,'2013-11-06 23:16:16','2013-11-06 23:16:16','loader',NULL),(761,1113,1720,'2013-11-30 23:27:25','2013-11-30 23:27:25','1696',NULL),(762,1120,1786,'2013-12-15 22:07:47','2013-12-15 22:07:47','1704',NULL);
/*!40000 ALTER TABLE `user_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `birthdays`
--

/*!50001 DROP TABLE IF EXISTS `birthdays`*/;
/*!50001 DROP VIEW IF EXISTS `birthdays`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`salma`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `birthdays` AS select `t1`.`first_name` AS `first_name`,`t1`.`last_name` AS `last_name`,`t1`.`id` AS `id`,'student' AS `type`,`t1`.`birthdate` AS `birthdate`,`t2`.`school_id` AS `school_id` from ((`student` `t1` join `classroom` `t2`) join `class_student` `t3`) where (((`t1`.`birthdate` + interval ((year(now()) - year(`t1`.`birthdate`)) + 0) year) between cast(now() as date) and cast((now() + interval 30 day) as date)) and (`t1`.`id` = `t3`.`student_id`) and (`t2`.`id` = `t3`.`classroom_id`)) union select `t1`.`first_name` AS `first_name`,`t1`.`last_name` AS `last_name`,`t1`.`id` AS `id`,'staff' AS `type`,`t1`.`birthdate` AS `birthdate`,`t2`.`school_id` AS `school_id` from (`user` `t1` join `user_school` `t2`) where (((`t1`.`birthdate` + interval ((year(now()) - year(`t1`.`birthdate`)) + 0) year) between cast(now() as date) and cast((now() + interval 30 day) as date)) and ((`t1`.`roles` like '%T%') or (`t1`.`roles` like '%S%') or (`t1`.`roles` like '%A%')) and (`t1`.`id` = `t2`.`user_id`)) order by `birthdate` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

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
/*!50001 VIEW `parents_students` AS select `t1`.`id` AS `student_id`,`t5`.`id` AS `user_id`,`t1`.`first_name` AS `student_first`,`t1`.`last_name` AS `student_last`,`t6`.`name` AS `GRADE`,`t1`.`allergies` AS `allergies`,`t1`.`comments` AS `comments`,`t3`.`name` AS `class`,`t5`.`first_name` AS `parent_first`,`t5`.`last_name` AS `parent_last`,`t5`.`city` AS `city`,`t5`.`state` AS `state`,`t5`.`addr1` AS `addr1`,`t5`.`addr2` AS `addr2`,`t5`.`zip` AS `zip`,`t5`.`email` AS `email`,`t5`.`phone` AS `phone`,`t5`.`public_profile` AS `public_profile`,`t5`.`cell_phone` AS `cell_phone`,`t5`.`school_id` AS `school_id` from (((((`student` `t1` join `class_student` `t2` on((`t1`.`id` = `t2`.`student_id`))) join `classroom` `t3` on((`t3`.`id` = `t2`.`classroom_id`))) join `user_student` `t4` on((`t1`.`id` = `t4`.`student_id`))) join `user` `t5` on((`t4`.`user_id` = `t5`.`id`))) join `grades` `t6` on((`t1`.`grade_id` = `t6`.`id`))) */;
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
/*!50001 VIEW `staff_absent_today` AS select distinct `t1`.`first_name` AS `first_name`,`t1`.`id` AS `user_id`,`t1`.`last_name` AS `last_name`,`t2`.`start_date_time` AS `start_date_time`,`t2`.`end_date_time` AS `end_date_time`,`t2`.`reason` AS `reason` from ((`user` `t1` join `absence` `t2`) join `absence_owner` `t3`) where ((`t2`.`id` = `t3`.`absence_id`) and (`t3`.`user_id` = `t1`.`id`) and ((`t1`.`roles` like '%T%') or (`t1`.`roles` like '%S%') or (`t1`.`roles` like '%A%')) and (now() between `t2`.`start_date_time` and `t2`.`end_date_time`)) group by `t1`.`id`,`t1`.`last_name`,`t1`.`first_name`,`t2`.`reason`,`t2`.`start_date_time`,`t2`.`end_date_time` order by `user_id` */;
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
/*!50001 VIEW `student_attendance` AS select `t1`.`first_name` AS `first_name`,`t1`.`last_name` AS `last_name`,`t3`.`reason` AS `reason`,`t3`.`start_date_time` AS `start_date_time`,`t3`.`end_date_time` AS `end_date_time`,`t1`.`id` AS `student_id`,`t7`.`id` AS `user_id`,`t3`.`id` AS `absence_id`,(case when ((`t3`.`start_date_time` <= now()) and (`t3`.`end_date_time` >= now())) then 1 else 0 end) AS `present` from ((((((`student` `t1` left join `absence_owner` `t2` on(((`t1`.`id` = `t2`.`student_id`) and `t2`.`absence_id` in (select `t1`.`absence_id` from (`absence_owner` `t1` join `absence` `t2`) where ((`t1`.`absence_id` = `t2`.`id`) and (`t2`.`start_date_time` <= now()) and (`t2`.`end_date_time` >= now())))))) left join `absence` `t3` on((`t2`.`absence_id` = `t3`.`id`))) join `class_student` `t4` on((`t1`.`id` = `t4`.`student_id`))) join `classroom` `t5` on((`t4`.`classroom_id` = `t5`.`id`))) join `user_class` `t6` on((`t5`.`id` = `t6`.`classroom_id`))) join `user` `t7` on((`t6`.`user_id` = `t7`.`id`))) */;
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
/*!50001 VIEW `students_absent_today` AS select `t1`.`first_name` AS `first_name`,`t1`.`last_name` AS `last_name`,`t3`.`reason` AS `reason`,`t3`.`start_date_time` AS `start_date_time`,`t3`.`end_date_time` AS `end_date_time`,`t3`.`parent_entered` AS `parent_entered`,`t3`.`type` AS `type`,`t1`.`id` AS `student_id`,`t3`.`id` AS `absence_id`,(case when ((`t3`.`start_date_time` <= now()) and (`t3`.`end_date_time` >= now())) then 1 else 0 end) AS `present` from ((((`student` `t1` left join `absence_owner` `t2` on(((`t1`.`id` = `t2`.`student_id`) and `t2`.`absence_id` in (select `t1`.`absence_id` from (`absence_owner` `t1` join `absence` `t2`) where ((`t1`.`absence_id` = `t2`.`id`) and (`t2`.`start_date_time` <= now()) and (`t2`.`end_date_time` >= now())))))) left join `absence` `t3` on((`t2`.`absence_id` = `t3`.`id`))) join `class_student` `t4` on((`t1`.`id` = `t4`.`student_id`))) join `classroom` `t5` on((`t4`.`classroom_id` = `t5`.`id`))) */;
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

-- Dump completed on 2013-12-17 10:50:25
