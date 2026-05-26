package com.gimnasio.gestion.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter @Builder
public class ClienteResponseDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String email;
    private String direccion;
    private String observaciones;
    private boolean activo;
    private LocalDateTime fechaBaja;
    private LocalDateTime creadoEn;
    private LocalDateTime actualizadoEn;
}
