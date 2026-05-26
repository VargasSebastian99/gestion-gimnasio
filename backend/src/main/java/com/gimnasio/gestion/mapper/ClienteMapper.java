package com.gimnasio.gestion.mapper;

import com.gimnasio.gestion.dto.ClienteListDTO;
import com.gimnasio.gestion.dto.ClienteRequestDTO;
import com.gimnasio.gestion.dto.ClienteResponseDTO;
import com.gimnasio.gestion.model.Cliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {

    public ClienteResponseDTO toResponse(Cliente c){
        return ClienteResponseDTO.builder()
                .id(c.getId())
                .nombre(c.getNombre())
                .apellido(c.getApellido())
                .dni(c.getDni())
                .telefono(c.getTelefono())
                .email(c.getEmail())
                .direccion(c.getDireccion())
                .observaciones(c.getObservaciones())
                .activo(c.isActivo())
                .fechaBaja(c.getFechaBaja())
                .creadoEn(c.getCreadoEn())
                .actualizadoEn(c.getActualizadoEn())
                .build();
    }

    public ClienteListDTO toList(Cliente c){
        return ClienteListDTO.builder()
                .id(c.getId())
                .nombreCompleto(c.getNombre() + " " + c.getApellido())
                .dni(c.getDni())
                .telefono(c.getTelefono())
                .activo(c.isActivo())
                .build();
    }
    public Cliente toEntity(ClienteRequestDTO dto){
        return Cliente.builder()
                .nombre(dto.getNombre())
                .apellido(dto.getApellido())
                .dni(dto.getDni())
                .telefono(dto.getTelefono())
                .email(dto.getEmail())
                .direccion(dto.getDireccion())
                .observaciones(dto.getObservaciones())
                .activo(dto.isActivo())
                .build();
    }
}
