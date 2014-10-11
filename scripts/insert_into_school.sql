INSERT INTO `school_master`.`school`
(`name`,
`addr1`,
`addr2`,
`city`,
`state`,
`zip`,
`phone`,
`group_name`,
`last_update_time`,
`creation_date`,
`created_by`,
`last_updated_by`,
`admin_email`)
VALUES
(
'Demo School',
'1980 West Cortland',
'',
'Chicago',
'IL',
'60647',
'000 000 0000',
'district 456',
null,
NOW(),
'loader',
null,
'admin@demo.com.com'
);

commit;

