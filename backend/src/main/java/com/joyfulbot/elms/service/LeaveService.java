package com.joyfulbot.elms.service;

import com.joyfulbot.elms.dto.request.LeaveApplicationRequest;
import com.joyfulbot.elms.dto.request.ReviewRequest;
import com.joyfulbot.elms.dto.response.LeaveApplicationResponse;
import com.joyfulbot.elms.dto.response.LeaveBalanceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface LeaveService {
    LeaveApplicationResponse applyLeave(Long employeeId, LeaveApplicationRequest request);
    Page<LeaveApplicationResponse> getMyLeaves(Long employeeId, String status, Pageable pageable);
    LeaveApplicationResponse getLeaveById(Long leaveId, Long employeeId);
    LeaveApplicationResponse approveLeave(Long leaveId, Long managerId, ReviewRequest request);
    LeaveApplicationResponse rejectLeave(Long leaveId, Long managerId, ReviewRequest request);
    void cancelLeave(Long leaveId, Long employeeId);
    List<LeaveBalanceResponse> getMyBalances(Long employeeId);
}
