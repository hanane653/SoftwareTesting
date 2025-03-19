package com.example.user_service.Model;

import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name = "utilisateur")
public class user {
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
@Column(name="role")
@Enumerated(EnumType.STRING)
private Role role;
@Column(name="password")
private String password;

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

    public Role getRoles() {
        return role;
    }

    public void setRoles(Role role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
