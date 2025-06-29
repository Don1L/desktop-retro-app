package com.example.desktop.service;

import com.example.desktop.entity.Shortcut;
import com.example.desktop.entity.User;
import com.example.desktop.repository.ShortcutRepository;
import com.example.desktop.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DesktopService {

    private final ShortcutRepository shortcutRepository;
    private final UserRepository userRepository;

    public DesktopService(ShortcutRepository shortcutRepository, UserRepository userRepository) {
        this.shortcutRepository = shortcutRepository;
        this.userRepository = userRepository;
    }

    public List<Shortcut> getUserShortcuts(String username) {
        return userRepository.findByUsername(username)
                .map(shortcutRepository::findByUser)
                .orElse(List.of());
    }

    public Shortcut addShortcut(String username, Shortcut shortcut) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    shortcut.setUser(user);
                    return shortcutRepository.save(shortcut);
                })
                .orElse(null);
    }
}
