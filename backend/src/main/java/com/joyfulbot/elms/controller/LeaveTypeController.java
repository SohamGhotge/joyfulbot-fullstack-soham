package com.joyfulbot.elms.controller;

import com.joyfulbot.elms.dto.ApiResponse;
import com.joyfulbot.elms.repository.LeaveTypeRepository;
import com.joyfulbot.elms.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leave-types")
@RequiredArgsConstructor
public class LeaveTypeController {

    private final LeaveTypeRepository leaveTypeRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllLeaveTypes() {
        var leaveTypes = leaveTypeRepository.findAll().stream()
                .map(MapperUtil::toLeaveTypeResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok("Leave types fetched successfully", leaveTypes));
    }
}
