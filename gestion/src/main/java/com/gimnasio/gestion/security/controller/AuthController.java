package com.gimnasio.gestion.security.controller;

import com.gimnasio.gestion.security.dto.LoginRequest;
import com.gimnasio.gestion.security.dto.LoginResponse;
import com.gimnasio.gestion.security.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authManager, JwtService jwtService){
        this.authManager = authManager;
        this.jwtService = jwtService;
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        var authToken = new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        );
        authManager.authenticate(authToken);
        String token = jwtService.generateToken(request.getUsername());
        return new LoginResponse(token);
    }
}
