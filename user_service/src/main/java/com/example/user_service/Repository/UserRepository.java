package com.example.user_service.Repository;

import com.example.user_service.Model.Role;
import com.example.user_service.Model.user;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<user,String> {

    List<user> findAllById(Iterable<String> strings);
    List<user> findByRole(Role role);

}
