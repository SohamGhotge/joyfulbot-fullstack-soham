package com.joyfulbot.elms.repository;

import com.joyfulbot.elms.entity.LeaveApplication;
import com.joyfulbot.elms.enums.LeaveStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveApplicationRepository extends JpaRepository<LeaveApplication, Long> {
    Page<LeaveApplication> findByEmployeeId(Long employeeId, Pageable pageable);
    Page<LeaveApplication> findByEmployeeIdAndStatus(Long employeeId, LeaveStatus status, Pageable pageable);
    Page<LeaveApplication> findByEmployee_Department_Id(Long departmentId, Pageable pageable);
    Page<LeaveApplication> findByEmployee_Department_IdAndStatus(Long departmentId, LeaveStatus status, Pageable pageable);
    List<LeaveApplication> findByEmployee_Department_Id(Long departmentId);
}
