package com.gimnasio.gestion.security.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String nombre;
    @Column(nullable = false, length = 100)
    private String apellido;
    @Column(name="username", nullable = false, length = 100, unique = true)
    private String username;
    @Column(name="password_hash", nullable = false, length = 255)
    private String passwordHash;
    @Column(nullable = false, length = 150)
    private String email;
    @Column(nullable = false)
    private Boolean activo = true;
    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn;
    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "usuario_roles",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "rol_id")
    )
    private java.util.Set<Rol> roles = new java.util.HashSet<>();

    @PrePersist
    public void prePersist(){
        this.creadoEn = LocalDateTime.now();
        this.actualizadoEn = LocalDateTime.now();
        if (activo == null){
            activo = true;
        }
    }
    @PreUpdate
    public void preUpdate(){
        this.actualizadoEn = LocalDateTime.now();
    }
}
