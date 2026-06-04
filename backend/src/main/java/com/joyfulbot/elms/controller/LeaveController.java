package com.joyfulbot.elms.controller;

import com.joyfulbot.elms.dto.ApiResponse;
import com.joyfulbot.elms.dto.request.LeaveApplicationRequest;
import com.joyfulbot.elms.dto.request.ReviewRequest;
import com.joyfulbot.elms.entity.User;
import com.joyfulbot.elms.service.LeaveService;
import com.joyfulbot.elms.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;
    private final SecurityUtil securityUtil;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> applyLeave(@Valid @RequestBody LeaveApplicationRequest request) {
        User currentUser = securityUtil.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.ok("Leave applied successfully", leaveService.applyLeave(currentUser.getId(), request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getMyLeaves(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status) {
        User currentUser = securityUtil.getCurrentUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by("appliedAt").descending());
        return ResponseEntity.ok(ApiResponse.ok("Leaves fetched successfully", leaveService.getMyLeaves(currentUser.getId(), status, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getLeaveById(@PathVariable Long id) {
        User currentUser = securityUtil.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.ok("Leave fetched successfully", leaveService.getLeaveById(id, currentUser.getId())));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<?>> approveLeave(@PathVariable Long id, @RequestBody ReviewRequest request) {
        User currentUser = securityUtil.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.ok("Leave approved successfully", leaveService.approveLeave(id, currentUser.getId(), request)));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<?>> rejectLeave(@PathVariable Long id, @RequestBody ReviewRequest request) {
        User currentUser = securityUtil.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.ok("Leave rejected successfully", leaveService.rejectLeave(id, currentUser.getId(), request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> cancelLeave(@PathVariable Long id) {
        User currentUser = securityUtil.getCurrentUser();
        leaveService.cancelLeave(id, currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok("Leave cancelled successfully", null));
    }

    @GetMapping("/balance")
    public ResponseEntity<ApiResponse<?>> getMyBalances() {
        User currentUser = securityUtil.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.ok("Balances fetched successfully", leaveService.getMyBalances(currentUser.getId())));
    }
}
