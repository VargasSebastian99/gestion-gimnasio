package com.gimnasio.gestion.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="servicios")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Servicio {
    /*id,nombre, descripción, activo*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String nombre;
    @Column(nullable = false, length = 250)
    private String descripcion;
    private boolean activo = true;

}
