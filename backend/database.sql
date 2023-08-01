-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: enigmadb
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `enigmadb`
--

/*!40000 DROP DATABASE IF EXISTS `enigmadb`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `enigmadb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `enigmadb`;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `idchapters` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `text` varchar(5000) NOT NULL,
  `is_battle` tinyint NOT NULL,
  `stories_id` int NOT NULL,
  `stories_heroes_idheroes` int NOT NULL,
  `enemies_enemy_id` int NOT NULL,
  PRIMARY KEY (`idchapters`,`stories_id`,`stories_heroes_idheroes`,`enemies_enemy_id`),
  KEY `fk_chapters_stories1_idx` (`stories_id`,`stories_heroes_idheroes`),
  KEY `fk_chapters_enemies1_idx` (`enemies_enemy_id`),
  CONSTRAINT `fk_chapters_enemies1` FOREIGN KEY (`enemies_enemy_id`) REFERENCES `enemies` (`enemy_id`),
  CONSTRAINT `fk_chapters_stories1` FOREIGN KEY (`stories_id`, `stories_heroes_idheroes`) REFERENCES `stories` (`id`, `heroes_idheroes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choices`
--

DROP TABLE IF EXISTS `choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choices` (
  `idchoices` int NOT NULL AUTO_INCREMENT,
  `button_text` varchar(100) DEFAULT NULL,
  `next_chapter` int DEFAULT NULL,
  PRIMARY KEY (`idchoices`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choices`
--

LOCK TABLES `choices` WRITE;
/*!40000 ALTER TABLE `choices` DISABLE KEYS */;
/*!40000 ALTER TABLE `choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choices_has_chapters`
--

DROP TABLE IF EXISTS `choices_has_chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choices_has_chapters` (
  `choices_idchoices` int NOT NULL,
  `chapters_idchapters` int NOT NULL,
  PRIMARY KEY (`choices_idchoices`,`chapters_idchapters`),
  KEY `fk_choices_has_chapters_chapters1_idx` (`chapters_idchapters`),
  KEY `fk_choices_has_chapters_choices1_idx` (`choices_idchoices`),
  CONSTRAINT `fk_choices_has_chapters_chapters1` FOREIGN KEY (`chapters_idchapters`) REFERENCES `chapters` (`idchapters`),
  CONSTRAINT `fk_choices_has_chapters_choices1` FOREIGN KEY (`choices_idchoices`) REFERENCES `choices` (`idchoices`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choices_has_chapters`
--

LOCK TABLES `choices_has_chapters` WRITE;
/*!40000 ALTER TABLE `choices_has_chapters` DISABLE KEYS */;
/*!40000 ALTER TABLE `choices_has_chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consomables`
--

DROP TABLE IF EXISTS `consomables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consomables` (
  `idconsomables` int NOT NULL,
  `conso_name` varchar(45) NOT NULL,
  `conso_img` varchar(150) NOT NULL,
  `inventory_idinventory` int NOT NULL,
  `inventory_heroes_idheroes` int NOT NULL,
  PRIMARY KEY (`idconsomables`,`inventory_idinventory`,`inventory_heroes_idheroes`),
  KEY `fk_consomables_inventory1_idx` (`inventory_idinventory`,`inventory_heroes_idheroes`),
  CONSTRAINT `fk_consomables_inventory1` FOREIGN KEY (`inventory_idinventory`, `inventory_heroes_idheroes`) REFERENCES `inventory` (`idinventory`, `heroes_idheroes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consomables`
--

LOCK TABLES `consomables` WRITE;
/*!40000 ALTER TABLE `consomables` DISABLE KEYS */;
/*!40000 ALTER TABLE `consomables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enemies`
--

DROP TABLE IF EXISTS `enemies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enemies` (
  `enemy_id` int NOT NULL AUTO_INCREMENT,
  `health` int NOT NULL,
  `resistance` int DEFAULT NULL,
  `strength` int DEFAULT NULL,
  PRIMARY KEY (`enemy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enemies`
--

LOCK TABLES `enemies` WRITE;
/*!40000 ALTER TABLE `enemies` DISABLE KEYS */;
/*!40000 ALTER TABLE `enemies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heroes`
--

DROP TABLE IF EXISTS `heroes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `heroes` (
  `idheroes` int NOT NULL AUTO_INCREMENT,
  `class` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `health` int DEFAULT NULL,
  `max_health` int DEFAULT NULL,
  `money` int DEFAULT NULL,
  `weapon` varchar(45) DEFAULT NULL,
  `strength` int DEFAULT NULL,
  `resistance` int DEFAULT NULL,
  `img_hero` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idheroes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heroes`
--

LOCK TABLES `heroes` WRITE;
/*!40000 ALTER TABLE `heroes` DISABLE KEYS */;
/*!40000 ALTER TABLE `heroes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `idinventory` int NOT NULL AUTO_INCREMENT,
  `heroes_idheroes` int NOT NULL,
  PRIMARY KEY (`idinventory`,`heroes_idheroes`),
  KEY `fk_inventory_heroes1_idx` (`heroes_idheroes`),
  CONSTRAINT `fk_inventory_heroes1` FOREIGN KEY (`heroes_idheroes`) REFERENCES `heroes` (`idheroes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `save`
--

DROP TABLE IF EXISTS `save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `save` (
  `idsave` int NOT NULL AUTO_INCREMENT,
  `save_chapters_id` int NOT NULL,
  `save_users_id` int NOT NULL,
  PRIMARY KEY (`idsave`,`save_chapters_id`,`save_users_id`),
  KEY `fk_save_users_has_chapters1_idx` (`save_chapters_id`,`save_users_id`),
  CONSTRAINT `fk_save_users_has_chapters1` FOREIGN KEY (`save_chapters_id`, `save_users_id`) REFERENCES `users_has_chapters` (`users_id`, `chapters_idchapters`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `save`
--

LOCK TABLES `save` WRITE;
/*!40000 ALTER TABLE `save` DISABLE KEYS */;
/*!40000 ALTER TABLE `save` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `resume` varchar(255) NOT NULL,
  `creation_date` date NOT NULL,
  `last_update` date NOT NULL,
  `number_view` int DEFAULT NULL,
  `win_rate` int DEFAULT NULL,
  `money_earn` int DEFAULT NULL,
  `is_deploy` tinyint DEFAULT NULL,
  `heroes_idheroes` int NOT NULL,
  `img_url` varchar(150) NOT NULL,
  `category` varchar(45) NOT NULL,
  `font_family` varchar(100) DEFAULT NULL,
  `shop_id` int NOT NULL,
  `is_complete` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`heroes_idheroes`,`shop_id`),
  KEY `fk_stories_heroes1_idx` (`heroes_idheroes`),
  KEY `fk_stories_shop1_idx` (`shop_id`),
  CONSTRAINT `fk_stories_heroes1` FOREIGN KEY (`heroes_idheroes`) REFERENCES `heroes` (`idheroes`),
  CONSTRAINT `fk_stories_shop1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `pseudo` varchar(45) NOT NULL,
  `adresse` varchar(150) NOT NULL,
  `coins` int DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `actual_chapter` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_has_chapters`
--

DROP TABLE IF EXISTS `users_has_chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_has_chapters` (
  `users_id` int NOT NULL,
  `chapters_idchapters` int NOT NULL,
  PRIMARY KEY (`users_id`,`chapters_idchapters`),
  KEY `fk_users_has_chapters_chapters1_idx` (`chapters_idchapters`),
  KEY `fk_users_has_chapters_users1_idx` (`users_id`),
  CONSTRAINT `fk_users_has_chapters_chapters1` FOREIGN KEY (`chapters_idchapters`) REFERENCES `chapters` (`idchapters`),
  CONSTRAINT `fk_users_has_chapters_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_chapters`
--

LOCK TABLES `users_has_chapters` WRITE;
/*!40000 ALTER TABLE `users_has_chapters` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_has_chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weapons`
--

DROP TABLE IF EXISTS `weapons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weapons` (
  `iditems` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `buy_price` int DEFAULT NULL,
  `sell_price` int DEFAULT NULL,
  `damage` int DEFAULT NULL,
  `inventory_idinventory` int NOT NULL,
  `inventory_heroes_idheroes` int NOT NULL,
  PRIMARY KEY (`iditems`,`inventory_idinventory`,`inventory_heroes_idheroes`),
  KEY `fk_weapons_inventory1_idx` (`inventory_idinventory`,`inventory_heroes_idheroes`),
  CONSTRAINT `fk_weapons_inventory1` FOREIGN KEY (`inventory_idinventory`, `inventory_heroes_idheroes`) REFERENCES `inventory` (`idinventory`, `heroes_idheroes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weapons`
--

LOCK TABLES `weapons` WRITE;
/*!40000 ALTER TABLE `weapons` DISABLE KEYS */;
/*!40000 ALTER TABLE `weapons` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-01 16:55:31
