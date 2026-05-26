package com.gimnasio.gestion.security.entity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "permiso")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Permiso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 150, unique = true)
    private String codigo;
    @Column(length = 255)
    private String descripcion;
}
