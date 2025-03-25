package com.example.user_service.controller;

import com.example.user_service.Model.user;
import com.example.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/login")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        // Authenticate user
        Optional<user> authenticatedUser = userService.authenticate(username, password);
        if (authenticatedUser.isPresent()) {
            // Set the authentication context
            Authentication authentication = new UsernamePasswordAuthenticationToken(authenticatedUser.get(), null, authenticatedUser.get().getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}