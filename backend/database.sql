-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema enigmadb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema enigmadb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `enigmadb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `enigmadb` ;

-- -----------------------------------------------------
-- Table `enigmadb`.`card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS enigmadb.card (
  idcard INT NOT NULL AUTO_INCREMENT,
  jdrName VARCHAR(100) NOT NULL,
  jdrNameFont VARCHAR(45) NOT NULL,
  jdrNameColor VARCHAR(45) NOT NULL,
  jdrNameFontSize INT NOT NULL,
  jdrImg1 VARCHAR(150) NOT NULL,
  jdrImg2 VARCHAR(100) NOT NULL,
  jdrText VARCHAR(80) NOT NULL,
  textColor VARCHAR(45) NOT NULL,
  textFont VARCHAR(150) NOT NULL,
  jdrBgColor1 VARCHAR(45) NOT NULL,
  jdrBgColor2 VARCHAR(45) NOT NULL,
  buttonColor VARCHAR(150) NOT NULL,
  buttonFont VARCHAR(150) NOT NULL,
  jdrCategory VARCHAR(45) NOT NULL,
  jdrPublic VARCHAR(45) NOT NULL,
  PRIMARY KEY (idcard))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- Table `enigmadb`.`enemies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`enemies` (
  `enemy_id` INT NOT NULL AUTO_INCREMENT,
  `health` INT NOT NULL,
  `resistance` INT NULL DEFAULT NULL,
  `strength` INT NULL DEFAULT NULL,
  PRIMARY KEY (`enemy_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`stories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`stories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `resume` VARCHAR(230) NULL DEFAULT NULL,
  `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` DATE NULL DEFAULT NULL,
  `number_view` INT NULL DEFAULT '0',
  `win_rate` INT NULL DEFAULT '0',
  `money_earn` INT NULL DEFAULT '0',
  `is_deploy` TINYINT NOT NULL,
  `heroes_idheroes` INT NOT NULL DEFAULT '0',
  `img_url` VARCHAR(150) NULL DEFAULT NULL,
  `shop_id` INT NOT NULL DEFAULT '0',
  `is_complete` TINYINT NULL DEFAULT '0',
  `card_idcard` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`, `heroes_idheroes`, `shop_id`, `card_idcard`),
  INDEX `fk_stories_heroes1_idx` (`heroes_idheroes` ASC) VISIBLE,
  INDEX `fk_stories_shop1_idx` (`shop_id` ASC) VISIBLE,
  INDEX `fk_stories_card1_idx` (`card_idcard` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 138
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`chapters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`chapters` (
  `idchapters` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `text` VARCHAR(5000) NOT NULL,
  `is_battle` TINYINT NOT NULL,
  `stories_id` INT NOT NULL,
  `stories_heroes_idheroes` INT NOT NULL,
  `enemies_enemy_id` INT NOT NULL,
  PRIMARY KEY (`idchapters`, `stories_id`, `stories_heroes_idheroes`, `enemies_enemy_id`),
  INDEX `fk_chapters_stories1_idx` (`stories_id` ASC, `stories_heroes_idheroes` ASC) VISIBLE,
  INDEX `fk_chapters_enemies1_idx` (`enemies_enemy_id` ASC) VISIBLE,
  CONSTRAINT `fk_chapters_enemies1`
    FOREIGN KEY (`enemies_enemy_id`)
    REFERENCES `enigmadb`.`enemies` (`enemy_id`),
  CONSTRAINT `fk_chapters_stories1`
    FOREIGN KEY (`stories_id` , `stories_heroes_idheroes`)
    REFERENCES `enigmadb`.`stories` (`id` , `heroes_idheroes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`choices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`choices` (
  `idchoices` INT NOT NULL AUTO_INCREMENT,
  `button_text` VARCHAR(100) NULL DEFAULT NULL,
  `next_chapter` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idchoices`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`choices_has_chapters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`choices_has_chapters` (
  `choices_idchoices` INT NOT NULL,
  `chapters_idchapters` INT NOT NULL,
  PRIMARY KEY (`choices_idchoices`, `chapters_idchapters`),
  INDEX `fk_choices_has_chapters_chapters1_idx` (`chapters_idchapters` ASC) VISIBLE,
  INDEX `fk_choices_has_chapters_choices1_idx` (`choices_idchoices` ASC) VISIBLE,
  CONSTRAINT `fk_choices_has_chapters_chapters1`
    FOREIGN KEY (`chapters_idchapters`)
    REFERENCES `enigmadb`.`chapters` (`idchapters`),
  CONSTRAINT `fk_choices_has_chapters_choices1`
    FOREIGN KEY (`choices_idchoices`)
    REFERENCES `enigmadb`.`choices` (`idchoices`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`heroes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`heroes` (
  `idheroes` INT NOT NULL AUTO_INCREMENT,
  `class` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `health` INT NULL DEFAULT NULL,
  `max_health` INT NULL DEFAULT NULL,
  `money` INT NULL DEFAULT NULL,
  `weapon` VARCHAR(45) NULL DEFAULT NULL,
  `strength` INT NULL DEFAULT NULL,
  `resistance` INT NULL DEFAULT NULL,
  `img_hero` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`idheroes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`inventory` (
  `idinventory` INT NOT NULL AUTO_INCREMENT,
  `heroes_idheroes` INT NOT NULL,
  PRIMARY KEY (`idinventory`, `heroes_idheroes`),
  INDEX `fk_inventory_heroes1_idx` (`heroes_idheroes` ASC) VISIBLE,
  CONSTRAINT `fk_inventory_heroes1`
    FOREIGN KEY (`heroes_idheroes`)
    REFERENCES `enigmadb`.`heroes` (`idheroes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`consomables`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`consomables` (
  `idconsomables` INT NOT NULL,
  `conso_name` VARCHAR(45) NOT NULL,
  `conso_img` VARCHAR(150) NOT NULL,
  `inventory_idinventory` INT NOT NULL,
  `inventory_heroes_idheroes` INT NOT NULL,
  PRIMARY KEY (`idconsomables`, `inventory_idinventory`, `inventory_heroes_idheroes`),
  INDEX `fk_consomables_inventory1_idx` (`inventory_idinventory` ASC, `inventory_heroes_idheroes` ASC) VISIBLE,
  CONSTRAINT `fk_consomables_inventory1`
    FOREIGN KEY (`inventory_idinventory` , `inventory_heroes_idheroes`)
    REFERENCES `enigmadb`.`inventory` (`idinventory` , `heroes_idheroes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `hashedPassword` VARCHAR(100) NOT NULL,
  `mail` VARCHAR(100) NOT NULL,
  `pseudo` VARCHAR(45) NOT NULL,
  `coins` INT NULL DEFAULT NULL,
  `experience` INT NULL DEFAULT NULL,
  `actual_chapter` INT NULL DEFAULT NULL,
  `role` VARCHAR(45) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`gallery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`gallery` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `gallery_ibfk_1` (`user_id` ASC) VISIBLE,
  CONSTRAINT `gallery_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `enigmadb`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `enigmadb`.`shop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`shop` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`users_has_chapters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`users_has_chapters` (
  `users_id` INT NOT NULL,
  `chapters_idchapters` INT NOT NULL,
  PRIMARY KEY (`users_id`, `chapters_idchapters`),
  INDEX `fk_users_has_chapters_chapters1_idx` (`chapters_idchapters` ASC) VISIBLE,
  INDEX `fk_users_has_chapters_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_chapters_chapters1`
    FOREIGN KEY (`chapters_idchapters`)
    REFERENCES `enigmadb`.`chapters` (`idchapters`),
  CONSTRAINT `fk_users_has_chapters_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `enigmadb`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `enigmadb`.`weapons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enigmadb`.`weapons` (
  `iditems` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `buy_price` INT NULL DEFAULT NULL,
  `sell_price` INT NULL DEFAULT NULL,
  `damage` INT NULL DEFAULT NULL,
  `inventory_idinventory` INT NOT NULL,
  `inventory_heroes_idheroes` INT NOT NULL,
  PRIMARY KEY (`iditems`, `inventory_idinventory`, `inventory_heroes_idheroes`),
  INDEX `fk_weapons_inventory1_idx` (`inventory_idinventory` ASC, `inventory_heroes_idheroes` ASC) VISIBLE,
  CONSTRAINT `fk_weapons_inventory1`
    FOREIGN KEY (`inventory_idinventory` , `inventory_heroes_idheroes`)
    REFERENCES `enigmadb`.`inventory` (`idinventory` , `heroes_idheroes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;