CREATE  TABLE IF NOT EXISTS `school_master`.`grades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL ,
  `school_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  CONSTRAINT `school_id`
    FOREIGN KEY (`school_id` )
    REFERENCES `school_master`.`school` (`id` )
	ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;