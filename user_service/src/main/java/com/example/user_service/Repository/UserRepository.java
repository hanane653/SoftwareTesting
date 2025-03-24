package com.example.user_service.Repository;

import com.example.user_service.Model.Role;
import com.example.user_service.Model.user;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<user,String> {

    List<user> findAllById(Iterable<String> strings);

    Optional<user> findByUsername(String username);
}
