package com.example.desktop.controller;

import com.example.desktop.dto.LoginRequest;
import com.example.desktop.dto.RegisterRequest;
import com.example.desktop.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        var user = userService.register(req.getUsername(), req.getPassword());
        return ResponseEntity.ok(user.getId());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        boolean success = userService.checkCredentials(req.getUsername(), req.getPassword());
        return ResponseEntity.ok(success);
    }
}
