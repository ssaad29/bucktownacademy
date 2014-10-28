CREATE  TABLE IF NOT EXISTS `signature_records` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `action` VARCHAR(45) NOT NULL, 
  `signature` LONGBLOB NOT NULL, 
  `time_collected` datetime NOT NULL,
  PRIMARY KEY (`id`) ,
 `student_id` int(11) NOT NULL,
  CONSTRAINT `student_id`
    FOREIGN KEY (`student_id` )
    REFERENCES `student` (`id` )
	ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;