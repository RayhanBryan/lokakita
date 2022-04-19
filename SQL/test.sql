select * from USER_SEQUENCES

desc GROUPS;

select * from menus;

DESC MENUS;

select * from menus m 
LEFT JOIN GROUP_MENU gm on m.menu_id = gm.MENU_ID
LEFT JOIN Groups gs on gm.group_id = gs.group_ID
LEFT JOIN HAK_AKSES ha on gs.group_id = ha.group_ID
LEFT JOIN USERS u on ha.user_id = u.user_ID
where u.USER_ID = ;

select * from users;