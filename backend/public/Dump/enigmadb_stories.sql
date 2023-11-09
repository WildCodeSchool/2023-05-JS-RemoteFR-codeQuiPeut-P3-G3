-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: enigmadb
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `resume` varchar(230) DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` date DEFAULT NULL,
  `number_view` int DEFAULT '0',
  `win_rate` int DEFAULT '0',
  `money_earn` int DEFAULT '0',
  `is_deploy` tinyint NOT NULL,
  `heroes_idheroes` int NOT NULL DEFAULT '0',
  `img_url` varchar(150) DEFAULT NULL,
  `shop_id` int NOT NULL DEFAULT '0',
  `is_complete` tinyint DEFAULT '0',
  `card_idcard` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`heroes_idheroes`,`shop_id`,`card_idcard`),
  KEY `fk_stories_heroes1_idx` (`heroes_idheroes`),
  KEY `fk_stories_shop1_idx` (`shop_id`),
  KEY `fk_stories_card1_idx` (`card_idcard`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
INSERT INTO `stories` VALUES (166,'TO DIE IN THE WEST',NULL,'2023-09-22 08:34:23','2023-09-22',0,0,0,1,0,NULL,0,0,0),(167,'LE DECLIN DES AMES',NULL,'2023-09-22 08:38:26','2023-09-22',0,0,0,0,0,NULL,0,0,0),(168,'CTHULHU MAY DIE',NULL,'2023-09-22 08:43:42','2023-09-22',0,0,0,0,0,NULL,0,0,0),(169,'MALEFICE',NULL,'2023-09-22 08:56:38','2023-09-22',0,0,0,0,0,NULL,0,0,0);
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-29  9:50:42
