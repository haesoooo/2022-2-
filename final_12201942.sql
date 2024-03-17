-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema finalproject
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema finalproject
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `finalproject` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `finalproject` ;

-- -----------------------------------------------------
-- Table `finalproject`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `finalproject`.`user` (
  `uid` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `isadmin` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE INDEX `uid_UNIQUE` (`uid` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `finalproject`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `finalproject`.`customer` (
  `Ssn` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `gu` VARCHAR(45) NULL DEFAULT NULL,
  `dong` VARCHAR(45) NULL DEFAULT NULL,
  `user_uid` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Ssn`),
  UNIQUE INDEX `Ssn_UNIQUE` (`Ssn` ASC) VISIBLE,
  INDEX `fk_customer_user1_idx` (`user_uid` ASC) VISIBLE,
  CONSTRAINT `fk_customer_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `finalproject`.`user` (`uid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `finalproject`.`salesperson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `finalproject`.`salesperson` (
  `Sid` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `user_uid` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Sid`),
  UNIQUE INDEX `Sid_UNIQUE` (`Sid` ASC) VISIBLE,
  INDEX `fk_salesperson_user1_idx` (`user_uid` ASC) VISIBLE,
  CONSTRAINT `fk_salesperson_user1`
    FOREIGN KEY (`user_uid`)
    REFERENCES `finalproject`.`user` (`uid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `finalproject`.`vehicle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `finalproject`.`vehicle` (
  `Vin` INT NOT NULL AUTO_INCREMENT,
  `Model` VARCHAR(45) NOT NULL,
  `Price` VARCHAR(45) NOT NULL,
  `Type` VARCHAR(45) NOT NULL,
  `Enginesize` VARCHAR(45) NULL DEFAULT NULL,
  `Seat` VARCHAR(45) NULL DEFAULT NULL,
  `Tone` VARCHAR(45) NULL DEFAULT NULL,
  `Reservation` VARCHAR(10) NOT NULL,
  `salesperson_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Vin`),
  UNIQUE INDEX `Vin_UNIQUE` (`Vin` ASC) VISIBLE,
  INDEX `fk_vehicle_salesperson1_idx` (`salesperson_id` ASC) VISIBLE,
  CONSTRAINT `fk_vehicle_salesperson1`
    FOREIGN KEY (`salesperson_id`)
    REFERENCES `finalproject`.`salesperson` (`Sid`))
ENGINE = InnoDB
AUTO_INCREMENT = 100005
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `finalproject`.`sale`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `finalproject`.`sale` (
  `said` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `manageid` VARCHAR(45) NOT NULL,
  `reservedate` DATE NOT NULL,
  `customerid` VARCHAR(45) NOT NULL,
  `vid` INT NOT NULL,
  PRIMARY KEY (`said`),
  UNIQUE INDEX `said_UNIQUE` (`said` ASC) VISIBLE,
  INDEX `fk_SALE_SALESPERSON1_idx` (`manageid` ASC) VISIBLE,
  INDEX `fk_SALE_CUSTOMER1_idx` (`customerid` ASC) VISIBLE,
  INDEX `fk_SALE_VEHICLE1_idx` (`vid` ASC) VISIBLE,
  CONSTRAINT `fk_SALE_CUSTOMER1`
    FOREIGN KEY (`customerid`)
    REFERENCES `finalproject`.`customer` (`Ssn`),
  CONSTRAINT `fk_SALE_SALESPERSON1`
    FOREIGN KEY (`manageid`)
    REFERENCES `finalproject`.`salesperson` (`Sid`),
  CONSTRAINT `fk_SALE_VEHICLE1`
    FOREIGN KEY (`vid`)
    REFERENCES `finalproject`.`vehicle` (`Vin`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
