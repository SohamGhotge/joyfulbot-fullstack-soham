package com.joyfulbot.elms.util;

import com.joyfulbot.elms.dto.response.*;
import com.joyfulbot.elms.entity.*;

public class MapperUtil {

    public static UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .departmentName(user.getDepartment().getName())
                .build();
    }

    public static LeaveApplicationResponse toLeaveApplicationResponse(LeaveApplication la) {
        return LeaveApplicationResponse.builder()
                .id(la.getId())
                .employeeName(la.getEmployee().getName())
                .employeeEmail(la.getEmployee().getEmail())
                .leaveTypeName(la.getLeaveType().getName())
                .startDate(la.getStartDate())
                .endDate(la.getEndDate())
                .totalDays(la.getTotalDays())
                .reason(la.getReason())
                .status(la.getStatus().name())
                .appliedAt(la.getAppliedAt())
                .reviewedByName(la.getReviewedBy() != null ? la.getReviewedBy().getName() : null)
                .reviewedAt(la.getReviewedAt())
                .remarks(la.getRemarks())
                .build();
    }

    public static LeaveBalanceResponse toLeaveBalanceResponse(LeaveBalance lb) {
        return LeaveBalanceResponse.builder()
                .leaveTypeId(lb.getLeaveType().getId())
                .leaveTypeName(lb.getLeaveType().getName())
                .totalDays(lb.getTotalDays())
                .usedDays(lb.getUsedDays())
                .remainingDays(lb.getRemainingDays())
                .year(lb.getYear())
                .build();
    }

    public static DepartmentResponse toDepartmentResponse(Department dept) {
        return DepartmentResponse.builder()
                .id(dept.getId())
                .name(dept.getName())
                .managerName(dept.getManagerUser() != null ? dept.getManagerUser().getName() : null)
                .build();
    }

    public static LeaveTypeResponse toLeaveTypeResponse(LeaveType lt) {
        return LeaveTypeResponse.builder()
                .id(lt.getId())
                .name(lt.getName())
                .maxDaysPerYear(lt.getMaxDaysPerYear())
                .description(lt.getDescription())
                .build();
    }
}
