package com.example.user_service.service;

import com.example.user_service.Model.Role;
import com.example.user_service.Model.user;
import com.example.user_service.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<user> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<user> getUserById(String id) {
        return userRepository.findById(id);
    }

    public user createUser(user user) {
        return userRepository.save(user);
    }

    public boolean hasPermissionToCreateDemande(user user) {
        Role role = user.getRoles(); // ici c’est un seul rôle
        return role == Role.RESPONSABLE_POLE || role == Role.RESSOURCE_TESTING;
    }

    public user updateUser(String id, user updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setNom(updatedUser.getNom());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setRoles(updatedUser.getRoles());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}

