SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `school_master` ;
CREATE SCHEMA IF NOT EXISTS `school_master` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `school_master` ;

-- -----------------------------------------------------
-- Table `school_master`.`school`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `school_master`.`school` ;

CREATE  TABLE IF NOT EXISTS `school_master`.`school` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(100) NOT NULL ,
  `addr1` VARCHAR(100) NULL ,
  `addr2` VARCHAR(100) NULL ,
  `state` VARCHAR(2) NULL ,
  `city` VARCHAR(100) NULL ,
  `zip` VARCHAR(12) NULL ,
  `phone` VARCHAR(15) NULL ,
  `admin_email` VARCHAR(45) NULL ,
  `last_update` DATETIME NULL DEFAULT NOW() ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_master`.`broadcast_message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `school_master`.`broadcast_message` ;

CREATE  TABLE IF NOT EXISTS `school_master`.`broadcast_message` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `school_id` INT NULL ,
  `sent_time` DATETIME NULL ,
  `message_body` VARCHAR(5000) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `_idx` (`school_id` ASC) ,
  CONSTRAINT `school_id`
    FOREIGN KEY (`school_id` )
    REFERENCES `school_master`.`school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_master`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `school_master`.`user` ;

CREATE  TABLE IF NOT EXISTS `school_master`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user_name` VARCHAR(45) NOT NULL ,
  `password` VARCHAR(45) NOT NULL ,
  `roles` VARCHAR(8) NOT NULL ,
  `last_update` DATETIME NULL DEFAULT NOW() ,
  `first_name` VARCHAR(45) NOT NULL ,
  `last_name` VARCHAR(45) NOT NULL ,
  `hint` VARCHAR(200) NULL ,
  `phone` VARCHAR(45) NULL ,
  `email` VARCHAR(45) NULL ,
  `addr1` VARCHAR(100) NULL ,
  `addr2` VARCHAR(100) NULL ,
  `city` VARCHAR(100) NULL ,
  `state` VARCHAR(15) NULL ,
  `public_profile` TINYINT NULL ,
  `zip` VARCHAR(15) NULL ,
  `cell phone` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_master`.`classroom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `school_master`.`classroom` ;

CREATE  TABLE IF NOT EXISTS `school_master`.`classroom` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `school_id` INT NOT NULL ,
  `name` VARCHAR(100) NULL ,
  `isSubject` TINYINT NOT NULL ,
  `shortName` VARCHAR(8) NOT NULL ,
  `last_update` DATETIME NULL DEFAULT NOW() ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `classroom.school_id`
    FOREIGN KEY (`school_id` )
    REFERENCES `school_master`.`school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_master`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `school_master`.`student` ;

CREATE  TABLE IF NOT EXISTS `school_master`.`student` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `first_name` VARCHAR(100) NOT NULL ,
  `last_name` VARCHAR(100) NOT NULL ,
  `grade` VARCHAR(45) NULL ,
  `last_update` DATETIME NULL DEFAULT NOW() ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_master`.`user_student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `school_master`.`user_student` ;

CREATE  TABLE IF NOT EXISTS `school_master`.`user_student` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `student_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `user_student.user_id_idx` (`user_id` ASC) ,
  CONSTRAINT `user_student.user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `school_master`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_student.student_id`
    FOREIGN KEY (`student_id` )
    REFERENCES `school_master`.`student` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_master`.`absence`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `school_master`.`absence` ;

CREATE  TABLE IF NOT EXISTS `school_master`.`absence` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start_date_time` DATETIME NOT NULL ,
  `end_date_time` DATETIME NULL ,
  `reason` VARCHAR(300) NULL ,
  `last_update` DATETIME NULL DEFAULT NOW() ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_master`.`absence_owner`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `school_master`.`absence_owner` ;

CREATE  TABLE IF NOT EXISTS `school_master`.`absence_owner` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NULL ,
  `user_id` INT NULL ,
  `absence_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `absence_owner.user_id_idx` (`user_id` ASC) ,
  INDEX `absence_owner.student_id_idx` (`student_id` ASC) ,
  CONSTRAINT `absence_owner.student_id`
    FOREIGN KEY (`student_id` )
    REFERENCES `school_master`.`student` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `absence_owner.absence_id`
    FOREIGN KEY (`absence_id` )
    REFERENCES `school_master`.`absence` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `absence_owner.user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `school_master`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `school_master`.`class_student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `school_master`.`class_student` ;

CREATE  TABLE IF NOT EXISTS `school_master`.`class_student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NOT NULL ,
  `class_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `class_id_idx` (`class_id` ASC) ,
  INDEX `class_student.student_id_idx` (`student_id` ASC) ,
  CONSTRAINT `class_student.class_id`
    FOREIGN KEY (`class_id` )
    REFERENCES `school_master`.`classroom` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `class_student.student_id`
    FOREIGN KEY (`student_id` )
    REFERENCES `school_master`.`student` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `school_master` ;

SET SQL_MODE = '';
DROP USER salma;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'salma' IDENTIFIED BY 'salma';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
