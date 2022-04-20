select * from USER_SEQUENCES

desc GROUPS;

select * from menus;

DESC MENUS;

select distinct (m.MENU_ID), m.MENU_NAME, m.ICON, m.URL from menus m 
LEFT JOIN GROUP_MENU gm on m.menu_id = gm.MENU_ID
LEFT JOIN Groups gs on gm.group_id = gs.group_ID
LEFT JOIN HAK_AKSES ha on gs.group_id = ha.group_ID
LEFT JOIN USERS u on ha.user_id = u.user_ID
where u.USER_ID = 88
ORDER BY m.MENU_ID ASC;

select * from HAK_AKSES;

select * from GROUPS

select * from GROUP_MENU

select * from GROUPS g 
left JOIN HAK_AKSES ha on g.group_ID = ha.group_ID 
LEFT JOIN USERS u on ha.user_ID = u.user_ID
where u.user_Id = 1;

select * from permissions p
LEFT JOIN PERMISSION_GROUPS pg on p.PERMISSION_ID = pg.PERMISSION_ID
LEFT JOIN GROUPS g on pg.group_ID = g.GROUP_ID
LEFT JOIN HAK_AKSES ha on g.group_ID = ha.group_ID
LEFT JOIN USERS u on ha.user_ID = u.USER_ID
where u.user_id = 1;

desc PERMISSION_GROUPS;

insert into PERMISSIONS values(PERMISSION_SEQ.NEXTVAL, 'DELETE', 'Bisa delete anjay.')
insert into PERMISSION_GROUPS VALUES(PERMISSION_GROUP_SEQ.NEXTVAL, 3, 2);
select * from PERMISSIONS;
