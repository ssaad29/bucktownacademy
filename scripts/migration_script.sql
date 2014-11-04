-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Created: Wed Oct 29 17:25:33 2014
-- ----------------------------------------------------------------------------
drop table absence;
drop table absence_owner;
drop table bulletins;
drop table class_bulletins;
drop table class_student;
drop table classroom;
drop table grades;
drop table school;
drop table sessions;
drop table signature_records;
drop table sponsorship;
drop table sponsorship_school;
drop table student;
drop table student_notes;
drop table tokens;
drop table user;
drop table user_class;
drop table user_school;
drop table user_student;

SET FOREIGN_KEY_CHECKS = 0;

CREATE  TABLE IF NOT EXISTS `absence` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `start_date_time` DATETIME NOT NULL ,
  `end_date_time` DATETIME NULL DEFAULT NULL ,
  `reason` VARCHAR(300) NULL DEFAULT NULL ,
  `tardy_dismissal_time` VARCHAR(60) NULL DEFAULT NULL ,
  `type` INT(11) NULL DEFAULT NULL ,
  `school_id` INT(11) NULL DEFAULT NULL ,
  `parent_entered` TINYINT(4) NULL DEFAULT '0' ,
  `school_entered` TINYINT(4) NULL DEFAULT '0' ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `school_id_absence` (`school_id` ASC) ,
  CONSTRAINT `school_id_absence`
    FOREIGN KEY (`school_id` )
    REFERENCES `school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table school
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `school` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `group_name` VARCHAR(100) NOT NULL ,
  `name` VARCHAR(100) NOT NULL ,
  `addr1` VARCHAR(100) NULL DEFAULT NULL ,
  `addr2` VARCHAR(100) NULL DEFAULT NULL ,
  `state` VARCHAR(2) NULL DEFAULT NULL ,
  `city` VARCHAR(100) NULL DEFAULT NULL ,
  `zip` VARCHAR(12) NULL DEFAULT NULL ,
  `phone` VARCHAR(15) NULL DEFAULT NULL ,
  `admin_email` VARCHAR(45) NULL DEFAULT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table absence_owner
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `absence_owner` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `student_id` INT(11) NULL DEFAULT NULL ,
  `user_id` INT(11) NULL DEFAULT NULL ,
  `absence_id` INT(11) NOT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `absence_owner.user_id_idx` (`user_id` ASC) ,
  INDEX `absence_owner.student_id_idx` (`student_id` ASC) ,
  INDEX `absence_owner.absence_id` (`absence_id` ASC) ,
  CONSTRAINT `absence_owner?absence_id`
    FOREIGN KEY (`absence_id` )
    REFERENCES `absence` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `absence_owner?student_id`
    FOREIGN KEY (`student_id` )
    REFERENCES `student` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `absence_owner?user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table student
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `student` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `first_name` VARCHAR(100) NOT NULL ,
  `last_name` VARCHAR(100) NOT NULL ,
  `grade_id` INT(11) NULL DEFAULT NULL ,
  `allergies` VARCHAR(500) NULL DEFAULT NULL ,
  `comments` VARCHAR(500) NULL DEFAULT NULL ,
  `birthdate` DATE NULL DEFAULT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `grade_id` (`grade_id` ASC) ,
  CONSTRAINT `grade_id`
    FOREIGN KEY (`grade_id` )
    REFERENCES `grades` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1211
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table user
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `user_name` VARCHAR(45) NOT NULL ,
  `password` VARCHAR(45) NOT NULL ,
  `roles` VARCHAR(8) NOT NULL ,
  `first_name` VARCHAR(45) NOT NULL ,
  `last_name` VARCHAR(45) NOT NULL ,
  `phone` VARCHAR(45) NULL DEFAULT NULL ,
  `email` VARCHAR(45) NULL DEFAULT NULL ,
  `addr1` VARCHAR(100) NULL DEFAULT NULL ,
  `addr2` VARCHAR(100) NULL DEFAULT NULL ,
  `city` VARCHAR(100) NULL DEFAULT NULL ,
  `state` VARCHAR(15) NULL DEFAULT NULL ,
  `public_profile` TINYINT(4) NULL DEFAULT '1' ,
  `zip` VARCHAR(15) NULL DEFAULT NULL ,
  `cell_phone` VARCHAR(45) NULL DEFAULT NULL ,
  `birthdate` DATE NULL DEFAULT NULL ,
  `school_id` INT(11) NULL DEFAULT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `school_id_user_table` (`school_id` ASC) ,
  CONSTRAINT `school_id_user_table`
    FOREIGN KEY (`school_id` )
    REFERENCES `school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1838
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table bulletins
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `bulletins` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(100) NOT NULL ,
  `message` VARCHAR(1000) NOT NULL ,
  `type` INT(11) NULL DEFAULT NULL ,
  `reminder` INT(11) NULL DEFAULT NULL ,
  `school_id` INT(11) NULL DEFAULT NULL ,
  `event_date` DATETIME NULL DEFAULT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `bulletins.school_id` (`school_id` ASC) ,
  CONSTRAINT `bulletins?school_id`
    FOREIGN KEY (`school_id` )
    REFERENCES `school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 59
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table class_bulletins
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `class_bulletins` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `bulletin_id` INT(11) NOT NULL ,
  `classroom_id` INT(11) NULL DEFAULT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `class_id_idx` (`classroom_id` ASC) ,
  INDEX `class_.bulletin_id_idx` (`bulletin_id` ASC) ,
  CONSTRAINT `class_bulletins?bulletin_id`
    FOREIGN KEY (`bulletin_id` )
    REFERENCES `bulletins` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `class_bulletins?class_id`
    FOREIGN KEY (`classroom_id` )
    REFERENCES `classroom` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 70
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table classroom
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `classroom` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `school_id` INT(11) NOT NULL ,
  `name` VARCHAR(100) NULL DEFAULT NULL ,
  `is_subject` TINYINT(4) NULL DEFAULT '1' ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `classroom.school_id` (`school_id` ASC) ,
  CONSTRAINT `classroom?school_id`
    FOREIGN KEY (`school_id` )
    REFERENCES `school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 326
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table class_student
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `class_student` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `student_id` INT(11) NOT NULL ,
  `classroom_id` INT(11) NULL DEFAULT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `class_id_idx` (`classroom_id` ASC) ,
  INDEX `class_student.student_id_idx` (`student_id` ASC) ,
  CONSTRAINT `class_student?class_id`
    FOREIGN KEY (`classroom_id` )
    REFERENCES `classroom` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `class_student?student_id`
    FOREIGN KEY (`student_id` )
    REFERENCES `student` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 954
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table grades
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `grades` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(100) NOT NULL ,
  `school_id` INT(11) NULL DEFAULT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `school_id` (`school_id` ASC) ,
  CONSTRAINT `school_id`
    FOREIGN KEY (`school_id` )
    REFERENCES `school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table sessions
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sessions` (
  `session_id` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL ,
  `expires` INT(11) UNSIGNED NOT NULL ,
  `data` TEXT CHARACTER SET 'utf8' NULL DEFAULT NULL ,
  PRIMARY KEY (`session_id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- ----------------------------------------------------------------------------
