package com.gimnasio.gestion.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ServicioRequestDTO {
    @NotBlank
    private String nombre;
    private String descripcion;
    private boolean activo;
}
