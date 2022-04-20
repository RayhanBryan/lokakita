package com.lokakarya.backend.wrapper;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GroupWrapper {
    private Long groupId;
    private String groupName;
    private String programName;
    private Date createdDate;
    private String createdBy;
    private Date updatedDate;
    private String updatedBy;
}
