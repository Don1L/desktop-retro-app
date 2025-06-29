package com.example.desktop.repository;

import com.example.desktop.entity.Shortcut;
import com.example.desktop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShortcutRepository extends JpaRepository<Shortcut, Long> {
    List<Shortcut> findByUser(User user);
}
