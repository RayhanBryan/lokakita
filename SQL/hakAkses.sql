---Create Hak Akses Table
CREATE TABLE HAK_AKSES
(
  HAK_AKSES_ID NUMBER(10) NOT NULL,
  USER_ID NUMBER(10) NOT NULL, 
  GROUP_ID NUMBER(10) NOT NULL, 
  PROGRAM_NAME VARCHAR2(100),
  CREATED_DATE DATE NOT NULL, 
  CREATED_BY VARCHAR2(100) NOT NULL, 
  UPDATED_DATE DATE, 
  UPDATED_BY VARCHAR2(100),
  
  CONSTRAINT pk_hak_akses PRIMARY KEY (HAK_AKSES_ID),
  CONSTRAINT fk_group
  	FOREIGN KEY (GROUP_ID)
  	REFERENCES GROUPS (GROUP_ID)
  	ON DELETE CASCADE,
  CONSTRAINT fk_user
 	FOREIGN KEY (USER_ID)
 	REFERENCES USERS (USER_ID)
 	ON DELETE CASCADE
);