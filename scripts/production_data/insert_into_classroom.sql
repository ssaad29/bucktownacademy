INSERT INTO classroom
(`school_id`,
`name`,
`is_subject`,
`last_update_time`,
`creation_date`,
`created_by`,
`last_updated_by`)
VALUES
(
11,
'PreK',
0,
NOW(),
NOW(),
'Admin',
'Admin'
);

commit;

