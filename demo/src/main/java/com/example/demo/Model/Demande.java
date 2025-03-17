package com.example.demo.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "demande")
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id_Demande;
    @Column(name = "titre")
    private String titre;
    @Column(name = "description")
    private String description;
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TypeDemande type;
    @Column(name = "priorite")
    @Enumerated(EnumType.STRING)
    private PrioriteDemande priorite;
    @Column(name = "statut")
    @Enumerated(EnumType.STRING)
    private StatutDemande statut;

    @Column(name = "dateSoumission")
    private LocalDate dateSoumission;
    @Column(name = "dateTraitement")
    private LocalDate dateTraitement;


    public int getId_Demande() {
        return Id_Demande;
    }

    public void setId_Demande(int id_Demande) {
        Id_Demande = id_Demande;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public PrioriteDemande getPriorite() {
        return priorite;
    }

    public void setPriorite(PrioriteDemande priorite) {
        this.priorite = priorite;
    }

    public StatutDemande getStatut() {
        return statut;
    }

    public void setStatut(StatutDemande statut) {
        this.statut = statut;
    }

    public LocalDate getDateSoumission() {
        return dateSoumission;
    }

    public void setDateSoumission(LocalDate dateSoumission) {
        this.dateSoumission = dateSoumission;
    }

    public LocalDate getDateTraitement() {
        return dateTraitement;
    }

    public void setDateTraitement(LocalDate dateTraitement) {
        this.dateTraitement = dateTraitement;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public TypeDemande getType() {
        return type;
    }

    public void setType(TypeDemande type) {
        this.type = type;
    }
}

