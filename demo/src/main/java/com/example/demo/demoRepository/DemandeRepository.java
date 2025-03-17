package com.example.demo.demoRepository;

import com.example.demo.Model.Demande;
import com.example.demo.Model.StatutDemande;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DemandeRepository extends JpaRepository<Demande,String> {

    List<Demande> findByStatut(StatutDemande statut);
    List<Demande> findAllById(Iterable<String> strings);
}
