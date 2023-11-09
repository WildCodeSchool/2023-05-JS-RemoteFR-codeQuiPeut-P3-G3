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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-29  9:50:42
