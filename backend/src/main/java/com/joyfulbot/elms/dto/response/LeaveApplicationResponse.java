package com.joyfulbot.elms.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class LeaveApplicationResponse {
    private Long id;
    private String employeeName;
    private String employeeEmail;
    private String leaveTypeName;
    private LocalDate startDate;
    private LocalDate endDate;
    private int totalDays;
    private String reason;
    private String status;
    private LocalDateTime appliedAt;
    private String reviewedByName;
    private LocalDateTime reviewedAt;
    private String remarks;
}
