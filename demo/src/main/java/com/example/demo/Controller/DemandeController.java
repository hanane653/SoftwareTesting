package com.example.demo.Controller;

import com.example.demo.Model.*;
import com.example.demo.Service.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/demandes")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping
    public ResponseEntity<?> creerDemande(
            @RequestParam("titre") String titre,
            @RequestParam("description") String description,
            @RequestParam("type") TypeDemande type,
            @RequestParam("priorite") PrioriteDemande priorite,
            @RequestParam("dateTraitement") LocalDate dateTraitement,
            @RequestParam(value = "piecesJointes", required = false) MultipartFile[] files) {


        Demande demande = new Demande();
        demande.setTitre(titre);
        demande.setDescription(description);
        demande.setType(type);
        demande.setPriorite(priorite);
        demande.setDateTraitement(dateTraitement);
        if(demande.getPiecesJointes() == null)
        {
            demande.setPiecesJointes(new ArrayList<>());
        }

        if (files != null && files.length > 0) {
            for (MultipartFile file : files) {
                Path filePath = Paths.get(uploadDir).resolve(file.getOriginalFilename());
                try (var inputStream = file.getInputStream()) {
                    Files.copy(inputStream, filePath);

                    PieceJointe pieceJointe = new PieceJointe();
                    pieceJointe.setNomFichier(file.getOriginalFilename());
                    pieceJointe.setCheminFichier(filePath.toString());
                    pieceJointe.setDemande(demande);


                    demande.getPiecesJointes().add(pieceJointe);

                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(500).body("Erreur lors du téléchargement des fichiers.");
                }
            }


            return ResponseEntity.ok(demandeService.creerDemande(demande));
        }

        return ResponseEntity.status(400).body("Aucun fichier téléchargé.");
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

    @PostMapping("/{idDemande}/ajouterFichier")
    public ResponseEntity<String> addFileToDemande(
            @PathVariable int idDemande,
            @RequestParam("file") MultipartFile file) {

        // Check if the file is empty
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Aucun fichier sélectionné.");
        }

        // Ensure the upload directory exists
        try {
            Files.createDirectories(Paths.get(uploadDir));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors de la création du répertoire.");
        }

        // Generate the path to store the file
        Path path = Paths.get(uploadDir, file.getOriginalFilename());

        try {
            // Save the file to the specified path
            file.transferTo(path.toFile());
            // You can also save file information in the database if needed
            return ResponseEntity.ok("Fichier téléchargé avec succès.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors du téléchargement du fichier.");
        }
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Erreur : " + ex.getMessage());
    }
}
