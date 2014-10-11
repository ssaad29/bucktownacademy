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
'McCormick Tribune YMCA',
'1834 N. Lawndale Ave',
'',
'Chicago',
'IL',
'60647',
'773.235.2525',
'Metro Chicago Y',
null,
NOW(),
'loader',
null,
'admin@schoolishness.com'
);

commit;

