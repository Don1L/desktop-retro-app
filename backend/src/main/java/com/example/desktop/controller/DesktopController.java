package com.example.desktop.controller;

import com.example.desktop.entity.Shortcut;
import com.example.desktop.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/desktop")
@CrossOrigin
public class DesktopController {

    private final UserService userService;

    public DesktopController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/shortcuts")
    public List<Shortcut> shortcuts(@RequestParam String username) {
        return userService.findByUsername(username).getShortcuts();
    }
}
