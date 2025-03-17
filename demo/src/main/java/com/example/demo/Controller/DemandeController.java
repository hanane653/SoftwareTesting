package com.example.demo.Controller;

import com.example.demo.Model.Demande;
import com.example.demo.Model.StatutDemande;
import com.example.demo.Service.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/demandes")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;

    @PostMapping
    public ResponseEntity<Demande> creerDemande(@RequestBody Demande demande) {
        return ResponseEntity.ok(demandeService.creerDemande(demande));
    }

    @GetMapping
    public ResponseEntity<List<Demande>> getAllDemandes() {
        return ResponseEntity.ok(demandeService.getAllDemandes());
    }

    @PutMapping("/{id}/traiter")
    public ResponseEntity<Demande> traiterDemande(@PathVariable String id) {
        return ResponseEntity.ok(demandeService.traiterDemande(id));
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<Demande>> getByStatut(@PathVariable StatutDemande statut) {
        return ResponseEntity.ok(demandeService.getDemandesParStatut(statut));
    }
}

