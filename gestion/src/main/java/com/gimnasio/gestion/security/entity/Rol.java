package com.gimnasio.gestion.security.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name ="rol")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100, unique = true)
    private String nombre;
    @Column(length = 255)
    private String descripcion;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "rol_permisos",
            joinColumns = @JoinColumn(name = "rol_id"),
            inverseJoinColumns = @JoinColumn(name = "permiso_id")
    )
    private java.util.Set<Permiso> permisos = new java.util.HashSet<>();
}
