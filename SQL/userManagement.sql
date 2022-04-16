-- create table user
create table users (
    user_ID number(10)
        constraint const_users_user_id_pk primary key,
    username VARCHAR2(255)
        constraint const_users_username_uk UNIQUE
        constraint const_users_username_nn not null,
    password VARCHAR2(100)
        constraint const_users_password_nn not null,
    user_name varchar2(100)
        constraint const_users_user_name_nn not null,
    address varchar2(100),
    email varchar2(100)
        constraint const_users_email_uk UNIQUE
        constraint const_users_email_nn not null
        constraint const_users_email_ch check(email like '%@%.%'),
    phone varchar2(25),
    program_name VARCHAR2(100),
    created_date date
        constraint const_users_created_date_nn not null,
    created_by VARCHAR2(100)
        constraint const_users_created_by_nn not null,
    updated_date date,
    updated_by varchar2(100)
)


drop TABLE users;

desc users

create SEQUENCE user_seq
    MINVALUE 1
    MAXVALUE 10000000000
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- =======================================================================
-- =======================================================================
-- create table group
create table groups(
    group_id NUMBER(10)
        constraint const_groups_group_id_pk primary key,
    group_name varchar2(255)
        constraint const_groups_group_name_nn not null
        constraint const_groups_group_name_uk UNIQUE,
    program_name VARCHAR2(100),
    created_date date
        constraint const_groups_created_date_nn not null,
    created_by VARCHAR2(100)
        constraint const_groups_created_by_nn not null,
    updated_date date,
    updated_by varchar2(100)
)

drop TABLE GROUPs;

create SEQUENCE group_seq
    MINVALUE 1
    MAXVALUE 10000000000
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;
-- =======================================================================
-- =======================================================================
-- create table menu
create table menus(
    menu_id NUMBER(10)
        constraint const_menus_menu_id_pk primary key,
    menu_name varchar2(255)
        constraint const_menus_menu_name_nn not null
        constraint const_menus_menu_name_uk UNIQUE,
    icon varchar2(50)
        constraint const_menus_icon_nn not null,
    url varchar2(100) 
        constraint const_menus_url_nn not null
        constraint const_menus_url_uk UNIQUE,
    program_name VARCHAR2(100),
    created_date date
        constraint const_menus_created_date_nn not null,
    created_by VARCHAR2(100)
        constraint const_menus_created_by_nn not null,
    updated_date date,
    updated_by varchar2(100)
)

drop table menus;

create SEQUENCE menu_seq
    MINVALUE 1
    MAXVALUE 10000000000
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;