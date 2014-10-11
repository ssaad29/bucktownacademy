CREATE  TABLE IF NOT EXISTS `school_master`.`user_class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `classroom_id` INT NULL ,
  `user_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `user_class_classroom_id_idx` (`classroom_id` ASC) ,
  INDEX `user_class_user_id_idx` (`user_id` ASC) ,
  CONSTRAINT `user_class_classroom_id`
    FOREIGN KEY (`classroom_id` )
    REFERENCES `school_master`.`classroom` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_class_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `school_master`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB