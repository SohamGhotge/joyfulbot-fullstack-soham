package com.joyfulbot.elms.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LeaveTypeResponse {
    private Long id;
    private String name;
    private int maxDaysPerYear;
    private String description;
}
