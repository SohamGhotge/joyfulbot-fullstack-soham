package com.joyfulbot.elms.service;

import com.joyfulbot.elms.dto.request.LoginRequest;
import com.joyfulbot.elms.dto.request.RegisterRequest;
import com.joyfulbot.elms.dto.response.AuthResponse;
import com.joyfulbot.elms.dto.response.UserResponse;

public interface AuthService {
    UserResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
