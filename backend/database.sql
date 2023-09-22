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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-22  1:44:18



-- ********************* SAUVEGARDE NAYAN ****************************** : 

-- -- MySQL Workbench Forward Engineering

-- SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
-- SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
-- SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -- -----------------------------------------------------
-- -- Schema mydb
-- -- -----------------------------------------------------
-- -- -----------------------------------------------------
-- -- Schema enigmadb
-- -- -----------------------------------------------------

-- -- -----------------------------------------------------
-- -- Schema enigmadb
-- -- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `enigmadb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
-- USE `enigmadb` ;

-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`card`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS enigmadb.card (
--   idcard INT NOT NULL AUTO_INCREMENT,
--   jdrName VARCHAR(100) NOT NULL,
--   jdrNameFont VARCHAR(45) NOT NULL,
--   jdrNameColor VARCHAR(45) NOT NULL,
--   jdrNameFontSize INT NOT NULL,
--   jdrImg1 VARCHAR(150) NOT NULL,
--   jdrImg2 VARCHAR(100) NOT NULL,
--   jdrText VARCHAR(80) NOT NULL,
--   textColor VARCHAR(45) NOT NULL,
--   textFont VARCHAR(150) NOT NULL,
--   jdrBgColor1 VARCHAR(45) NOT NULL,
--   jdrBgColor2 VARCHAR(45) NOT NULL,
--   buttonColor VARCHAR(150) NOT NULL,
--   buttonFont VARCHAR(150) NOT NULL,
--   jdrCategory VARCHAR(45) NOT NULL,
--   jdrPublic VARCHAR(45) NOT NULL,
--   PRIMARY KEY (idcard))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;



-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`enemies`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`enemies` (
--   `enemy_id` INT NOT NULL AUTO_INCREMENT,
--   `health` INT NOT NULL,
--   `resistance` INT NULL DEFAULT NULL,
--   `strength` INT NULL DEFAULT NULL,
--   PRIMARY KEY (`enemy_id`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`stories`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`stories` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `title` VARCHAR(100) NOT NULL,
--   `resume` VARCHAR(230) NULL DEFAULT NULL,
--   `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `last_update` DATE NULL DEFAULT NULL,
--   `number_view` INT NULL DEFAULT '0',
--   `win_rate` INT NULL DEFAULT '0',
--   `money_earn` INT NULL DEFAULT '0',
--   `is_deploy` TINYINT NOT NULL,
--   `heroes_idheroes` INT NOT NULL DEFAULT '0',
--   `img_url` VARCHAR(150) NULL DEFAULT NULL,
--   `shop_id` INT NOT NULL DEFAULT '0',
--   `is_complete` TINYINT NULL DEFAULT '0',
--   `card_idcard` INT NOT NULL DEFAULT '0',
--   PRIMARY KEY (`id`, `heroes_idheroes`, `shop_id`, `card_idcard`),
--   INDEX `fk_stories_heroes1_idx` (`heroes_idheroes` ASC) VISIBLE,
--   INDEX `fk_stories_shop1_idx` (`shop_id` ASC) VISIBLE,
--   INDEX `fk_stories_card1_idx` (`card_idcard` ASC) VISIBLE)
-- ENGINE = InnoDB
-- AUTO_INCREMENT = 138
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`chapters`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`chapters` (
--   `idchapters` INT NOT NULL AUTO_INCREMENT,
--   `title` VARCHAR(45) NOT NULL,
--   `text` VARCHAR(5000) NOT NULL,
--   `is_battle` TINYINT NOT NULL,
--   `stories_id` INT NOT NULL,
--   `stories_heroes_idheroes` INT NOT NULL,
--   `enemies_enemy_id` INT NOT NULL,
--   PRIMARY KEY (`idchapters`, `stories_id`, `stories_heroes_idheroes`, `enemies_enemy_id`),
--   INDEX `fk_chapters_stories1_idx` (`stories_id` ASC, `stories_heroes_idheroes` ASC) VISIBLE,
--   INDEX `fk_chapters_enemies1_idx` (`enemies_enemy_id` ASC) VISIBLE,
--   CONSTRAINT `fk_chapters_enemies1`
--     FOREIGN KEY (`enemies_enemy_id`)
--     REFERENCES `enigmadb`.`enemies` (`enemy_id`),
--   CONSTRAINT `fk_chapters_stories1`
--     FOREIGN KEY (`stories_id` , `stories_heroes_idheroes`)
--     REFERENCES `enigmadb`.`stories` (`id` , `heroes_idheroes`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`choices`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`choices` (
--   `idchoices` INT NOT NULL AUTO_INCREMENT,
--   `button_text` VARCHAR(100) NULL DEFAULT NULL,
--   `next_chapter` INT NULL DEFAULT NULL,
--   PRIMARY KEY (`idchoices`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`choices_has_chapters`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`choices_has_chapters` (
--   `choices_idchoices` INT NOT NULL,
--   `chapters_idchapters` INT NOT NULL,
--   PRIMARY KEY (`choices_idchoices`, `chapters_idchapters`),
--   INDEX `fk_choices_has_chapters_chapters1_idx` (`chapters_idchapters` ASC) VISIBLE,
--   INDEX `fk_choices_has_chapters_choices1_idx` (`choices_idchoices` ASC) VISIBLE,
--   CONSTRAINT `fk_choices_has_chapters_chapters1`
--     FOREIGN KEY (`chapters_idchapters`)
--     REFERENCES `enigmadb`.`chapters` (`idchapters`),
--   CONSTRAINT `fk_choices_has_chapters_choices1`
--     FOREIGN KEY (`choices_idchoices`)
--     REFERENCES `enigmadb`.`choices` (`idchoices`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`heroes`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`heroes` (
--   `idheroes` INT NOT NULL AUTO_INCREMENT,
--   `class` VARCHAR(45) NULL DEFAULT NULL,
--   `name` VARCHAR(45) NULL DEFAULT NULL,
--   `health` INT NULL DEFAULT NULL,
--   `max_health` INT NULL DEFAULT NULL,
--   `money` INT NULL DEFAULT NULL,
--   `weapon` VARCHAR(45) NULL DEFAULT NULL,
--   `strength` INT NULL DEFAULT NULL,
--   `resistance` INT NULL DEFAULT NULL,
--   `img_hero` VARCHAR(150) NULL DEFAULT NULL,
--   PRIMARY KEY (`idheroes`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`inventory`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`inventory` (
--   `idinventory` INT NOT NULL AUTO_INCREMENT,
--   `heroes_idheroes` INT NOT NULL,
--   PRIMARY KEY (`idinventory`, `heroes_idheroes`),
--   INDEX `fk_inventory_heroes1_idx` (`heroes_idheroes` ASC) VISIBLE,
--   CONSTRAINT `fk_inventory_heroes1`
--     FOREIGN KEY (`heroes_idheroes`)
--     REFERENCES `enigmadb`.`heroes` (`idheroes`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`consomables`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`consomables` (
--   `idconsomables` INT NOT NULL,
--   `conso_name` VARCHAR(45) NOT NULL,
--   `conso_img` VARCHAR(150) NOT NULL,
--   `inventory_idinventory` INT NOT NULL,
--   `inventory_heroes_idheroes` INT NOT NULL,
--   PRIMARY KEY (`idconsomables`, `inventory_idinventory`, `inventory_heroes_idheroes`),
--   INDEX `fk_consomables_inventory1_idx` (`inventory_idinventory` ASC, `inventory_heroes_idheroes` ASC) VISIBLE,
--   CONSTRAINT `fk_consomables_inventory1`
--     FOREIGN KEY (`inventory_idinventory` , `inventory_heroes_idheroes`)
--     REFERENCES `enigmadb`.`inventory` (`idinventory` , `heroes_idheroes`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`users`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`users` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `firstname` VARCHAR(45) NOT NULL,
--   `lastname` VARCHAR(45) NOT NULL,
--   `hashedPassword` VARCHAR(100) NOT NULL,
--   `mail` VARCHAR(100) NOT NULL,
--   `pseudo` VARCHAR(45) NOT NULL,
--   `coins` INT NULL DEFAULT NULL,
--   `experience` INT NULL DEFAULT NULL,
--   `actual_chapter` INT NULL DEFAULT NULL,
--   `role` VARCHAR(45) NOT NULL DEFAULT 'user',
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB
-- AUTO_INCREMENT = 5
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`gallery`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`gallery` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `user_id` INT NULL DEFAULT NULL,
--   `file_path` VARCHAR(255) NOT NULL,
--   `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   INDEX `gallery_ibfk_1` (`user_id` ASC) VISIBLE,
--   CONSTRAINT `gallery_ibfk_1`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `enigmadb`.`users` (`id`)
--     ON DELETE CASCADE)
-- ENGINE = InnoDB
-- AUTO_INCREMENT = 13
-- DEFAULT CHARACTER SET = utf8mb3;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`shop`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`shop` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `type` INT NOT NULL,
--   `name` VARCHAR(45) NOT NULL,
--   `price` INT NOT NULL,
--   `quantity` INT NOT NULL,
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;

-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`shop_credit_item`
-- -- -----------------------------------------------------

-- CREATE TABLE IF NOT EXISTS `enigmadb`.`shop_credit_item` (
--   `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
--   `price` INT(11) UNSIGNED NOT NULL,
--   `items` VARCHAR(100) NOT NULL,
--   `credit_quantity`  INT(11) UNSIGNED NULL,
--   `discount`  INT(11) UNSIGNED DEFAULT NULL, 
--   `best_seller` BOOLEAN DEFAULT FALSE,
--   `subscribe` BOOLEAN DEFAULT FALSE,
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB;

-- INSERT INTO `enigmadb`.`shop_credit_item`(`price`, `credit_quantity`, `items`, `discount`, `best_seller`, `subscribe`)
-- VALUES 
-- (5, 100, "credits", NULL, FALSE, FALSE), 
-- (25, 1000, "crédits", 50, TRUE, FALSE),
-- (20, 500, "crédits", 20, FALSE, FALSE),
-- (5, NULL, "/ months", FALSE, FALSE, TRUE);

-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`shopping_card_item`
-- -- -----------------------------------------------------

-- CREATE TABLE IF NOT EXISTS `enigmadb`.`shopping_card_item` (
--   `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
--   `shop_credit_item_id` INT(11) UNSIGNED NOT NULL,
--   `quantity` INT(11) UNSIGNED NOT NULL,
--   `user_id` INT NOT NULL,
--   PRIMARY KEY (`id`),
--   FOREIGN KEY (`shop_credit_item_id`)
--     REFERENCES `enigmadb`.`shop_credit_item`(`id`)
--   -- FOREIGN KEY (`user_id`)
--   --   REFERENCES `enigmadb`.`users`(`id`)
--     )
--   ENGINE = InnoDB;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`users_has_chapters`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`users_has_chapters` (
--   `users_id` INT NOT NULL,
--   `chapters_idchapters` INT NOT NULL,
--   PRIMARY KEY (`users_id`, `chapters_idchapters`),
--   INDEX `fk_users_has_chapters_chapters1_idx` (`chapters_idchapters` ASC) VISIBLE,
--   INDEX `fk_users_has_chapters_users1_idx` (`users_id` ASC) VISIBLE,
--   CONSTRAINT `fk_users_has_chapters_chapters1`
--     FOREIGN KEY (`chapters_idchapters`)
--     REFERENCES `enigmadb`.`chapters` (`idchapters`),
--   CONSTRAINT `fk_users_has_chapters_users1`
--     FOREIGN KEY (`users_id`)
--     REFERENCES `enigmadb`.`users` (`id`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- -- -----------------------------------------------------
-- -- Table `enigmadb`.`weapons`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `enigmadb`.`weapons` (
--   `iditems` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NULL DEFAULT NULL,
--   `description` VARCHAR(45) NULL DEFAULT NULL,
--   `image` VARCHAR(255) NULL DEFAULT NULL,
--   `buy_price` INT NULL DEFAULT NULL,
--   `sell_price` INT NULL DEFAULT NULL,
--   `damage` INT NULL DEFAULT NULL,
--   `inventory_idinventory` INT NOT NULL,
--   `inventory_heroes_idheroes` INT NOT NULL,
--   PRIMARY KEY (`iditems`, `inventory_idinventory`, `inventory_heroes_idheroes`),
--   INDEX `fk_weapons_inventory1_idx` (`inventory_idinventory` ASC, `inventory_heroes_idheroes` ASC) VISIBLE,
--   CONSTRAINT `fk_weapons_inventory1`
--     FOREIGN KEY (`inventory_idinventory` , `inventory_heroes_idheroes`)
--     REFERENCES `enigmadb`.`inventory` (`idinventory` , `heroes_idheroes`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;


-- SET SQL_MODE=@OLD_SQL_MODE;
-- SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
-- SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;