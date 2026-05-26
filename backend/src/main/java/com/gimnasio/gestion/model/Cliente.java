package com.gimnasio.gestion.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name="clientes")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String nombre;
    @Column(nullable = false, length = 100)
    private String apellido;
    @Column(unique = true)
    private String dni;
    private String telefono;
    private String email;
    private String direccion;
    @Column(columnDefinition = "TEXT")
    private String observaciones;
    @Column(nullable = false)
    private boolean activo = true;
    private LocalDateTime fechaBaja;
    @Column(nullable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();
    @Column(nullable = false)
    private LocalDateTime actualizadoEn = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.actualizadoEn = LocalDateTime.now();
    }
}
