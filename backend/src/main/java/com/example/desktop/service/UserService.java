package com.example.desktop.service;

import com.example.desktop.entity.User;
import com.example.desktop.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(String username, String password) {
        if (repo.findByUsername(username).isPresent()) {
            throw new IllegalStateException("Пользователь уже есть");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return repo.save(user);
    }

    public boolean checkCredentials(String username, String password) {
        return repo.findByUsername(username)
                .map(u -> password.equals(u.getPassword()))
                .orElse(false);
    }

    public User findByUsername(String username) {
        return repo.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("Пользователь не найден"));
    }
}
