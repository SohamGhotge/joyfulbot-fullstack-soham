package com.joyfulbot.elms.controller;

import com.joyfulbot.elms.dto.ApiResponse;
import com.joyfulbot.elms.dto.response.DepartmentResponse;
import com.joyfulbot.elms.repository.DepartmentRepository;
import com.joyfulbot.elms.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentRepository departmentRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllDepartments() {
        var departments = departmentRepository.findAll().stream()
                .map(MapperUtil::toDepartmentResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok("Departments fetched successfully", departments));
    }
}
