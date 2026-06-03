package com.joyfulbot.elms.service.impl;

import com.joyfulbot.elms.dto.response.AnalyticsResponse;
import com.joyfulbot.elms.dto.response.LeaveApplicationResponse;
import com.joyfulbot.elms.entity.LeaveApplication;
import com.joyfulbot.elms.entity.User;
import com.joyfulbot.elms.enums.LeaveStatus;
import com.joyfulbot.elms.repository.LeaveApplicationRepository;
import com.joyfulbot.elms.repository.UserRepository;
import com.joyfulbot.elms.service.ManagerService;
import com.joyfulbot.elms.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ManagerServiceImpl implements ManagerService {

    private final LeaveApplicationRepository leaveApplicationRepository;
    private final UserRepository userRepository;

    @Override
    public Page<LeaveApplicationResponse> getTeamLeaves(Long managerId, String status, Pageable pageable) {
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));
        Long departmentId = manager.getDepartment().getId();
        Page<LeaveApplication> page;
        if (status != null && !status.isEmpty()) {
            LeaveStatus leaveStatus = LeaveStatus.valueOf(status.toUpperCase());
            page = leaveApplicationRepository.findByEmployee_Department_IdAndStatus(departmentId, leaveStatus, pageable);
        } else {
            page = leaveApplicationRepository.findByEmployee_Department_Id(departmentId, pageable);
        }
        return page.map(MapperUtil::toLeaveApplicationResponse);
    }

    @Override
    public AnalyticsResponse getTeamAnalytics(Long managerId) {
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));
        Long departmentId = manager.getDepartment().getId();
        List<LeaveApplication> all = leaveApplicationRepository.findByEmployee_Department_Id(departmentId);
        long pending = all.stream().filter(l -> l.getStatus() == LeaveStatus.PENDING).count();
        long approved = all.stream().filter(l -> l.getStatus() == LeaveStatus.APPROVED).count();
        long rejected = all.stream().filter(l -> l.getStatus() == LeaveStatus.REJECTED).count();
        return AnalyticsResponse.builder()
                .pending(pending)
                .approved(approved)
                .rejected(rejected)
                .total(all.size())
                .build();
    }
}
