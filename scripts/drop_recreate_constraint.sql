alter table absence_owner drop foreign key `absence_owner?absence_id`;
ALTER TABLE absence_owner ADD CONSTRAINT `absence_owner?absence_id` FOREIGN KEY (absence_id) references absence(id);

