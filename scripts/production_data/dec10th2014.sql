
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1881,'demoadmin','password','A','Arther','Lindsley','','demoadmin@schoolishness.com','201 East Ohio','','Chicago','IL',1,'60647','',NULL,NULL,'2014-10-30 10:22:10',NULL,NULL,'1881',1),(1891,'demoteacher','password','T','Cindy','Collin','(100) 000-0003','demoteacher@schoolishness.com','123 N. Sawyer Ave','','Littleton','CO',1,'60644','(100) 000-0003',NULL,NULL,'2014-10-30 10:22:10',NULL,NULL,'1891',1),(1991,'rdhilbert@gmail.com','hilbertland','T','Rachel','Hilbert','(773) 941-3606','rdhilbert@gmail.com','','','','IL',1,'','',NULL,NULL,'2014-11-20 01:20:51','2014-11-19 19:20:51','','1991',0),(2001,'bucktownacademy@gmail.com','Bucktown','T','Rebecca','Gonzalez','','bucktownacademy@gmail.com','','','','AK',1,'','',NULL,NULL,'2014-11-20 01:21:37','2014-11-19 19:21:37','',NULL,0),(2131,'Amy@hangingout.net','a11111','P','Amy','Pearl','(773) 343-3213','Amy@hangingout.net','1945 W Cortland St','','Chicago','IL',1,'60622','(773) 343-3213',NULL,NULL,'2014-12-08 21:07:45','2014-12-08 15:07:45','',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1211,'Aman','Salas',31,NULL,NULL,NULL,'2014-10-30 10:18:47',NULL,NULL,NULL,1),(1221,'Marcos','Salas',31,NULL,NULL,NULL,'2014-10-30 10:18:47',NULL,NULL,NULL,1),(1231,'Andy','Sierra',31,NULL,NULL,NULL,'2014-10-30 10:18:47',NULL,NULL,NULL,1),(1241,'Martha','Collins',31,NULL,NULL,NULL,'2014-10-30 10:18:47',NULL,NULL,NULL,1),(1251,'Gavin','Brown',31,'','',NULL,'2014-12-04 23:38:21','2014-12-04 17:38:21','1881','2111',0),(1331,'Gracie','Caballero',31,'','',NULL,'2014-12-05 03:36:05','2014-12-04 21:36:05','1881',NULL,0),(1341,'Lilah','Pearl',31,'','',NULL,'2014-12-05 03:36:37','2014-12-04 21:36:37','1881',NULL,0),(1351,'Lucia','Solares',31,'','',NULL,'2014-12-05 03:36:57','2014-12-04 21:36:57','1881',NULL,0),(1361,'Vasu','Surakanti',31,'','',NULL,'2014-12-05 03:43:43','2014-12-04 21:43:43','1881',NULL,0),(1371,'Alexander','Taylor',31,'','',NULL,'2014-12-05 03:44:15','2014-12-04 21:44:15','1881',NULL,0);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (11,'None','Bucktown Academy','1903 N Milwaukee Ave, Chicago, IL 60647','','IL','Chicago','60647','(773) 666-5788','Bucktownacademy@gmail.com','2014-10-30 10:17:25','2014-10-30 05:17:25','loader',NULL);
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `absence` WRITE;
/*!40000 ALTER TABLE `absence` DISABLE KEYS */;
INSERT INTO `absence` VALUES (251,'2014-11-20 00:00:00','2014-11-20 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2014-11-21 03:39:16','2014-11-20 23:59:59','1891',NULL),(271,'2014-11-20 00:00:00','2014-11-20 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2014-11-21 03:53:08','2014-11-20 23:59:59','1891',NULL),(291,'2014-11-20 00:00:00','2014-11-20 23:59:59',NULL,NULL,1,NULL,1,0,'2014-11-21 10:32:57','2014-11-20 23:59:59','1891',NULL),(301,'2014-11-20 00:00:00','2014-11-20 23:59:59',NULL,NULL,1,NULL,1,0,'2014-11-21 10:33:03','2014-11-20 23:59:59','1891',NULL),(311,'2014-11-20 00:00:00','2014-11-20 23:59:59',NULL,NULL,1,NULL,1,0,'2014-11-21 10:38:48','2014-11-20 23:59:59','1891',NULL),(351,'2014-11-23 00:00:00','2014-11-23 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2014-11-24 11:12:28','2014-11-23 23:59:59','1891',NULL),(361,'2014-11-23 00:00:00','2014-11-23 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2014-11-24 11:13:06','2014-11-23 23:59:59','1891',NULL),(371,'2014-11-23 00:00:00','2014-11-23 23:59:59',NULL,NULL,1,NULL,1,0,'2014-11-24 11:59:21','2014-11-23 23:59:59','1891',NULL),(411,'2014-11-24 00:00:00','2014-11-24 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2014-11-25 01:08:35','2014-11-24 23:59:59','2001',NULL),(421,'2014-11-24 00:00:00','2014-11-24 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2014-11-25 01:10:23','2014-11-24 23:59:59','2001',NULL),(431,'2014-11-25 06:00:04','2014-11-26 05:59:04','Teacher reported',NULL,1,NULL,1,1,'2014-11-26 01:25:10','2014-11-25 23:59:59','1891','1891'),(441,'2014-11-25 00:00:00','2014-11-25 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2014-11-26 01:25:18','2014-11-25 23:59:59','1891',NULL),(451,'2014-11-25 00:00:00','2014-11-25 23:59:59',NULL,NULL,2,NULL,1,0,'2014-11-26 01:50:14','2014-11-25 23:59:59','1901',NULL),(471,'2014-11-26 00:00:00','2014-11-26 23:59:59',NULL,NULL,2,NULL,1,0,'2014-11-27 05:51:36','2014-11-26 23:59:59','1901',NULL),(531,'2014-11-29 12:00:45','2014-11-30 11:59:45','Teacher reported',NULL,1,NULL,0,1,'2014-11-30 11:14:23','2014-11-29 23:59:59','1891','1891'),(601,'2014-12-01 00:00:00','2014-12-01 23:59:59',NULL,NULL,1,NULL,1,0,'2014-12-02 00:49:17','2014-12-01 23:59:59','2001',NULL),(771,'2014-12-01 00:00:00','2014-12-01 23:59:59',NULL,NULL,3,NULL,1,0,'2014-12-02 06:36:43','2014-12-01 23:59:59','1901',NULL),(791,'2014-12-01 00:00:00','2014-12-02 00:00:00','',NULL,1,NULL,1,0,'2014-12-02 11:51:23','2014-12-02 00:00:00',NULL,NULL),(801,'2014-12-03 00:00:00','2014-12-06 00:00:00','',NULL,1,NULL,1,0,'2014-12-02 11:51:48','2014-12-06 00:00:00',NULL,NULL),(811,'2014-12-01 00:00:00','2014-12-02 00:00:00','Teacher reported',NULL,4,NULL,1,0,'2014-12-02 11:52:22','2014-12-02 00:00:00',NULL,NULL),(851,'2014-12-02 00:00:00','2014-12-02 23:59:59','Teacher reported',NULL,1,NULL,0,1,'2014-12-03 01:14:12','2014-12-02 23:59:59','2001',NULL),(861,'2014-12-02 00:00:00','2014-12-03 00:00:00','',NULL,1,NULL,0,1,'2014-12-03 01:28:54','2014-12-03 00:00:00',NULL,NULL),(881,'2014-12-06 00:00:00','2014-12-06 23:59:59',NULL,NULL,1,NULL,1,0,'2014-12-06 23:45:28','2014-12-06 23:59:59','2001',NULL);
/*!40000 ALTER TABLE `absence` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `bulletins` WRITE;
/*!40000 ALTER TABLE `bulletins` DISABLE KEYS */;
INSERT INTO `bulletins` VALUES (61,'Welcome to the Bucktown Academy Parent Portal','We’re making it much easier to stay in touch!\n\n* All updates from school in one place on your mobile device\n* Report absences from your phone\n* Sign up via email invitation sent by your child’s teacher\n* Contact parents in your child’s class from the mobile directory\n* Available from bucktownacademy.com website  via Curriculum-> Parent Portal link\n\nAdditional features coming soon \n\n* Digital sign out process\n* Digitally sign permission slips on your phone\n* Quick pay for field trips on your phone',1,NULL,11,NULL,'2014-10-30 10:21:29','2014-10-30 05:21:29','Admin',NULL),(211,'Winter Party Saturday December 13 from 9-11 a.m','Hi Families,\n\nJoin us for a Winter Party on Saturday December 13 from 9-11 a.m. \n\nNothing says winter quite like making snowflakes, building snowmen, and enjoying a\nwinter treat. We will provide coffee and pastries for adults, all the\nmaterials, snacks for kids, and fun. All you need to do is bring your child\nand have a good time.\n\nIf you would like to attend please RSVP by emailing Ms. Gonzalez at\nbucktownacademy@gmail.com',1,NULL,11,NULL,'2014-12-05 04:14:00','2014-12-04 22:14:00','1881',NULL),(261,'Classroom Holiday Party 12/19','We would love to celebrate our last day of school before Winter Break with a Holiday Party! All parents are welcome to join us on Friday, December 19 from 10:00-11:00 a.m. for a group snack, parent/child activity, and a special surprise for parents. Please let us know by 12/15 if you are attending so we can plan accordingly.\n\nThank you!\nMs. Gonzalez & Ms. Hilbert \nMs. Gonzalez & Ms. Hilbert ',1,NULL,11,NULL,'2014-12-08 09:41:26','2014-12-08 03:41:26','2001',NULL),(271,'Book Orders Due Monday, December 8','Don\'t forget that all Scholastic Book Orders are due Monday, December 8.  \n\nOrdering online is fast and easy:\nVISIT scholastic.com/readingclub\nENTER the one-time Class Activation Code (GQT8P)\nSHOP from a carefully curated selection of the best books, value packs, and Storia eBooks\nSUBMIT your order and earn FREE Books for our classroom\nAll book orders will be shipped to our classroom so we can celebrate the joy of reading together!\n\n\n',1,NULL,11,NULL,'2014-12-08 09:47:12','2014-12-08 03:47:12','2001',NULL);
/*!40000 ALTER TABLE `bulletins` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (331,11,'PreK',0,'2014-10-30 10:19:40','2014-10-30 05:19:40','Admin','Admin');
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (31,'Group 1',11,'2014-10-30 10:17:43',NULL,NULL,NULL);
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `user_student` WRITE;
/*!40000 ALTER TABLE `user_student` DISABLE KEYS */;
INSERT INTO `user_student` VALUES (1081,1341,2131,'2014-12-08 21:07:46','2014-12-08 15:07:46','2131',NULL);
/*!40000 ALTER TABLE `user_student` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `user_school` WRITE;
/*!40000 ALTER TABLE `user_school` DISABLE KEYS */;
INSERT INTO `user_school` VALUES (801,11,1881,'2014-10-30 10:30:48','2014-10-30 05:30:48','Admin',NULL),(811,11,1891,'2014-10-30 10:30:48','2014-10-30 05:30:48','Admin',NULL),(911,11,1991,'2014-11-20 01:20:52','2014-11-19 19:20:52','1991',NULL),(921,11,2001,'2014-11-20 01:21:38','2014-11-19 19:21:38','2001',NULL),(971,11,2001,'2014-11-24 14:11:43',NULL,NULL,NULL),(991,11,2001,'2014-11-24 14:11:51',NULL,NULL,NULL),(1001,11,1991,'2014-11-24 14:11:51',NULL,NULL,NULL),(1091,11,2131,'2014-12-08 21:07:46','2014-12-08 15:07:46','2131',NULL);
/*!40000 ALTER TABLE `user_school` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `user_class` WRITE;
/*!40000 ALTER TABLE `user_class` DISABLE KEYS */;
INSERT INTO `user_class` VALUES (161,331,1891,'2014-10-30 10:32:13','2014-10-30 05:32:13','Admin',NULL),(181,331,2001,'2014-11-24 14:10:51',NULL,NULL,NULL),(191,331,1991,'2014-11-24 14:10:51',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_class` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `student_notes` WRITE;
/*!40000 ALTER TABLE `student_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_notes` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `absence_owner` WRITE;
/*!40000 ALTER TABLE `absence_owner` DISABLE KEYS */;
INSERT INTO `absence_owner` VALUES (251,1211,NULL,251,'2014-11-21 03:39:16','2014-11-20 23:59:59','1891',NULL),(291,NULL,NULL,291,'2014-11-21 10:32:57','2014-11-20 23:59:59','1891',NULL),(301,NULL,NULL,301,'2014-11-21 10:33:03','2014-11-20 23:59:59','1891',NULL),(311,NULL,NULL,311,'2014-11-21 10:38:48','2014-11-20 23:59:59','1891',NULL),(351,1211,NULL,351,'2014-11-24 11:12:29','2014-11-23 23:59:59','1891',NULL),(361,1221,NULL,361,'2014-11-24 11:13:06','2014-11-23 23:59:59','1891',NULL),(371,1231,NULL,371,'2014-11-24 11:59:21','2014-11-23 23:59:59','1891',NULL),(411,1211,NULL,411,'2014-11-25 01:08:35','2014-11-24 23:59:59','2001',NULL),(421,1231,NULL,421,'2014-11-25 01:10:23','2014-11-24 23:59:59','2001',NULL),(431,1241,NULL,431,'2014-11-26 01:25:10','2014-11-25 23:59:59','1891',NULL),(441,1231,NULL,441,'2014-11-26 01:25:18','2014-11-25 23:59:59','1891',NULL),(451,1211,NULL,451,'2014-11-26 01:50:14','2014-11-25 23:59:59','1901',NULL),(471,1211,NULL,471,'2014-11-27 05:51:36','2014-11-26 23:59:59','1901',NULL),(531,1241,NULL,531,'2014-11-30 11:14:23','2014-11-29 23:59:59','1891',NULL),(601,1241,NULL,601,'2014-12-02 00:49:17','2014-12-01 23:59:59','2001',NULL),(771,1211,NULL,771,'2014-12-02 06:36:43','2014-12-01 23:59:59','1901',NULL),(791,1221,NULL,791,'2014-12-02 11:51:23','2014-12-02 00:00:00',NULL,NULL),(801,1221,NULL,801,'2014-12-02 11:51:48','2014-12-06 00:00:00',NULL,NULL),(811,1221,NULL,811,'2014-12-02 11:52:22','2014-12-02 00:00:00',NULL,NULL),(851,1241,NULL,851,'2014-12-03 01:14:12','2014-12-02 23:59:59','2001',NULL),(861,1241,NULL,861,'2014-12-03 01:28:54','2014-12-03 00:00:00',NULL,NULL),(881,1351,NULL,881,'2014-12-06 23:45:28','2014-12-06 23:59:59','2001',NULL);
/*!40000 ALTER TABLE `absence_owner` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `class_bulletins` WRITE;
/*!40000 ALTER TABLE `class_bulletins` DISABLE KEYS */;
INSERT INTO `class_bulletins` VALUES (71,61,331,'2014-10-30 21:57:30','2014-10-30 16:57:30','Admin',NULL);
/*!40000 ALTER TABLE `class_bulletins` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `class_student` WRITE;
/*!40000 ALTER TABLE `class_student` DISABLE KEYS */;
INSERT INTO `class_student` VALUES (1001,1211,331,'2014-12-04 23:38:21','2014-12-04 17:38:21','1881',NULL),(1081,1331,331,'2014-12-05 03:36:05','2014-12-04 21:36:05','1881',NULL),(1091,1341,331,'2014-12-05 03:36:37','2014-12-04 21:36:37','1881',NULL),(1101,1351,331,'2014-12-05 03:36:57','2014-12-04 21:36:57','1881',NULL),(1111,1361,331,'2014-12-05 03:43:43','2014-12-04 21:43:43','1881',NULL),(1121,1371,331,'2014-12-05 03:44:15','2014-12-04 21:44:15','1881',NULL),(1151,1251,331,'2014-12-06 10:15:44',NULL,NULL,NULL),(1171,1241,331,'2014-12-08 22:25:32',NULL,NULL,NULL);
/*!40000 ALTER TABLE `class_student` ENABLE KEYS */;
UNLOCK TABLES;


