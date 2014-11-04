INSERT INTO school
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
'Bucktown Academy',
'1903 N Milwaukee Ave, Chicago, IL 60647',
'',
'Chicago',
'IL',
'60647',
'(773) 666-5788',
'None',
null,
NOW(),
'loader',
null,
'Bucktownacademy@gmail.com'
);

commit;

