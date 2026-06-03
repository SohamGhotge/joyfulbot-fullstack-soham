package com.joyfulbot.elms.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LeaveBalanceResponse {
    private Long leaveTypeId;
    private String leaveTypeName;
    private int totalDays;
    private int usedDays;
    private int remainingDays;
    private int year;
}
