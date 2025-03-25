package com.example.user_service.Model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "utilisateur")
public class user implements UserDetails {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int Id_user;
@Column(name = "nom")
private String nom;
@Column (name = "prénom")
private String prenom;
@Column(name = "email")
private String email;
@Column(name="pole")
private String pole;
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private List<Role> roles;
@Column(name = "username")
private String username;
@Column(name="password")
private String password;


    @PrePersist
    public void prePersist() {
        if (password != null && !password.startsWith("$2a$")) {
            password = new BCryptPasswordEncoder().encode(password);
        }
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }

    public int getId_user() {
        return Id_user;
    }

    public void setId_user(int id_user) {
        Id_user = id_user;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPole() {
        return pole;
    }

    public void setPole(String pole) {
        this.pole = pole;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // assuming account is never expired, you can customize this logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // assuming account is never locked, you can customize this logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // assuming credentials are never expired, you can customize this logic
    }

    @Override
    public boolean isEnabled() {
        return true; // assuming account is always enabled, you can customize this logic
    }

}
