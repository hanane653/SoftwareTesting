package com.example.demo.Service;

import com.example.demo.Model.Demande;
import com.example.demo.Model.PieceJointe;
import com.example.demo.Model.StatutDemande;
import com.example.demo.demoRepository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DemandeService {

    @Autowired
    private DemandeRepository demandeRepository;

    public Demande creerDemande(Demande demande) {
        demande.setStatut(StatutDemande.EN_ATTENTE);
        demande.setDateSoumission(LocalDate.now());
        if (demande.getPiecesJointes() == null) {
            demande.setPiecesJointes(new ArrayList<>());
        }

        if (demande.getPiecesJointes() != null) {
            for (PieceJointe piece : demande.getPiecesJointes()) {
                piece.setDemande(demande);
            }
        }
        return demandeRepository.save(demande);
    }

    public List<Demande> getAllDemandes() {
        return demandeRepository.findAll();
    }

    public Demande traiterDemande(String id) {
        Demande d = demandeRepository.findById(id).orElseThrow();
        d.setStatut(StatutDemande.TRAITEE);
        d.setDateTraitement(LocalDate.now());
        return demandeRepository.save(d);
    }

    public List<Demande> getDemandesParStatut(StatutDemande statut) {
        return demandeRepository.findByStatut(statut);
    }
}