-- Table signature_records
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `signature_records` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `action` VARCHAR(45) NOT NULL ,
  `signature` LONGBLOB NOT NULL ,
  `time_collected` DATETIME NOT NULL ,
  `student_id` INT(11) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `student_id` (`student_id` ASC) ,
  CONSTRAINT `student_id`
    FOREIGN KEY (`student_id` )
    REFERENCES `student` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table sponsorship
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sponsorship` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(100) NOT NULL ,
  `call to action` VARCHAR(1000) NOT NULL ,
  `description` VARCHAR(1000) NOT NULL ,
  `logo` VARCHAR(500) NULL DEFAULT NULL ,
  `background_image` VARCHAR(500) NULL DEFAULT NULL ,
  `school_id` INT(11) NULL DEFAULT NULL ,
  `event_date` DATETIME NULL DEFAULT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `sponsorship.school_id` (`school_id` ASC) ,
  CONSTRAINT `sponsorship?school_id`
    FOREIGN KEY (`school_id` )
    REFERENCES `school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table sponsorship_school
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sponsorship_school` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `school_id` INT(11) NOT NULL ,
  `sponsorship_id` INT(11) NOT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `sponsorship_school.sponsorship_id_idx` (`sponsorship_id` ASC) ,
  INDEX `sponsorship_school.school_id` (`school_id` ASC) ,
  CONSTRAINT `sponsorship_school?school_id`
    FOREIGN KEY (`school_id` )
    REFERENCES `school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sponsorship_school?sponsorship_id`
    FOREIGN KEY (`sponsorship_id` )
    REFERENCES `sponsorship` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table student_notes
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `student_notes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `thread_id` INT(11) NOT NULL ,
  `student_id` INT(11) NULL DEFAULT NULL ,
  `message` VARCHAR(3000) NULL DEFAULT NULL ,
  `title` VARCHAR(300) NULL DEFAULT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table tokens
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `token` VARCHAR(100) NOT NULL ,
  `type` VARCHAR(60) NOT NULL ,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
AUTO_INCREMENT = 50
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table user_class
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `user_class` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `classroom_id` INT(11) NULL DEFAULT NULL ,
  `user_id` INT(11) NOT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `user_class_classroom_id` (`classroom_id` ASC) ,
  INDEX `user_class_user_id` (`user_id` ASC) ,
  CONSTRAINT `user_class_classroom_id`
    FOREIGN KEY (`classroom_id` )
    REFERENCES `classroom` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_class_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 158
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table user_school
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `user_school` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `school_id` INT(11) NOT NULL ,
  `user_id` INT(11) NOT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `user_school.user_id_idx` (`user_id` ASC) ,
  INDEX `user_school.school_id` (`school_id` ASC) ,
  CONSTRAINT `user_school?school_id`
    FOREIGN KEY (`school_id` )
    REFERENCES `school` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_school?user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 753
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table user_student
-- ----------------------------------------------------------------------------
CREATE  TABLE IF NOT EXISTS `user_student` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `student_id` INT(11) NOT NULL ,
  `user_id` INT(11) NOT NULL ,
  `last_update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_date` DATETIME NULL DEFAULT NULL ,
  `created_by` VARCHAR(60) NULL DEFAULT NULL ,
  `last_updated_by` VARCHAR(60) NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `user_student.user_id_idx` (`user_id` ASC) ,
  INDEX `user_student.student_id` (`student_id` ASC) ,
  CONSTRAINT `user_student?student_id`
    FOREIGN KEY (`student_id` )
    REFERENCES `student` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_student?user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 836
DEFAULT CHARACTER SET = utf8;

