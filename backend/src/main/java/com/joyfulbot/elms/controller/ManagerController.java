package com.joyfulbot.elms.controller;

import com.joyfulbot.elms.dto.ApiResponse;
import com.joyfulbot.elms.entity.User;
import com.joyfulbot.elms.service.ManagerService;
import com.joyfulbot.elms.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerService managerService;
    private final SecurityUtil securityUtil;

    @GetMapping("/team-leaves")
    public ResponseEntity<ApiResponse<?>> getTeamLeaves(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status) {
        User currentUser = securityUtil.getCurrentUser();
        Pageable pageable = PageRequest.of(page, size, Sort.by("appliedAt").descending());
        return ResponseEntity.ok(ApiResponse.ok("Team leaves fetched successfully", managerService.getTeamLeaves(currentUser.getId(), status, pageable)));
    }

    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<?>> getAnalytics() {
        User currentUser = securityUtil.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.ok("Analytics fetched successfully", managerService.getTeamAnalytics(currentUser.getId())));
    }
}
