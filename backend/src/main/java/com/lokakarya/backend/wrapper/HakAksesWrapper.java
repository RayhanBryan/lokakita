package com.lokakarya.backend.wrapper;

import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HakAksesWrapper {
    private Long hakAksesId;
    private Long userId;
    private String user;
    private Long groupId;
    private String group;
    private String programName;
    private Date createdDate;
    private String createdBy;
    private Date updatedDate;
    private String updatedBy;
    private Character isActive;
}
