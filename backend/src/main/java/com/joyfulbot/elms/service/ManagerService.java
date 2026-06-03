package com.joyfulbot.elms.service;

import com.joyfulbot.elms.dto.response.AnalyticsResponse;
import com.joyfulbot.elms.dto.response.LeaveApplicationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ManagerService {
    Page<LeaveApplicationResponse> getTeamLeaves(Long managerId, String status, Pageable pageable);
    AnalyticsResponse getTeamAnalytics(Long managerId);
}
