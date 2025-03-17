package com.example.user_service.Repository;

import com.example.user_service.Model.Role;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,String> {

    List<User> findAllById(Iterable<String> strings);
    List<User> findByRole(Role role);
}
