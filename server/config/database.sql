create database research_agora2;
use research_agora2;

-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: research_agora
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `field` (
  `field_id` int unsigned NOT NULL,
  `field_name` varchar(50) NOT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE KEY `field_name` (`field_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (12,'Alzheimers Research'),(22,'Artificial Intelligence'),(10,'Biotechnology'),(1,'Cancer Research'),(17,'Chemical Engineering'),(21,'Computational Chemistry'),(6,'Conservation'),(15,'Conservation Biology'),(23,'Data Science'),(8,'Drug Delivery Systems'),(14,'Ecology'),(5,'Environmental Science'),(3,'Genomics'),(24,'Healthcare Technology'),(25,'killing'),(4,'Marine Biology'),(2,'Molecular Biology'),(7,'Nanotechnology'),(13,'Neurodegenerative Diseases'),(11,'Neuroscience'),(27,'nulla'),(19,'Physics'),(9,'Plant Biology'),(20,'Quantum Computing'),(16,'Renewable Energy'),(18,'Sustainable Technology'),(26,'ut');
/*!40000 ALTER TABLE `field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitation`
--

DROP TABLE IF EXISTS `invitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitation` (
  `invitation_id` int unsigned NOT NULL AUTO_INCREMENT,
  `invitation_status` tinyint unsigned NOT NULL DEFAULT '0',
  `invitation_send_on` date DEFAULT (curdate()),
  `sender_id` int unsigned NOT NULL,
  `receiver_id` int unsigned NOT NULL,
  `project_id` int unsigned NOT NULL,
  `offer_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`invitation_id`),
  KEY `fk_user_10` (`sender_id`),
  KEY `fk_user_11` (`receiver_id`),
  KEY `fk_project_5` (`project_id`),
  KEY `fk_offer_3` (`offer_id`),
  CONSTRAINT `fk_offer_3` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`offer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_5` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_10` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_11` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitation`
--

LOCK TABLES `invitation` WRITE;
/*!40000 ALTER TABLE `invitation` DISABLE KEYS */;
INSERT INTO `invitation` VALUES (1,1,'2025-02-01',1,2,1,1),(2,1,'2025-02-01',12,4,7,7),(5,1,'2025-02-02',4,12,9,11),(6,1,'2025-02-02',9,1,4,4),(7,0,'2025-02-02',1,4,1,8),(8,0,'2025-02-02',1,10,1,1),(9,0,'2025-02-02',2,1,8,10),(10,1,'2025-02-02',2,10,8,10),(11,1,'2025-02-02',2,12,1,1),(12,1,'2025-02-02',3,2,2,2),(13,1,'2025-02-02',3,6,1,8),(14,0,'2025-02-02',3,4,1,1),(15,0,'2025-02-02',3,11,2,2),(16,1,'2025-02-02',3,12,1,8),(17,0,'2025-02-02',4,2,9,11),(18,1,'2025-02-02',4,9,7,7),(19,0,'2025-02-02',6,1,3,3),(20,1,'2025-02-02',6,3,3,3),(21,1,'2025-02-02',6,9,3,9),(22,1,'2025-02-02',6,12,3,3),(23,0,'2025-02-02',6,11,3,3),(24,1,'2025-02-02',9,2,4,4),(25,1,'2025-02-02',9,4,4,4),(26,1,'2025-02-02',9,10,4,4),(27,1,'2025-02-02',9,11,4,4),(28,1,'2025-02-02',10,1,5,5),(29,1,'2025-02-02',10,2,5,5),(30,1,'2025-02-02',10,4,5,5),(31,1,'2025-02-02',10,6,5,5),(32,1,'2025-02-02',10,11,5,5),(33,1,'2025-02-02',11,1,6,6),(34,1,'2025-02-02',11,3,6,6),(35,1,'2025-02-02',11,4,6,6),(36,1,'2025-02-02',11,10,6,6),(37,1,'2025-02-02',11,12,6,6),(38,0,'2025-02-02',12,1,9,11),(44,1,'2025-02-02',2,12,8,10),(45,1,'2025-02-03',12,29,7,7);
/*!40000 ALTER TABLE `invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `message_id` int unsigned NOT NULL AUTO_INCREMENT,
  `message_content` varchar(255) NOT NULL,
  `message_date_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `message_is_read` tinyint(1) NOT NULL DEFAULT '0',
  `sender_id` int unsigned NOT NULL,
  `receiver_id` int unsigned NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `fk_user_8` (`sender_id`),
  KEY `fk_user_9` (`receiver_id`),
  CONSTRAINT `fk_user_8` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_9` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'This is an invitation for joining Project test sadfasdfasdfsadfsadfsadfsadf related to this the first offer','2025-02-01 18:54:26',0,1,2),(2,'asdf sdfk sapoi e','2025-02-01 18:55:57',0,2,1),(3,'jkd ;alsdj asd','2025-02-01 18:55:59',0,2,1),(4,'sadfjweio jasi jasi ;esjio askmf io aje;ioj ei aseijesi jes asfijnmaewji as','2025-02-01 18:56:05',0,1,2),(5,'sadfas ','2025-02-01 18:56:08',0,2,1),(6,'asef eas','2025-02-01 18:56:09',0,2,1),(7,'fasfes','2025-02-01 18:56:09',0,2,1),(8,'asdf','2025-02-01 18:56:10',0,2,1),(9,'s','2025-02-01 18:56:10',0,2,1),(10,'d','2025-02-01 18:56:11',0,2,1),(11,'d','2025-02-01 18:56:11',0,2,1),(12,'d','2025-02-01 18:56:11',0,2,1),(13,'d','2025-02-01 18:56:11',0,2,1),(14,'asfk awi easki aes','2025-02-01 18:56:18',0,1,2),(15,'as ','2025-02-01 18:56:18',0,1,2),(16,'asdfk','2025-02-01 18:56:18',0,1,2),(17,'as ','2025-02-01 18:56:19',0,1,2),(18,'asf ak','2025-02-01 18:56:19',0,1,2),(19,'ewspokfeos faes','2025-02-01 18:56:20',0,1,2),(20,'o oeskf','2025-02-01 18:56:20',0,1,2),(21,' a','2025-02-01 18:56:21',0,1,2),(22,'sadfasdf','2025-02-01 18:56:27',0,2,1),(23,'asdffawef','2025-02-01 18:56:39',0,2,1),(24,'This is an invitation for joining AI-Powered Predictive Models for Early Disease Diagnosis related to this Data Scientist for AI Healthcare Modeling','2025-02-01 23:01:02',0,12,4),(27,'This is an invitation for joining Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments related to this Genetic Engineer for Stress-Resilient Crop Development','2025-02-02 17:52:45',0,4,12),(29,'hello diana','2025-02-02 17:56:14',0,12,6),(35,'Hello Hanna!','2025-02-02 18:56:47',0,3,12),(36,'Hi Bob!','2025-02-02 18:57:16',0,12,3),(37,'how are you?','2025-02-02 18:58:27',0,3,12),(38,'This is an invitation for joining Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy related to this Ecologist for Biodiversity Conservation in Tropical Forests','2025-02-02 19:30:22',0,9,1),(39,'This is an invitation for joining Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9 related to this Biomedical Engineer for Nanoparticle Development','2025-02-02 20:14:23',0,1,4),(40,'This is an invitation for joining Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9 related to this CRISPR-Cas9 Researcher for Cancer Therapy Development','2025-02-02 20:14:33',0,1,10),(41,'This is an invitation for joining Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation related to this Environmental Scientist for Marine Pollution Solutions','2025-02-02 20:15:47',0,2,1),(42,'This is an invitation for joining Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation related to this Environmental Scientist for Marine Pollution Solutions','2025-02-02 20:15:57',0,2,10),(43,'This is an invitation for joining Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9 related to this CRISPR-Cas9 Researcher for Cancer Therapy Development','2025-02-02 20:16:05',0,2,12),(44,'This is an invitation for joining Nanoparticle-Based Drug Delivery Systems for Targeted Cancer Treatment related to this Nanotechnology Researcher for Drug Delivery Systems','2025-02-02 20:16:44',0,3,2),(45,'This is an invitation for joining Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9 related to this Biomedical Engineer for Nanoparticle Development','2025-02-02 20:16:52',0,3,6),(46,'This is an invitation for joining Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9 related to this CRISPR-Cas9 Researcher for Cancer Therapy Development','2025-02-02 20:16:58',0,3,4),(47,'This is an invitation for joining Nanoparticle-Based Drug Delivery Systems for Targeted Cancer Treatment related to this Nanotechnology Researcher for Drug Delivery Systems','2025-02-02 20:17:05',0,3,11),(48,'This is an invitation for joining Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9 related to this Biomedical Engineer for Nanoparticle Development','2025-02-02 20:17:11',0,3,12),(49,'This is an invitation for joining Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments related to this Genetic Engineer for Stress-Resilient Crop Development','2025-02-02 20:17:51',0,4,2),(50,'This is an invitation for joining AI-Powered Predictive Models for Early Disease Diagnosis related to this Data Scientist for AI Healthcare Modeling','2025-02-02 20:18:59',0,4,9),(51,'This is an invitation for joining Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery related to this Neuroimaging Specialist for Alzheimer\'s Research','2025-02-02 20:19:43',0,6,1),(52,'This is an invitation for joining Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery related to this Neuroimaging Specialist for Alzheimer\'s Research','2025-02-02 20:19:50',0,6,3),(53,'This is an invitation for joining Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery related to this Biomarker Discovery Specialist for Alzheimer\'s Research','2025-02-02 20:19:56',0,6,9),(54,'This is an invitation for joining Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery related to this Neuroimaging Specialist for Alzheimer\'s Research','2025-02-02 20:20:01',0,6,12),(55,'This is an invitation for joining Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery related to this Neuroimaging Specialist for Alzheimer\'s Research','2025-02-02 20:20:07',0,6,11),(56,'This is an invitation for joining Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy related to this Ecologist for Biodiversity Conservation in Tropical Forests','2025-02-02 20:20:42',0,9,2),(57,'This is an invitation for joining Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy related to this Ecologist for Biodiversity Conservation in Tropical Forests','2025-02-02 20:20:47',0,9,4),(58,'This is an invitation for joining Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy related to this Ecologist for Biodiversity Conservation in Tropical Forests','2025-02-02 20:20:54',0,9,10),(59,'This is an invitation for joining Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy related to this Ecologist for Biodiversity Conservation in Tropical Forests','2025-02-02 20:20:59',0,9,11),(60,'This is an invitation for joining Developing Sustainable Energy Storage Solutions for Renewable Power Grids related to this Battery Researcher for Sustainable Energy Storage','2025-02-02 20:21:47',0,10,1),(61,'This is an invitation for joining Developing Sustainable Energy Storage Solutions for Renewable Power Grids related to this Battery Researcher for Sustainable Energy Storage','2025-02-02 20:21:52',0,10,2),(62,'This is an invitation for joining Developing Sustainable Energy Storage Solutions for Renewable Power Grids related to this Battery Researcher for Sustainable Energy Storage','2025-02-02 20:21:57',0,10,4),(63,'This is an invitation for joining Developing Sustainable Energy Storage Solutions for Renewable Power Grids related to this Battery Researcher for Sustainable Energy Storage','2025-02-02 20:22:02',0,10,6),(64,'This is an invitation for joining Developing Sustainable Energy Storage Solutions for Renewable Power Grids related to this Battery Researcher for Sustainable Energy Storage','2025-02-02 20:22:06',0,10,11),(65,'This is an invitation for joining Quantum Simulations for Chemical Reactions and Material Design related to this Computational Chemist for Quantum Simulations','2025-02-02 20:22:42',0,11,1),(66,'This is an invitation for joining Quantum Simulations for Chemical Reactions and Material Design related to this Computational Chemist for Quantum Simulations','2025-02-02 20:22:52',0,11,3),(67,'This is an invitation for joining Quantum Simulations for Chemical Reactions and Material Design related to this Computational Chemist for Quantum Simulations','2025-02-02 20:22:57',0,11,4),(68,'This is an invitation for joining Quantum Simulations for Chemical Reactions and Material Design related to this Computational Chemist for Quantum Simulations','2025-02-02 20:23:02',0,11,10),(69,'This is an invitation for joining Quantum Simulations for Chemical Reactions and Material Design related to this Computational Chemist for Quantum Simulations','2025-02-02 20:23:07',0,11,12),(76,'This is an invitation for joining Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments related to this Genetic Engineer for Stress-Resilient Crop Development','2025-02-02 22:21:13',0,12,1),(82,'This is an invitation for joining Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation related to this Environmental Scientist for Marine Pollution Solutions','2025-02-02 23:05:58',0,2,12),(85,'hello!!','2025-02-02 23:09:35',0,12,2),(86,'hi!','2025-02-02 23:09:52',0,2,12),(87,'This is an invitation for joining AI-Powered Predictive Models for Early Disease Diagnosis related to this Data Scientist for AI Healthcare Modeling','2025-02-03 11:05:21',0,12,29),(88,'adfasdf','2025-02-03 11:09:42',0,29,12),(89,'asdfsadfasdfasdf','2025-02-03 11:10:06',0,12,29),(90,'asdgasdgfasdgasdg','2025-02-03 11:10:10',0,29,12),(91,'asdg','2025-02-03 11:10:11',0,29,12),(94,'asdasdg','2025-02-03 11:10:14',0,12,29),(97,'asdg','2025-02-03 11:10:15',0,12,29),(98,'asd','2025-02-03 11:10:31',0,12,29),(99,'a','2025-02-03 11:10:32',0,12,29),(100,'a','2025-02-03 11:10:32',0,12,29),(101,'a','2025-02-03 11:10:32',0,12,29),(102,'a','2025-02-03 11:10:32',0,12,29),(103,'a','2025-02-03 11:10:32',0,12,29),(104,'a','2025-02-03 11:10:33',0,12,29),(105,'a','2025-02-03 11:10:33',0,12,29),(106,'ads','2025-02-03 11:10:33',0,12,29),(107,'ds','2025-02-03 11:10:34',0,12,29),(108,'d','2025-02-03 11:10:34',0,12,29),(109,'d','2025-02-03 11:10:34',0,12,29),(110,'d','2025-02-03 11:10:34',0,12,29),(111,'d','2025-02-03 11:10:34',0,12,29),(112,'sdf','2025-02-03 11:10:35',0,12,29),(113,'d','2025-02-03 11:10:35',0,12,29),(114,'dsfasdf','2025-02-03 11:10:39',0,12,29);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `type` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,2,5,'You have been removed from undefined by undefined undefined',1,'2025-02-01 18:54:05'),(2,2,2,'You have been invited to join the project: Project test sadfasdfasdfsadfsadfsadfsadf',1,'2025-02-01 18:54:26'),(3,1,3,'Jessica White has accepted the invitation to join your project \"Project test sadfasdfasdfsadfsadfsadfsadf\".',1,'2025-02-01 18:54:39'),(4,2,5,'You have been removed from undefined by undefined undefined',1,'2025-02-01 18:54:45'),(5,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:55:57'),(6,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:55:59'),(7,2,1,'You have a new message from Laura Palmer',1,'2025-02-01 18:56:05'),(8,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:08'),(9,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:09'),(10,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:09'),(11,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:10'),(12,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:10'),(13,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:11'),(14,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:11'),(15,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:11'),(16,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:11'),(17,2,1,'You have a new message from Laura Palmer',1,'2025-02-01 18:56:18'),(18,2,1,'You have a new message from Laura Palmer',1,'2025-02-01 18:56:18'),(19,2,1,'You have a new message from Laura Palmer',1,'2025-02-01 18:56:18'),(20,2,1,'You have a new message from Laura Palmer',1,'2025-02-01 18:56:19'),(21,2,1,'You have a new message from Laura Palmer',1,'2025-02-01 18:56:19'),(22,2,1,'You have a new message from Laura Palmer',1,'2025-02-01 18:56:20'),(23,2,1,'You have a new message from Laura Palmer',1,'2025-02-01 18:56:20'),(24,2,1,'You have a new message from Laura Palmer',1,'2025-02-01 18:56:21'),(25,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:27'),(26,1,1,'You have a new message from Jessica White',0,'2025-02-01 18:56:39'),(27,4,2,'You have been invited to join the project: AI-Powered Predictive Models for Early Disease Diagnosis',1,'2025-02-01 23:01:02'),(28,12,3,'Iván Piña has accepted the invitation to join your project \"AI-Powered Predictive Models for Early Disease Diagnosis\".',1,'2025-02-01 23:02:52'),(29,1,2,'You have been invited to join the project: asdfasdf',0,'2025-02-02 12:51:53'),(30,4,5,'You have been removed from asdfasdf by Lidia Lynch',1,'2025-02-02 12:53:39'),(31,4,5,'You have been removed from asdfasdf by Lidia Lynch',1,'2025-02-02 12:54:59'),(33,4,3,'Lidia Lynch has accepted the invitation to join your project \"Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments\".',1,'2025-02-02 12:56:25'),(34,12,2,'You have been invited to join the project: Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments',1,'2025-02-02 17:52:45'),(35,4,3,'Hanna Clark has accepted the invitation to join your project \"Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments\".',0,'2025-02-02 17:52:53'),(36,6,1,'You have a new message from Hanna Clark',0,'2025-02-02 17:56:14'),(37,12,1,'You have a new message from Bob Smith',1,'2025-02-02 18:56:47'),(38,3,1,'You have a new message from Hanna Clark',1,'2025-02-02 18:57:16'),(39,12,1,'You have a new message from Bob Smith',1,'2025-02-02 18:58:27'),(40,1,2,'You have been invited to join the project: Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy',1,'2025-02-02 19:30:22'),(41,4,2,'You have been invited to join the project: Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9',0,'2025-02-02 20:14:23'),(42,10,2,'You have been invited to join the project: Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9',0,'2025-02-02 20:14:33'),(43,9,3,'Laura Palmer has accepted the invitation to join your project \"Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy\".',0,'2025-02-02 20:14:53'),(44,1,2,'You have been invited to join the project: Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation',0,'2025-02-02 20:15:47'),(45,10,2,'You have been invited to join the project: Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation',0,'2025-02-02 20:15:57'),(46,12,2,'You have been invited to join the project: Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9',1,'2025-02-02 20:16:05'),(47,2,2,'You have been invited to join the project: Nanoparticle-Based Drug Delivery Systems for Targeted Cancer Treatment',1,'2025-02-02 20:16:44'),(48,6,2,'You have been invited to join the project: Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9',0,'2025-02-02 20:16:52'),(49,4,2,'You have been invited to join the project: Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9',0,'2025-02-02 20:16:58'),(50,11,2,'You have been invited to join the project: Nanoparticle-Based Drug Delivery Systems for Targeted Cancer Treatment',0,'2025-02-02 20:17:05'),(51,12,2,'You have been invited to join the project: Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9',1,'2025-02-02 20:17:11'),(52,2,2,'You have been invited to join the project: Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments',1,'2025-02-02 20:17:51'),(53,9,2,'You have been invited to join the project: AI-Powered Predictive Models for Early Disease Diagnosis',0,'2025-02-02 20:18:59'),(54,1,2,'You have been invited to join the project: Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery',0,'2025-02-02 20:19:43'),(55,3,2,'You have been invited to join the project: Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery',0,'2025-02-02 20:19:50'),(56,9,2,'You have been invited to join the project: Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery',0,'2025-02-02 20:19:56'),(57,12,2,'You have been invited to join the project: Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery',1,'2025-02-02 20:20:01'),(58,11,2,'You have been invited to join the project: Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery',0,'2025-02-02 20:20:07'),(59,2,2,'You have been invited to join the project: Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy',1,'2025-02-02 20:20:42'),(60,4,2,'You have been invited to join the project: Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy',0,'2025-02-02 20:20:47'),(61,10,2,'You have been invited to join the project: Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy',0,'2025-02-02 20:20:54'),(62,11,2,'You have been invited to join the project: Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy',0,'2025-02-02 20:20:59'),(63,1,2,'You have been invited to join the project: Developing Sustainable Energy Storage Solutions for Renewable Power Grids',0,'2025-02-02 20:21:47'),(64,2,2,'You have been invited to join the project: Developing Sustainable Energy Storage Solutions for Renewable Power Grids',1,'2025-02-02 20:21:53'),(65,4,2,'You have been invited to join the project: Developing Sustainable Energy Storage Solutions for Renewable Power Grids',0,'2025-02-02 20:21:57'),(66,6,2,'You have been invited to join the project: Developing Sustainable Energy Storage Solutions for Renewable Power Grids',0,'2025-02-02 20:22:02'),(67,11,2,'You have been invited to join the project: Developing Sustainable Energy Storage Solutions for Renewable Power Grids',0,'2025-02-02 20:22:06'),(68,1,2,'You have been invited to join the project: Quantum Simulations for Chemical Reactions and Material Design',0,'2025-02-02 20:22:42'),(69,3,2,'You have been invited to join the project: Quantum Simulations for Chemical Reactions and Material Design',0,'2025-02-02 20:22:52'),(70,4,2,'You have been invited to join the project: Quantum Simulations for Chemical Reactions and Material Design',0,'2025-02-02 20:22:57'),(71,10,2,'You have been invited to join the project: Quantum Simulations for Chemical Reactions and Material Design',0,'2025-02-02 20:23:02'),(72,12,2,'You have been invited to join the project: Quantum Simulations for Chemical Reactions and Material Design',1,'2025-02-02 20:23:07'),(73,1,3,'Hanna Clark has accepted the invitation to join your project \"Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9\".',0,'2025-02-02 20:24:30'),(74,1,3,'Hanna Clark has accepted the invitation to join your project \"Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9\".',0,'2025-02-02 20:26:23'),(75,11,3,'Laura Palmer has accepted the invitation to join your project \"Quantum Simulations for Chemical Reactions and Material Design\".',0,'2025-02-02 20:27:02'),(76,10,3,'Laura Palmer has accepted the invitation to join your project \"Developing Sustainable Energy Storage Solutions for Renewable Power Grids\".',0,'2025-02-02 20:27:10'),(77,3,3,'Jessica White has accepted the invitation to join your project \"Nanoparticle-Based Drug Delivery Systems for Targeted Cancer Treatment\".',0,'2025-02-02 20:28:08'),(78,10,3,'Jessica White has accepted the invitation to join your project \"Developing Sustainable Energy Storage Solutions for Renewable Power Grids\".',0,'2025-02-02 20:28:16'),(79,9,3,'Jessica White has accepted the invitation to join your project \"Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy\".',0,'2025-02-02 20:28:20'),(80,11,3,'Bob Smith has accepted the invitation to join your project \"Quantum Simulations for Chemical Reactions and Material Design\".',0,'2025-02-02 20:28:59'),(81,6,3,'Bob Smith has accepted the invitation to join your project \"Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery\".',0,'2025-02-02 20:29:30'),(82,11,3,'Iván Piña has accepted the invitation to join your project \"Quantum Simulations for Chemical Reactions and Material Design\".',0,'2025-02-02 20:29:52'),(83,10,3,'Iván Piña has accepted the invitation to join your project \"Developing Sustainable Energy Storage Solutions for Renewable Power Grids\".',0,'2025-02-02 20:30:00'),(84,9,3,'Iván Piña has accepted the invitation to join your project \"Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy\".',0,'2025-02-02 20:30:06'),(85,10,3,'Diana Taylor has accepted the invitation to join your project \"Developing Sustainable Energy Storage Solutions for Renewable Power Grids\".',0,'2025-02-02 20:30:47'),(86,1,3,'Diana Taylor has accepted the invitation to join your project \"Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9\".',0,'2025-02-02 20:30:57'),(87,6,3,'Ethan Brown has accepted the invitation to join your project \"Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery\".',0,'2025-02-02 20:31:15'),(88,12,3,'Ethan Brown has accepted the invitation to join your project \"AI-Powered Predictive Models for Early Disease Diagnosis\".',1,'2025-02-02 20:31:20'),(89,2,3,'Fiona Davis has accepted the invitation to join your project \"Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation\".',1,'2025-02-02 20:32:03'),(90,9,3,'Fiona Davis has accepted the invitation to join your project \"Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy\".',0,'2025-02-02 20:32:07'),(91,11,3,'Fiona Davis has accepted the invitation to join your project \"Quantum Simulations for Chemical Reactions and Material Design\".',0,'2025-02-02 20:32:11'),(92,10,3,'George Lopez has accepted the invitation to join your project \"Developing Sustainable Energy Storage Solutions for Renewable Power Grids\".',0,'2025-02-02 20:32:35'),(93,9,3,'George Lopez has accepted the invitation to join your project \"Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy\".',0,'2025-02-02 20:32:39'),(94,11,3,'Hanna Clark has accepted the invitation to join your project \"Quantum Simulations for Chemical Reactions and Material Design\".',0,'2025-02-02 20:33:07'),(96,12,1,'You have a new message from Lorem Ipsum',1,'2025-02-02 21:41:53'),(98,12,1,'You have a new message from Lorem Ipsum',1,'2025-02-02 21:42:06'),(99,12,1,'You have a new message from Lorem Ipsum',1,'2025-02-02 21:42:11'),(100,12,1,'You have a new message from Lorem Ipsum',1,'2025-02-02 22:20:47'),(101,1,2,'You have been invited to join the project: Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments',0,'2025-02-02 22:21:13'),(103,4,3,'Lorem Ipsum has accepted the invitation to join your project \"Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments\".',0,'2025-02-02 22:21:43'),(105,12,3,'Lorem Ipsum has accepted the invitation to join your project \"AI-Powered Predictive Models for Early Disease Diagnosis\".',1,'2025-02-02 22:23:47'),(106,6,3,'Hanna Clark has accepted the invitation to join your project \"Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery\".',0,'2025-02-02 22:24:33'),(109,12,3,'Lorem Ipsum has accepted the invitation to join your project \"AI-Powered Predictive Models for Early Disease Diagnosis\".',1,'2025-02-02 22:29:28'),(112,12,4,'Lorem Ipsum has rejected the invitation to join your project \"AI-Powered Predictive Models for Early Disease Diagnosis\".',1,'2025-02-02 22:29:55'),(115,12,2,'You have been invited to join the project: Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation',1,'2025-02-02 23:05:58'),(116,2,3,'Hanna Clark has accepted the invitation to join your project \"Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation\".',1,'2025-02-02 23:07:10'),(117,2,1,'You have a new message from Hanna Clark',1,'2025-02-02 23:08:25'),(118,12,1,'You have a new message from Jessica White',1,'2025-02-02 23:08:32'),(119,2,1,'You have a new message from Hanna Clark',1,'2025-02-02 23:09:35'),(120,12,1,'You have a new message from Jessica White',1,'2025-02-02 23:09:52'),(121,12,5,'You have been removed from Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation by Jessica White',1,'2025-02-02 23:11:43'),(123,29,2,'You have been invited to join the project: AI-Powered Predictive Models for Early Disease Diagnosis',1,'2025-02-03 11:05:21'),(124,12,3,'sssssssss ssssssss has accepted the invitation to join your project \"AI-Powered Predictive Models for Early Disease Diagnosis\".',1,'2025-02-03 11:06:39'),(125,29,5,'You have been removed from AI-Powered Predictive Models for Early Disease Diagnosis by Hanna Clark',1,'2025-02-03 11:07:27'),(126,12,1,'You have a new message from sssssssss ssssssss',1,'2025-02-03 11:09:42'),(127,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:06'),(128,12,1,'You have a new message from sssssssss ssssssss',0,'2025-02-03 11:10:10'),(129,12,1,'You have a new message from sssssssss ssssssss',0,'2025-02-03 11:10:11'),(130,12,1,'You have a new message from sssssssss ssssssss',0,'2025-02-03 11:10:11'),(131,12,1,'You have a new message from sssssssss ssssssss',0,'2025-02-03 11:10:11'),(132,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:14'),(133,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:14'),(134,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:15'),(135,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:15'),(136,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:31'),(137,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:32'),(138,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:32'),(139,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:32'),(140,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:32'),(141,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:32'),(142,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:33'),(143,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:33'),(144,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:33'),(145,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:34'),(146,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:34'),(147,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:34'),(148,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:34'),(149,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:34'),(150,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:35'),(151,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:35'),(152,29,1,'You have a new message from Hanna Clark',1,'2025-02-03 11:10:39'),(153,29,5,'You have been removed from AI-Powered Predictive Models for Early Disease Diagnosis by Hanna Clark',0,'2025-02-03 11:13:18');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offer` (
  `offer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int unsigned NOT NULL,
  `offer_title` varchar(255) NOT NULL,
  `offer_description` varchar(255) NOT NULL,
  `number_of_position` smallint unsigned NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`offer_id`),
  KEY `fk_project_2` (`project_id`),
  CONSTRAINT `fk_project_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offer`
--

LOCK TABLES `offer` WRITE;
/*!40000 ALTER TABLE `offer` DISABLE KEYS */;
INSERT INTO `offer` VALUES (1,1,'CRISPR-Cas9 Researcher for Cancer Therapy Development','Join our innovative team in New York to develop CRISPR-Cas9 gene editing strategies for targeted cancer therapy. As a researcher, you\'ll work on cutting-edge cancer genomics, developing precision treatments.',3,0),(2,2,'Nanotechnology Researcher for Drug Delivery Systems','We\'re seeking a researcher to join our team in Toronto to work on developing nanoparticles for targeted cancer drug delivery. You will help design and optimize nanoparticles for increased therapeutic efficacy and reduced side effects in cancer treatments.',3,0),(3,3,'Neuroimaging Specialist for Alzheimer\'s Research','Join our London-based team and contribute to developing innovative neuroimaging techniques for the early detection of Alzheimer\'s disease. As a neuroimaging specialist, you will assist in tracking structural and functional brain changes.',5,0),(4,4,'Ecologist for Biodiversity Conservation in Tropical Forests','We are seeking an ecologist to work in our Melbourne-based team to assess the effects of climate change on tropical forest biodiversity. Your role will include monitoring species, conducting ecological modeling.',4,0),(5,5,'Battery Researcher for Sustainable Energy Storage','Our team in Berlin is looking for a battery researcher to contribute to the development of advanced energy storage systems. You will help design and test next-generation batteries to optimize storage for renewable energy, including lithium-sulfur.',10,0),(6,6,'Computational Chemist for Quantum Simulations','Join our Mexico City-based team as a computational chemist and assist in simulating chemical reactions and material properties using quantum mechanics. This role requires expertise in quantum computing and the design of materials.',5,0),(7,7,'Data Scientist for AI Healthcare Modeling','We are hiring a data scientist to join our San Francisco team and help build AI-powered predictive models for early disease diagnosis. Your work will involve analyzing healthcare datasets to develop machine learning algorithms that predict disease risks.',9,0),(8,1,'Biomedical Engineer for Nanoparticle Development','Join our Toronto team as a biomedical engineer to help design and optimize nanoparticles for targeted cancer therapy. You will collaborate with researchers to ensure the safe and effective delivery of chemotherapy agents using advanced nanoparticle.',6,0),(9,3,'Biomarker Discovery Specialist for Alzheimer\'s Research','Our London team is looking for a specialist in biomarker discovery to assist in identifying new biomarkers for Alzheimer\'s disease. You will collaborate with neuroimaging specialists and work on genetic and biochemical analysis.',7,0),(10,8,'Environmental Scientist for Marine Pollution Solutions','Offer Description: Join our Paris team as an environmental scientist and help develop solutions to reduce marine pollution. You will participate in field studies to evaluate the impacts of pollution and collaborate with conservationists to design.',2,0),(11,9,'Genetic Engineer for Stress-Resilient Crop Development',' We are looking for a genetic engineer to work on enhancing crops for resilience against environmental stresses. This role involves using CRISPR and other gene-editing tools to develop drought-tolerant, temperature-resistant, and salinity-resistant crops.',2,0),(13,11,'lorerm ipsum','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',20,1),(14,12,'asdfasdf','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis',2,1),(15,13,'asdfasdf','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,',5,0);
/*!40000 ALTER TABLE `offer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offer_skill`
--

DROP TABLE IF EXISTS `offer_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offer_skill` (
  `offer_id` int unsigned NOT NULL,
  `skill_id` bigint unsigned NOT NULL,
  `offer_skill_is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  KEY `fk_offer_1` (`offer_id`),
  KEY `fk_skill_1` (`skill_id`),
  CONSTRAINT `fk_offer_1` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`offer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_1` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offer_skill`
--

LOCK TABLES `offer_skill` WRITE;
/*!40000 ALTER TABLE `offer_skill` DISABLE KEYS */;
INSERT INTO `offer_skill` VALUES (2,18,0),(2,17,0),(2,16,0),(2,15,0),(3,23,0),(3,24,0),(3,25,0),(3,26,0),(4,43,0),(4,28,0),(4,30,0),(4,44,0),(5,34,0),(5,33,0),(5,45,0),(5,46,0),(6,35,0),(6,47,0),(6,37,0),(6,38,0),(8,49,0),(8,18,0),(8,50,0),(8,17,0),(1,4,0),(1,1,0),(1,2,0),(1,3,0),(9,51,0),(9,52,0),(9,53,0),(9,19,0),(10,54,0),(10,55,0),(10,56,0),(10,57,0),(11,58,0),(11,1,0),(11,59,0),(11,60,0),(13,75,1),(13,76,1),(13,77,1),(7,39,0),(7,42,0),(7,40,0),(7,48,0),(14,69,1),(15,80,0),(15,81,0);
/*!40000 ALTER TABLE `offer_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `project_id` int unsigned NOT NULL AUTO_INCREMENT,
  `project_title` varchar(255) NOT NULL,
  `project_city` varchar(90) DEFAULT NULL,
  `project_country` varchar(100) DEFAULT NULL,
  `project_description` varchar(2000) NOT NULL,
  `project_type` tinyint(1) NOT NULL DEFAULT '0',
  `project_status` tinyint NOT NULL DEFAULT '1',
  `project_outcome` varchar(100) DEFAULT NULL,
  `project_link` varchar(255) DEFAULT NULL,
  `project_created_on` date DEFAULT (curdate()),
  `project_completed_on` date DEFAULT NULL,
  `project_max_member` int unsigned NOT NULL,
  `project_updated_on` date DEFAULT (curdate()),
  `project_is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  `creator_user_id` int unsigned NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `fk_user_1` (`creator_user_id`),
  CONSTRAINT `fk_user_1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Gene Editing for Targeted Cancer Therapy Using CRISPR-Cas9','New York','USA','This project aims to develop novel, highly targeted cancer therapies by utilizing the CRISPR-Cas9 gene-editing technology to modify cancer cells’ DNA in real-time. We focus on developing precision treatments for drug-resistant cancers, identifying genetic mutations, and utilizing CRISPR to remove or modify these mutations. With a strong emphasis on minimizing collateral damage to healthy cells, the project also includes designing delivery systems using nanoparticles for efficient CRISPR implementation in patients.',0,1,NULL,NULL,'2025-02-01',NULL,10,'2025-02-01',0,1),(2,'Nanoparticle-Based Drug Delivery Systems for Targeted Cancer Treatment','Toronto','Canada','The project focuses on designing and optimizing nanoparticles that can deliver chemotherapy drugs directly to cancer cells, thus increasing drug effectiveness while minimizing side effects. The team will explore various nanoparticle formulations, including liposomes, micelles, and gold nanoparticles, evaluating their efficiency in targeting tumor cells and enhancing drug bioavailability. By improving drug release profiles and reducing systemic toxicity, this research aims to create a scalable platform for personalized cancer therapies.',0,1,NULL,NULL,'2025-02-01',NULL,20,'2025-02-01',0,3),(3,'Early Detection of Alzheimer\'s Disease: Imaging and Biomarker Discovery','London','UK','This project aims to develop advanced imaging techniques and identify new biomarkers for the early detection of Alzheimer\'s disease. We focus on exploring novel neuroimaging methods, such as functional MRI and PET scans, to track changes in the brain\'s structure and connectivity before cognitive symptoms manifest. Additionally, through genetic and biochemical analysis, we aim to discover new molecular markers that could allow for earlier, more accurate diagnosis, ultimately enabling the development of treatments that slow disease progression.',0,1,NULL,NULL,'2025-02-01',NULL,35,'2025-02-01',0,6),(4,'Biodiversity Conservation in Tropical Forests: A Climate Change Response Strategy','Melbourne','Australia',' This project investigates the effects of climate change on biodiversity in tropical forests, focusing on how temperature rise and altered rainfall patterns are impacting ecosystem composition. The goal is to develop and implement conservation strategies that safeguard key species and preserve biodiversity. Through extensive fieldwork, ecological modeling, and species monitoring, the project aims to create an integrated conservation plan that prioritizes both biodiversity hotspots and climate resilience, with particular attention to endangered species and ecological restoration.',0,1,NULL,NULL,'2025-02-01',NULL,33,'2025-02-01',0,9),(5,'Developing Sustainable Energy Storage Solutions for Renewable Power Grids','Berlin','Germany','As the world shifts towards renewable energy sources, this project addresses the critical need for reliable energy storage solutions. It focuses on the development of advanced battery technologies to efficiently store solar and wind energy, ensuring a stable power supply when generation fluctuates. Research includes the exploration of lithium-sulfur, solid-state batteries, and other next-generation energy storage systems. The goal is to reduce costs, increase efficiency, and scale up storage capacity to support the transition to sustainable energy infrastructure on a global scale.',0,1,NULL,NULL,'2025-02-01',NULL,50,'2025-02-01',0,10),(6,'Quantum Simulations for Chemical Reactions and Material Design','Mexico City','Mexico','This project uses quantum mechanics and computational simulations to study chemical reactions and material properties at the atomic level. By applying quantum computational techniques, we aim to design new materials with specific properties, such as superconductivity or enhanced catalytic activity, that could revolutionize industries from energy to pharmaceuticals. The project explores the potential of quantum computers to simulate molecular interactions with unprecedented accuracy, enabling the design of next-generation materials for a wide range of applications.',0,1,NULL,NULL,'2025-02-01',NULL,14,'2025-02-01',0,11),(7,'AI-Powered Predictive Models for Early Disease Diagnosis','San Francisco','USA','This project develops machine learning algorithms to create predictive models for early diagnosis of chronic diseases such as diabetes, heart disease, and cancer. By analyzing electronic health records, genetic data, and lifestyle factors, we aim to identify patterns that predict disease onset before symptoms appear. The project also focuses on refining AI techniques to provide accurate risk assessments and recommend personalized treatment plans, ultimately improving patient outcomes and reducing healthcare costs.',0,1,NULL,NULL,'2025-02-01',NULL,30,'2025-02-01',0,12),(8,'Mitigating Ocean Pollution: Innovative Solutions for Marine Conservation','Paris','France','The project focuses on developing and implementing sustainable practices to reduce ocean pollution, particularly plastic waste. The team will investigate the sources and environmental impacts of marine pollution, working closely with conservationists to design innovative solutions such as biodegradable alternatives, waste management technologies, and ocean cleanup strategies. By collaborating with global environmental agencies, the goal is to significantly reduce pollution and restore marine ecosystems to their natural state, ensuring the health and survival of endangered marine species',0,1,NULL,NULL,'2025-02-01',NULL,19,'2025-02-01',0,2),(9,'Resilient Crops: Engineering Plants for Stress Tolerance in Harsh Environments','Cádiz','Spain','In response to climate change, this project focuses on genetically modifying crops to enhance their resilience to environmental stressors, including extreme temperatures, drought, and soil salinity. Using plant enzymes as biomarkers, we aim to create genetically engineered crops that can thrive under harsh conditions, contributing to food security. Research will involve using CRISPR-Cas9 and other gene-editing tools to optimize plant defense mechanisms and metabolic processes, while ensuring that the crops are safe for consumption and environment-friendly.',1,1,NULL,NULL,'2025-02-01',NULL,9,'2025-02-01',0,4),(11,'Lorem','Ipsum','lorem','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',0,1,NULL,NULL,'2025-02-02',NULL,40,'2025-02-02',1,12),(12,'lorem ipsum','fdas','asdf','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibuLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibuLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',0,1,NULL,NULL,'2025-02-02',NULL,50,'2025-02-02',1,12),(13,'asdfasdf','asdfasdf','asdfasdf','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',0,1,NULL,NULL,'2025-02-03',NULL,50,'2025-02-03',0,12);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_skill`
--

DROP TABLE IF EXISTS `project_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_skill` (
  `project_id` int unsigned NOT NULL,
  `skill_id` bigint unsigned NOT NULL,
  `project_skill_is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  KEY `fk_project_3` (`project_id`),
  KEY `fk_skill_2` (`skill_id`),
  CONSTRAINT `fk_project_3` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_skill`
--

LOCK TABLES `project_skill` WRITE;
/*!40000 ALTER TABLE `project_skill` DISABLE KEYS */;
INSERT INTO `project_skill` VALUES (1,4,0),(1,1,0),(1,2,0),(1,3,0),(3,23,0),(3,24,0),(3,25,0),(3,26,0),(2,18,0),(2,17,0),(2,16,0),(2,15,0),(4,27,0),(4,28,0),(4,30,0),(4,29,0),(5,31,0),(5,32,0),(5,33,0),(5,34,0),(6,35,0),(6,36,0),(6,37,0),(6,38,0),(7,39,0),(7,40,0),(7,41,0),(7,42,0),(8,9,0),(8,10,0),(8,11,0),(8,12,0),(9,19,0),(9,22,0),(9,21,0),(9,20,0),(11,69,1),(11,74,1),(11,73,1),(12,69,1),(12,69,1),(13,78,0),(13,79,0),(13,77,0);
/*!40000 ALTER TABLE `project_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `request_status` tinyint unsigned NOT NULL DEFAULT '0',
  `request_requested_on` date DEFAULT (curdate()),
  `user_id` int unsigned NOT NULL,
  `project_id` int unsigned NOT NULL,
  `offer_id` int unsigned DEFAULT NULL,
  KEY `fk_user_7` (`user_id`),
  KEY `fk_project_4` (`project_id`),
  KEY `fk_offer_2` (`offer_id`),
  CONSTRAINT `fk_offer_2` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`offer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_4` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_7` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,'2025-02-01',2,1,1),(1,'2025-02-01',3,1,1),(2,'2025-02-02',12,8,10),(2,'2025-02-03',29,7,7);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `user_id` int unsigned NOT NULL,
  `reviewed_user_id` int unsigned NOT NULL,
  `review_content` text,
  `review_created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `review_is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `review_rate` tinyint NOT NULL,
  UNIQUE KEY `unique_reviewer_reviewed` (`user_id`,`reviewed_user_id`),
  KEY `fk_user_5` (`reviewed_user_id`),
  CONSTRAINT `fk_user_4` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_5` FOREIGN KEY (`reviewed_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_review_rate` CHECK ((`review_rate` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,2,'I\'ve learned so much working alongside Jessica White. Their meticulous attention to detail and passion for discovery set a high standard. They made every research session an inspiring experience.','2025-02-02 18:43:56',0,4),(1,3,'Working with Bob Smith was truly motivating. They have an amazing ability to simplify complex concepts and encourage creativity in the team. A brilliant scientist and a supportive colleague.','2025-02-02 18:45:21',0,4),(1,4,'Iván Piña consistently fosters a collaborative atmosphere. Their ability to lead, mentor, and encourage ideas made working together incredibly rewarding. An exceptional scientist with great vision.','2025-02-02 18:46:23',0,5),(1,10,'Collaborating with Fiona Davis was an invaluable experience. Their deep expertise combined with their openness to new ideas created an environment where innovation thrived. Truly inspiring.','2025-02-02 18:47:06',0,5),(1,12,'Hanna Clark\'s dedication to finding solutions is unmatched. Their ability to think outside the box consistently inspired our team. A pleasure to collaborate with such a skilled and passionate scientist.','2025-02-02 18:36:23',0,5),(2,1,'Laura Palmer is a visionary in their field. Working with them was an educational experience. Their insight, combined with their ability to bring people together, made every project enjoyable.','2025-02-02 18:48:26',0,4),(2,3,'It was a privilege to work with Bob Smith. Their scientific rigor and enthusiasm for research are contagious. They always bring out the best in their colleagues, making teamwork a joy.','2025-02-02 18:49:02',0,5),(2,6,'Working alongside Diana Taylor was a fantastic learning experience. Their passion for discovery and commitment to pushing boundaries made every collaboration meaningful and impactful.','2025-02-02 18:49:34',0,5),(2,9,'Working with Ethan Brown was a fantastic experience. Their innovative approach to research and commitment to excellence made every project more exciting. A true collaborator and a brilliant mind!','2025-02-02 18:50:05',0,5),(2,10,'Dr. Fiona Davis\'s dedication to finding solutions is unmatched. Their ability to think outside the box consistently inspired our team. A pleasure to collaborate with such a skilled and passionate scientist.','2025-02-02 18:50:40',0,4),(2,12,'Collaborating with Hanna Clark was always rewarding. They bring both depth of knowledge and fresh perspectives to every project. A true leader in the field and an even better teammate.','2025-02-02 18:51:19',0,5),(3,1,'I\'ve learned so much working alongside Laura Palmer. Their meticulous attention to detail and passion for discovery set a high standard. They made every research session an inspiring experience.','2025-02-02 18:53:44',0,5),(3,4,'Working with Iván Piña was truly motivating. They have an amazing ability to simplify complex concepts and encourage creativity in the team. A brilliant scientist and a supportive colleague.','2025-02-02 18:54:19',0,4),(3,9,'Ethan Brown consistently fosters a collaborative atmosphere. Their ability to lead, mentor, and encourage ideas made working together incredibly rewarding. An exceptional scientist with great vision.','2025-02-02 18:54:50',0,5),(3,10,'Working with Fiona Davis was a fantastic experience. Their innovative approach to research and commitment to excellence made every project more exciting. A true collaborator and a brilliant mind!','2025-02-02 18:55:30',0,5),(4,1,'Working with Laura Palmer was a fantastic experience. Their innovative approach to research and commitment to excellence made every project more exciting. A true collaborator and a brilliant mind!','2025-02-02 19:01:14',0,4),(4,2,'Working with Jessica White was a fantastic experience. Their innovative approach to research and commitment to excellence made every project more exciting. A true collaborator and a brilliant mind!','2025-02-02 19:05:39',0,5),(4,3,'Working with Bob Smith was a fantastic experience. Their innovative approach to research and commitment to excellence made every project more exciting. A true collaborator and a brilliant mind!','2025-02-02 19:06:14',0,5),(4,6,'Working with Diana Taylor was a fantastic experience. Their innovative approach to research and commitment to excellence made every project more exciting. A true collaborator and a brilliant mind!','2025-02-02 19:06:43',0,5),(4,9,'Ethan Brown\'s dedication to finding solutions is unmatched. Their ability to think outside the box consistently inspired our team. A pleasure to collaborate with such a skilled and passionate scientist.','2025-02-02 19:08:01',0,5),(4,10,'Working with Fiona Davis was truly motivating. They have an amazing ability to simplify complex concepts and encourage creativity in the team. A brilliant scientist and a supportive colleague.','2025-02-02 19:08:48',0,5),(4,11,'Working with George Lopez was a fantastic experience. Their innovative approach to research and commitment to excellence made every project more exciting. A true collaborator and a brilliant mind!','2025-02-02 19:04:52',0,5),(4,12,'Working with Hanna Clark was a fantastic experience. Their innovative approach to research and commitment to excellence made every project more exciting. A true collaborator and a brilliant mind!','2025-02-02 18:29:17',0,5),(6,2,'Working with Jessica White was truly motivating. They have an amazing ability to simplify complex concepts and encourage creativity in the team. A brilliant scientist and a supportive colleague.','2025-02-02 19:10:11',0,5),(6,3,'Collaborating with Bob Smith was an invaluable experience. Their deep expertise combined with their openness to new ideas created an environment where innovation thrived. Truly inspiring.','2025-02-02 19:10:57',0,5),(6,4,'Collaborating with Iván Piña was an invaluable experience. Their deep expertise combined with their openness to new ideas created an environment where innovation thrived. Truly inspiring.','2025-02-02 19:11:44',0,5),(6,9,'Collaborating with Ethan Brown was an invaluable experience. Their deep expertise combined with their openness to new ideas created an environment where innovation thrived. Truly inspiring.','2025-02-02 19:12:25',0,5),(6,10,'Fiona Davis is a visionary in their field. Working with them was an educational experience. Their insight, combined with their ability to bring people together, made every project enjoyable.','2025-02-02 19:14:31',0,5),(6,11,'George Lopez is a visionary in their field. Working with them was an educational experience. Their insight, combined with their ability to bring people together, made every project enjoyable.','2025-02-02 19:15:20',0,5),(9,2,'Jessica White is a visionary in their field. Working with them was an educational experience. Their insight, combined with their ability to bring people together, made every project enjoyable.','2025-02-02 19:16:45',0,5),(9,3,'Bob Smith is a visionary in their field. Working with them was an educational experience. Their insight, combined with their ability to bring people together, made every project enjoyable.','2025-02-02 19:17:08',0,5),(9,4,'Iván Piña is a visionary in their field. Working with them was an educational experience. Their insight, combined with their ability to bring people together, made every project enjoyable.','2025-02-02 19:17:44',0,5),(9,6,'Diana Taylor is a visionary in their field. Working with them was an educational experience. Their insight, combined with their ability to bring people together, made every project enjoyable.','2025-02-02 19:18:10',0,5),(9,10,'It was a privilege to work with Dr. [Name]. Their scientific rigor and enthusiasm for research are contagious. They always bring out the best in their colleagues, making teamwork a joy.','2025-02-02 19:19:37',0,5),(12,1,'Collaborating with Laura Palmer was always rewarding. They bring both depth of knowledge and fresh perspectives to every project. A true leader in the field and an even better teammate.','2025-02-02 18:41:08',0,4);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `skill_id` bigint unsigned NOT NULL,
  `skill_name` varchar(50) NOT NULL,
  PRIMARY KEY (`skill_id`),
  UNIQUE KEY `skill_name` (`skill_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (66,'aawe'),(80,'adsgdfg'),(71,'aenean'),(41,'AI modeling'),(25,'Alzheimers biomarkers'),(52,'Alzheimers research'),(6,'asaa'),(78,'asd'),(69,'asdf'),(74,'asdfa'),(77,'asdfasd'),(63,'asdfasdf'),(75,'asdfsadf'),(68,'asdg'),(76,'aser'),(79,'asetaewt'),(67,'assfads'),(34,'battery technology'),(62,'being a horrible orcs'),(19,'Biochemistry'),(27,'Biodiversity conservation'),(43,'Biodiversity monitoring'),(51,'Biomarker discovery'),(18,'biomedical engineering'),(4,'cancer genomics'),(17,'cancer therapy'),(28,'climate change adaptation'),(24,'cognitive assessment'),(47,'computational chemistry'),(36,'computational physics'),(12,'conservation strategies'),(1,'CRISPR'),(39,'Data science'),(16,'drug delivery'),(50,'drug delivery systems'),(30,'ecological modeling'),(57,'ecological restoration'),(33,'electrochemistry'),(32,'energy storage'),(54,'Environmental science'),(60,'environmental stress resilience'),(22,'environmental stress response'),(21,'enzyme kinetics'),(73,'ererwa'),(14,'fffffff'),(81,'fgj'),(29,'field research'),(2,'gene editing'),(53,'genetic analysis'),(58,'Genetic engineering'),(42,'healthcare analytics'),(61,'kill'),(40,'machine learning'),(9,'Marine biology'),(55,'marine conservation'),(72,'masa'),(46,'materials science'),(3,'molecular cloning'),(70,'mollis'),(15,'Nanoparticles'),(49,'Nanotechnology'),(23,'Neuroimaging'),(26,'neuroscience'),(10,'oceanography'),(59,'plant breeding'),(20,'plant genetics'),(11,'pollution assessment'),(56,'pollution management'),(48,'predictive modeling'),(35,'Quantum computing'),(38,'quantum mechanics'),(31,'Renewable energy'),(45,'renewable energy systems'),(65,'rrre'),(5,'sdf'),(7,'sdfffff'),(37,'simulation modeling'),(44,'species conservation'),(64,'ssss'),(13,'ssssssss'),(8,'sssssssssssss');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) DEFAULT NULL,
  `user_lastname` varchar(50) DEFAULT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_country` varchar(100) DEFAULT NULL,
  `user_city` varchar(100) DEFAULT NULL,
  `user_description` varchar(500) DEFAULT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_avatar` varchar(250) DEFAULT NULL,
  `user_type` tinyint unsigned DEFAULT '2',
  `user_proficiency` varchar(50) DEFAULT NULL,
  `user_current_lab` varchar(100) DEFAULT NULL,
  `user_current_boss` varchar(100) DEFAULT NULL,
  `user_is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `user_is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Laura','Palmer','laura@laura.com','EEUU','Twin Peaks','Molecular biologist with a focus on cancer research, particularly using CRISPR gene editing technologies. Experienced in exploring genetic pathways involved in tumor suppression and developing targeted therapies for drug-resistant cancers. Passionate about translating laboratory findings into clinical applications.','$2b$10$KvzSNlpa.JELdhtXP3uwz.D9s2r7RERliinBj7oSkxZSLYRMObWoi','Id-1738431874554-1731891028650-hu2.JPG',2,'PhD','Cancer Research Institute','Dr. Emily Thompson',1,0),(2,'Jessica','White','jessica@jessica.com','France','Paris','Marine biologist dedicated to studying the effects of ocean pollution on marine life. Her research explores the long-term impact of plastic waste and chemicals on ocean ecosystems, with a focus on endangered species and coral reefs. She aims to develop sustainable practices for marine conservation.','$2b$10$fE2Qp5YZryYDKZnAnTWClu32/5zIdjevQlhEpCV8jPp8YaiWbyz3m','Id-1738432289277-1732476037022-h1.JPG',2,'Doctorant','Marine Biology Research Unit','Dr. Pierre Dubois',1,0),(3,'Bob','Smith','bob@bob.com','Canada','Toronto','Nanotechnology researcher focusing on the development of innovative drug delivery systems using nanoparticles. His work aims to enhance the bioavailability of therapeutics and reduce side effects in cancer treatment by targeting drugs directly to the tumor cells.','$2b$10$f/uNYHfeD5k8PfbicOmRMew3GBJ/c3dVHBJy7ZiSFYr.nRcl8hYm2','Id-1738432859885-1731890833521-hu6.JPG',2,'PostDoc','Nanotechnology Research Lab','Dr. William Grant',1,0),(4,'Iván','Piña','ivan@ivan.com','Spain','Cádiz','Biochemist studying the impact of environmental stressors on plant enzymes, particularly focusing on the adaptation mechanisms that allow plants to survive under extreme environmental conditions like drought and pollution. His research aims to create genetically modified crops that are more resilient and sustainable.','$2b$10$Q9twWUnaga6V8TSqGoDnJ.ERiDlppQJBihGetr3VU79/4pSH7G54G','Id-1738433028990-1731887067515-hu4.JPG',2,'PhD','Plant Biochemistry Laboratory','Dr. Laura Rodriguez',1,0),(6,'Diana','Taylor','diana@diana.com','UK','London','Neuroscientist specializing in Alzheimer\'s disease and cognitive decline. Her research aims to identify early biomarkers of Alzheimer\'s and develop brain-imaging techniques to detect subtle changes before symptoms appear. She is also working on developing neuroprotective treatments that could slow disease progression.','$2b$10$vN8l7DTe0ScgtnrPy/BTSubOyFIPL.cRztdfvM8X7mlXFGarCjRES','Id-1738433246357-1731890697369-h15.jpg',2,'Doctorant','Cognitive Neuroscience Lab','Prof. John Harper',1,0),(9,'Ethan','Brown','ethan@ethan.com','Australia','Melbourne','Ecologist researching biodiversity conservation in the face of climate change. Focuses on ecosystem resilience, particularly in tropical forests and coastal regions. His research aims to identify conservation strategies that protect biodiversity and mitigate the impacts of climate change on vulnerable species.','$2b$10$sIFvEseloGj3ZP7T6ArjuucFPBoCpykHg9dHXyBwohM2dTnVVX40e','Id-1738521362956-1731963375174-h12.JPG',2,'PhD','Ecology and Biodiversity Lab','Dr. Sarah White',1,0),(10,'Fiona','Davis','fiona@fiona.com','Germany','Berlin','Chemical engineer developing sustainable energy solutions, focusing on improving renewable energy storage systems. Her research is focused on developing novel battery technologies that can store renewable energy more efficiently, supporting the transition to cleaner energy sources.','$2b$10$YCAziE7BLXvRiQPX/Kf48OvaOn8JfWg8IAqnIxidYReiaofGctf3y','Id-1738433928397-1731890927945-h10.JPG',2,'Lab Worker','Sustainable Energy Innovations','Prof. Klaus Müller',1,0),(11,'George','Lopez','george@george.com','Mexico','Mexico City','Quantum physicist with a focus on quantum computation and simulation. His research explores the theoretical and practical applications of quantum mechanics, specifically in the development of quantum computers and simulating quantum systems to solve complex problems in chemistry and physics.','$2b$10$srliV8TR4Hqwznjar8oDw.vD.xVBZzmO7YN/093XVzTVgsJrMekgS','Id-1738434087311-1732046172443-h13.jpg',2,'PostDoc','Quantum Physics Research Center','Dr. Luis Fernández',1,0),(12,'Hanna','Clark','hanna@hanna.com','USA','San Francisco','Data scientist specializing in AI and machine learning applications for healthcare. Her work focuses on building predictive models for disease diagnostics, patient risk assessment, and personalized treatment plans using large-scale medical data and deep learning techniques.','$2b$10$54M83lXqMzEspx/IKn73f.BObzD1yaPceI4Xx5Uv8jr2QsV8DHmAy','Id-1738576405096-1731963776996-h9.JPG',2,'PostDoc','AI for Health Research Lab','Dr. Robert King',1,0),(29,'sssssssss','ssssssss','aguavivalidia@gmail.com','ssssssss','ssssssss','oceanographyoceanographyoceanography','$2b$10$Sbm/I39grFr3iRkSAr2OGO.2vivNIYNvAe7a9r1KcXuj6KH8AtpAy','Id-1738576974684-keiCol.jpg',2,NULL,NULL,NULL,1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_field`
--

DROP TABLE IF EXISTS `user_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_field` (
  `user_id` int unsigned NOT NULL,
  `field_id` int unsigned NOT NULL,
  `user_field_is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  KEY `fk_user_6` (`user_id`),
  KEY `fk_field_1` (`field_id`),
  CONSTRAINT `fk_field_1` FOREIGN KEY (`field_id`) REFERENCES `field` (`field_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_6` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_field`
--

LOCK TABLES `user_field` WRITE;
/*!40000 ALTER TABLE `user_field` DISABLE KEYS */;
INSERT INTO `user_field` VALUES (1,1,0),(1,3,0),(1,2,0),(2,6,0),(2,5,0),(2,4,0),(3,1,0),(3,8,0),(3,7,0),(4,10,0),(4,5,0),(4,9,0),(6,12,0),(6,13,0),(6,11,0),(10,17,0),(10,16,0),(10,18,0),(11,21,0),(11,19,0),(11,20,0),(9,15,0),(9,14,0),(9,5,0),(12,22,0),(12,23,0),(12,24,0);
/*!40000 ALTER TABLE `user_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_project`
--

DROP TABLE IF EXISTS `user_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_project` (
  `user_id` int unsigned NOT NULL,
  `project_id` int unsigned NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  KEY `fk_user_2` (`user_id`),
  KEY `fk_project_1` (`project_id`),
  CONSTRAINT `fk_project_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_project`
--

LOCK TABLES `user_project` WRITE;
/*!40000 ALTER TABLE `user_project` DISABLE KEYS */;
INSERT INTO `user_project` VALUES (1,1,2),(2,1,3),(2,1,3),(2,1,2),(3,1,2),(3,2,2),(6,3,2),(9,4,2),(10,5,2),(11,6,2),(12,7,2),(2,8,2),(4,9,2),(4,7,2),(12,9,2),(1,4,2),(12,1,2),(12,1,2),(1,6,2),(1,5,2),(2,2,2),(2,5,2),(2,4,2),(3,6,2),(3,3,2),(4,6,2),(4,5,2),(4,4,2),(6,5,2),(6,1,2),(9,3,2),(9,7,2),(10,8,2),(10,4,2),(10,6,2),(11,5,2),(11,4,2),(12,6,2),(12,11,3),(12,3,2),(12,12,3),(12,8,3),(12,8,3),(12,8,1),(12,13,2),(29,7,3),(29,7,3),(29,7,1);
/*!40000 ALTER TABLE `user_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_skill`
--

DROP TABLE IF EXISTS `user_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_skill` (
  `user_id` int unsigned NOT NULL,
  `skill_id` bigint unsigned NOT NULL,
  `user_skill_is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  KEY `fk_user_3` (`user_id`),
  KEY `fk_skill_3` (`skill_id`),
  CONSTRAINT `fk_skill_3` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_skill`
--

LOCK TABLES `user_skill` WRITE;
/*!40000 ALTER TABLE `user_skill` DISABLE KEYS */;
INSERT INTO `user_skill` VALUES (1,4,0),(1,1,0),(1,2,0),(1,3,0),(2,12,0),(2,9,0),(2,10,0),(2,11,0),(3,18,0),(3,17,0),(3,16,0),(3,15,0),(4,19,0),(4,22,0),(4,21,0),(4,20,0),(6,25,0),(6,24,0),(6,23,0),(6,26,0),(10,34,0),(10,33,0),(10,32,0),(10,31,0),(11,36,0),(11,35,0),(11,38,0),(11,37,0),(9,27,0),(9,28,0),(9,30,0),(9,29,0),(12,41,0),(12,39,0),(12,42,0),(12,40,0);
/*!40000 ALTER TABLE `user_skill` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-03 13:34:49


<<<<<<< HEAD
CREATE TABLE project (
	project_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    project_title VARCHAR (255) NOT NULL,
    project_city VARCHAR (90),
    project_country VARCHAR (100),
    project_description VARCHAR (2000) NOT NULL,
    project_type BOOLEAN NOT NULL DEFAULT 0, -- 0 = public / 1 = private
	project_status TINYINT NOT NULL DEFAULT 1, -- 1 = active / 2 = completed / 3 = paused
    project_outcome VARCHAR (100), -- manuscript, patent, etc.
    project_link VARCHAR(255),   -- link to external page where the outcome is stored
    project_created_on DATE DEFAULT (CURRENT_DATE),
    project_completed_on DATE,
    project_max_member INT UNSIGNED NOT NULL,
    project_updated_on DATE DEFAULT (CURRENT_DATE),
    project_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    creator_user_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_user_1 FOREIGN KEY (creator_user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE user_project (
	user_id INT UNSIGNED NOT NULL,
    project_id INT UNSIGNED NOT NULL,
	status TINYINT UNSIGNED NOT NULL DEFAULT 1, -- 1 = to be confirmed / 2 = member / 3 = out of project / 4= interested in
	CONSTRAINT fk_user_2 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_project_1 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE skill (
	skill_id BIGINT UNSIGNED PRIMARY KEY,
    skill_name VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE offer (
	offer_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    project_id INT UNSIGNED NOT NULL,
    offer_title VARCHAR (255) NOT NULL,
    offer_description VARCHAR (255) NOT NULL,
    number_of_position SMALLINT UNSIGNED NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_project_2 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE offer_skill (
	offer_id INT UNSIGNED NOT NULL,
	skill_id BIGINT UNSIGNED NOT NULL,
	offer_skill_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_offer_1 FOREIGN KEY (offer_id)
		REFERENCES offer(offer_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_skill_1 FOREIGN KEY (skill_id)
		REFERENCES skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE project_skill (
	project_id INT UNSIGNED NOT NULL,
	skill_id BIGINT UNSIGNED NOT NULL,
     project_skill_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_project_3 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_skill_2 FOREIGN KEY (skill_id)
		REFERENCES skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE user_skill (
	user_id INT UNSIGNED NOT NULL,
	skill_id BIGINT UNSIGNED NOT NULL,
    user_skill_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT fk_user_3 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_skill_3 FOREIGN KEY (skill_id)
		REFERENCES skill(skill_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE review (
	user_id INT UNSIGNED NOT NULL,
    reviewed_user_id  INT UNSIGNED NOT NULL,
    review_content TEXT,
    review_created_on DATETIME DEFAULT CURRENT_TIMESTAMP, 
    review_is_deleted BOOLEAN NOT NULL DEFAULT 0,
    review_rate tinyint(5) NOT NULL, 
    CONSTRAINT chk_review_rate CHECK (review_rate BETWEEN 1 AND 5),
    CONSTRAINT unique_reviewer_reviewed UNIQUE (user_id, reviewed_user_id),
    CONSTRAINT fk_user_4 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_5 FOREIGN KEY (reviewed_user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


 CREATE TABLE request (
 request_status TINYINT(2) UNSIGNED NOT NULL DEFAULT 0,  -- 0 pending / 1 accepted / 2 declined,
 request_requested_on DATE DEFAULT (CURRENT_DATE),
 user_id INT UNSIGNED NOT NULL,
 project_id INT UNSIGNED NOT NULL,
 offer_id INT UNSIGNED,
  CONSTRAINT fk_user_7 FOREIGN KEY (user_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_project_4 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_offer_2 FOREIGN KEY (offer_id)
		REFERENCES offer(offer_id) ON DELETE CASCADE ON UPDATE CASCADE
 );


CREATE TABLE message (
	message_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    message_content VARCHAR (255) NOT NULL,
    message_date_time DATETIME DEFAULT CURRENT_TIMESTAMP, 
    message_is_read BOOLEAN NOT NULL DEFAULT 0,
    sender_id INT UNSIGNED NOT NULL,
    receiver_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_user_8 FOREIGN KEY (sender_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_user_9 FOREIGN KEY (receiver_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);



 CREATE TABLE invitation (
 invitation_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
 invitation_status TINYINT(2) UNSIGNED NOT NULL DEFAULT 0,  -- 0 pending / 1 accepted / 2 declined,
 invitation_send_on DATE DEFAULT (CURRENT_DATE),
 sender_id INT UNSIGNED NOT NULL,
 receiver_id INT UNSIGNED NOT NULL,
 project_id INT UNSIGNED NOT NULL,
 offer_id INT UNSIGNED,
  CONSTRAINT fk_user_10 FOREIGN KEY (sender_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_user_11 FOREIGN KEY (receiver_id)
		REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_project_5 FOREIGN KEY (project_id)
		REFERENCES project(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_offer_3 FOREIGN KEY (offer_id)
		REFERENCES offer(offer_id) ON DELETE CASCADE ON UPDATE CASCADE
 );


CREATE TABLE notification (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    type INT NOT NULL, 
    -- sender_user_id INT UNSIGNED,
    content VARCHAR(255) NOT NULL,
    is_read TINYINT(1) DEFAULT 0, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    -- project_id INT UNSIGNED NULL, 
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);



 select * from user;
 select * from user_skill;
 select * from user_field;
 SELECT * FROM project_skill;
 SELECT * FROM project;
 SELECT * FROM skill;
 SELECT * FROM offer;
 SELECT * FROM user_project;
 SELECT * FROM project_skill;
 SELECT * FROM offer_skill;
 SELECT * FROM request;
 SELECT * FROM message;
 SELECT * FROM invitation;
 SELECT * FROM review;
 SELECT * FROM notification;
 
 


-- 123456sS$

