package com.joyfulbot.elms.service.impl;

import com.joyfulbot.elms.dto.request.LeaveApplicationRequest;
import com.joyfulbot.elms.dto.request.ReviewRequest;
import com.joyfulbot.elms.dto.response.LeaveApplicationResponse;
import com.joyfulbot.elms.dto.response.LeaveBalanceResponse;
import com.joyfulbot.elms.entity.*;
import com.joyfulbot.elms.enums.LeaveStatus;
import com.joyfulbot.elms.repository.*;
import com.joyfulbot.elms.service.LeaveService;
import com.joyfulbot.elms.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveApplicationRepository leaveApplicationRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final UserRepository userRepository;
    private final LeaveTypeRepository leaveTypeRepository;

    @Override
    @Transactional
    public LeaveApplicationResponse applyLeave(Long employeeId, LeaveApplicationRequest request) {
        if (request.getStartDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Start date cannot be in the past");
        }
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new RuntimeException("End date cannot be before start date");
        }
        int totalDays = (int) (request.getStartDate().datesUntil(request.getEndDate().plusDays(1))
                .filter(d -> d.getDayOfWeek().getValue() < 6)
                .count());
        if (totalDays == 0) {
            throw new RuntimeException("Leave must include at least one working day");
        }
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        LeaveType leaveType = leaveTypeRepository.findById(request.getLeaveTypeId())
                .orElseThrow(() -> new RuntimeException("Leave type not found"));
        int year = request.getStartDate().getYear();
        LeaveBalance balance = leaveBalanceRepository
                .findByUserIdAndLeaveTypeIdAndYear(employeeId, leaveType.getId(), year)
                .orElseThrow(() -> new RuntimeException("Leave balance not found for this leave type"));
        if (balance.getRemainingDays() < totalDays) {
            throw new RuntimeException("Insufficient leave balance. Available: " + balance.getRemainingDays() + " days");
        }
        LeaveApplication application = LeaveApplication.builder()
                .employee(employee)
                .leaveType(leaveType)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .totalDays(totalDays)
                .reason(request.getReason())
                .status(LeaveStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();
        LeaveApplication saved = leaveApplicationRepository.save(application);
        System.out.println("Leave application submitted for: " + employee.getEmail());
        return MapperUtil.toLeaveApplicationResponse(saved);
    }

    @Override
    public Page<LeaveApplicationResponse> getMyLeaves(Long employeeId, String status, Pageable pageable) {
        Page<LeaveApplication> page;
        if (status != null && !status.isEmpty()) {
            LeaveStatus leaveStatus = LeaveStatus.valueOf(status.toUpperCase());
            page = leaveApplicationRepository.findByEmployeeIdAndStatus(employeeId, leaveStatus, pageable);
        } else {
            page = leaveApplicationRepository.findByEmployeeId(employeeId, pageable);
        }
        return page.map(MapperUtil::toLeaveApplicationResponse);
    }

    @Override
    public LeaveApplicationResponse getLeaveById(Long leaveId, Long employeeId) {
        LeaveApplication application = leaveApplicationRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave application not found"));
        if (!application.getEmployee().getId().equals(employeeId)) {
            throw new RuntimeException("Access denied");
        }
        return MapperUtil.toLeaveApplicationResponse(application);
    }

    @Override
    @Transactional
    public LeaveApplicationResponse approveLeave(Long leaveId, Long managerId, ReviewRequest request) {
        LeaveApplication application = leaveApplicationRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave application not found"));
        if (application.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Only pending applications can be approved");
        }
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));
        application.setStatus(LeaveStatus.APPROVED);
        application.setReviewedBy(manager);
        application.setReviewedAt(LocalDateTime.now());
        application.setRemarks(request.getRemarks());
        int year = application.getStartDate().getYear();
        LeaveBalance balance = leaveBalanceRepository
                .findByUserIdAndLeaveTypeIdAndYear(
                        application.getEmployee().getId(),
                        application.getLeaveType().getId(),
                        year)
                .orElseThrow(() -> new RuntimeException("Leave balance not found"));
        balance.setUsedDays(balance.getUsedDays() + application.getTotalDays());
        balance.setRemainingDays(balance.getRemainingDays() - application.getTotalDays());
        leaveBalanceRepository.save(balance);
        LeaveApplication saved = leaveApplicationRepository.save(application);
        System.out.println("Leave approved for: " + application.getEmployee().getEmail());
        return MapperUtil.toLeaveApplicationResponse(saved);
    }

    @Override
    @Transactional
    public LeaveApplicationResponse rejectLeave(Long leaveId, Long managerId, ReviewRequest request) {
        LeaveApplication application = leaveApplicationRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave application not found"));
        if (application.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Only pending applications can be rejected");
        }
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));
        application.setStatus(LeaveStatus.REJECTED);
        application.setReviewedBy(manager);
        application.setReviewedAt(LocalDateTime.now());
        application.setRemarks(request.getRemarks());
        LeaveApplication saved = leaveApplicationRepository.save(application);
        System.out.println("Leave rejected for: " + application.getEmployee().getEmail());
        return MapperUtil.toLeaveApplicationResponse(saved);
    }

    @Override
    @Transactional
    public void cancelLeave(Long leaveId, Long employeeId) {
        LeaveApplication application = leaveApplicationRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave application not found"));
        if (!application.getEmployee().getId().equals(employeeId)) {
            throw new RuntimeException("Access denied");
        }
        if (application.getStatus() != LeaveStatus.PENDING) {
            throw new RuntimeException("Only pending applications can be cancelled");
        }
        leaveApplicationRepository.delete(application);
    }

    @Override
    public List<LeaveBalanceResponse> getMyBalances(Long employeeId) {
        int year = LocalDate.now().getYear();
        List<LeaveBalance> balances = leaveBalanceRepository.findByUserIdAndYear(employeeId, year);
        return balances.stream().map(MapperUtil::toLeaveBalanceResponse).collect(Collectors.toList());
    }
}
