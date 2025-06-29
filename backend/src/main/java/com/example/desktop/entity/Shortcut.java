package com.example.desktop.entity;

import jakarta.persistence.*;

/** Ярлык на рабочем столе. */
@Entity
@Table(name = "shortcut")
public class Shortcut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private String url;
    private int x;
    private int y;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    /* ── геттеры / сеттеры ─────────────────────────────────────────── */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
