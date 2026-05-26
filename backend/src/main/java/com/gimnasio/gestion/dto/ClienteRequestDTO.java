package com.gimnasio.gestion.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteRequestDTO {
    @NotBlank
    private String nombre;
    @NotBlank
    private String apellido;

    private String dni;
    private String telefono;
    private String email;
    private String direccion;
    private String observaciones;

    private boolean activo = true;
}
