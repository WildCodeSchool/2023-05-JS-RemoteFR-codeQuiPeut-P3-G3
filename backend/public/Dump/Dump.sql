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
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `idcard` int NOT NULL AUTO_INCREMENT,
  `jdrName` varchar(100) NOT NULL,
  `jdrNameFont` varchar(45) NOT NULL,
  `jdrNameColor` varchar(45) NOT NULL,
  `jdrNameFontSize` int NOT NULL,
  `jdrImg1` varchar(150) NOT NULL,
  `jdrImg2` varchar(100) NOT NULL,
  `jdrText` varchar(80) NOT NULL,
  `textColor` varchar(45) NOT NULL,
  `textFont` varchar(150) NOT NULL,
  `jdrBgColor1` varchar(45) NOT NULL,
  `jdrBgColor2` varchar(45) NOT NULL,
  `buttonColor` varchar(150) NOT NULL,
  `buttonFont` varchar(150) NOT NULL,
  `jdrCategory` varchar(45) NOT NULL,
  `jdrPublic` varchar(45) NOT NULL,
  `storyId` int DEFAULT NULL,
  PRIMARY KEY (`idcard`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (26,'TO DIE IN THE WEST','Inika','#ffffff',24,'chapo-removebg-preview_1695371771017.png','saloon-removebg-preview_1695371807607.png','EXPLORE THE WILDERNESS','#514532','Inika','#514532','#ddb78b','#62503a','Inika','Western','12 to 18 yrs old',166),(27,'LE DECLIN DES AMES','Cinzel Decorative','#f3ad44',30,'logo_merlin_1695372092169.png','Calque2_1695372104680.png','\"Your choices shape your destiny, explore the decline and become a legend.\"','#ffffff','Inika','#44114d','#f3ad44','#44114d','Inika','Fantastic','6 to 12 yrs old',167),(28,'CTHULHU MAY DIE','Inika','#161a16',28,'pngaaa 18(1)_1695216543388_1695372408916.png','Group_133-removebg-preview_1695372345849.png','Will you dare to face the Cthulhu in this role-playing game?','#ffffff','Inika','#123721','#121313','#161a16','Inika','Horror','18 to 101 yrs old',168),(29,'MALEFICE','Inika','#a09494',30,'imgmalefice_1695279161963_1695373060841.png','grave_1694612270314_1695373075126.png','\"Will you dare to unravel the enchanting mysteries of \'Malefices\'?\"','#a09494','Inika','#450303','#131111','#5d0707','Inika','Horror','18 to 101 yrs old',169);
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enemies`
--

LOCK TABLES `enemies` WRITE;
/*!40000 ALTER TABLE `enemies` DISABLE KEYS */;
/*!40000 ALTER TABLE `enemies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `gallery_ibfk_1` (`user_id`),
  CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (16,NULL,'chapo-removebg-preview_1695371771017.png','2023-09-22 08:36:11'),(17,NULL,'saloon_1695371787080.jpeg','2023-09-22 08:36:27'),(18,NULL,'saloon-removebg-preview_1695371807607.png','2023-09-22 08:36:47'),(19,NULL,'logo_merlin_1695372092169.png','2023-09-22 08:41:32'),(20,NULL,'Calque2_1695372104680.png','2023-09-22 08:41:44'),(21,NULL,'Group_133-removebg-preview_1695372345849.png','2023-09-22 08:45:45'),(22,NULL,'pngaaa 18(1)_1695216543388_1695372408916.png','2023-09-22 08:46:48'),(23,NULL,'imgmalefice_1695279161963_1695373060841.png','2023-09-22 08:57:40'),(24,NULL,'grave_1694612270314_1695373075126.png','2023-09-22 08:57:55'),(25,NULL,'kisspng-cowboy-clip-art-camera-man-5aa5ebb84ee2d4_1695373496741.jpeg','2023-09-22 09:04:56'),(26,NULL,'kisspng-cowboy-clip-art-camera-man-5aa5ebb84ee2d4_1695373496741_1695373562596.jpeg','2023-09-22 09:06:02'),(27,NULL,'kisspng-cowboy-clip-art-camera-man-5aa5ebb84ee2d4_1695373631821.png','2023-09-22 09:07:11'),(28,NULL,'610-AsQRa4L_1695373748700.png','2023-09-22 09:09:08'),(29,NULL,'far-west-salon-chateau-eau_1284-32461_1695373818265.jpeg','2023-09-22 09:10:18'),(30,NULL,'LE SALOUNNES_1695375453526.avif','2023-09-22 09:37:33'),(31,NULL,'paysage-foret-desertique-vide-scene-heure-du-coucher-du-soleil_1308-56793_1695376702953.jpeg','2023-09-22 09:58:22'),(32,NULL,'PONEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY_1695377040628.jpeg','2023-09-22 10:04:00'),(33,NULL,'PONEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-removebg-preview_1695377073636.png','2023-09-22 10:04:33'),(34,NULL,'snake-01_1695377551476.png','2023-09-22 10:12:31');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_credit_item`
--

DROP TABLE IF EXISTS `shop_credit_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_credit_item` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `price` int unsigned NOT NULL,
  `items` varchar(100) NOT NULL,
  `credit_quantity` int unsigned DEFAULT NULL,
  `discount` int unsigned DEFAULT NULL,
  `best_seller` tinyint(1) DEFAULT '0',
  `subscribe` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_credit_item`
--

LOCK TABLES `shop_credit_item` WRITE;
/*!40000 ALTER TABLE `shop_credit_item` DISABLE KEYS */;
INSERT INTO `shop_credit_item` VALUES (1,5,'credits',100,NULL,0,0),(2,25,'crédits',1000,50,1,0),(3,20,'crédits',500,20,0,0),(4,5,'/ months',NULL,0,0,1);
/*!40000 ALTER TABLE `shop_credit_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_card_item`
--

DROP TABLE IF EXISTS `shopping_card_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_card_item` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `shop_credit_item_id` int unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shop_credit_item_id` (`shop_credit_item_id`),
  CONSTRAINT `shopping_card_item_ibfk_1` FOREIGN KEY (`shop_credit_item_id`) REFERENCES `shop_credit_item` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_card_item`
--

LOCK TABLES `shopping_card_item` WRITE;
/*!40000 ALTER TABLE `shopping_card_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_card_item` ENABLE KEYS */;
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
  `hashedPassword` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `pseudo` varchar(45) NOT NULL,
  `coins` int DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `actual_chapter` int DEFAULT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Jean ','Bave','$argon2id$v=19$m=65536,t=5,p=1$j6HilK8NZpjbs3vamsIxIQ$66WDfgLyudktD884/7c0QbHTbU0NKFI/KMp2wSxhpro','nayan.nanouche@gmail.com','JBLEBGDU78',NULL,NULL,NULL,'admin'),(7,'Jean ','Bave','$argon2id$v=19$m=65536,t=5,p=1$ciiilpHp5YdVr2ZgKGaSNA$xgJOtZQkmkDwWxH/2QpGaU82yF9tpV/+Z+EKW3AgQUk','nayan.nanouche@gmail.com','JBLEBGDU78',NULL,NULL,NULL,'admin');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2023-09-29 10:02:39
