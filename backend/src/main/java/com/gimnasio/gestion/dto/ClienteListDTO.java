package com.gimnasio.gestion.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Builder
public class ClienteListDTO {
    private Long id;
    private String nombreCompleto;
    private String dni;
    private String telefono;
    private boolean activo;
}
