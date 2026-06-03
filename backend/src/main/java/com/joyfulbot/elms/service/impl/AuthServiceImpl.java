package com.joyfulbot.elms.service.impl;

import com.joyfulbot.elms.dto.request.LoginRequest;
import com.joyfulbot.elms.dto.request.RegisterRequest;
import com.joyfulbot.elms.dto.response.AuthResponse;
import com.joyfulbot.elms.dto.response.UserResponse;
import com.joyfulbot.elms.entity.Department;
import com.joyfulbot.elms.entity.User;
import com.joyfulbot.elms.enums.Role;
import com.joyfulbot.elms.repository.DepartmentRepository;
import com.joyfulbot.elms.repository.UserRepository;
import com.joyfulbot.elms.security.JwtUtil;
import com.joyfulbot.elms.service.AuthService;
import com.joyfulbot.elms.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.EMPLOYEE)
                .department(department)
                .createdAt(LocalDateTime.now())
                .build();
        User saved = userRepository.save(user);
        return MapperUtil.toUserResponse(saved);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .departmentName(user.getDepartment().getName())
                .build();
    }
}
