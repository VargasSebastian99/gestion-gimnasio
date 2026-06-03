package com.gimnasio.gestion.mapper;

import com.gimnasio.gestion.dto.ServicioListDTO;
import com.gimnasio.gestion.dto.ServicioRequestDTO;
import com.gimnasio.gestion.dto.ServicioResponseDTO;
import com.gimnasio.gestion.model.Servicio;
import org.springframework.stereotype.Component;

@Component
public class ServicioMapper {
    public ServicioResponseDTO toResponse(Servicio s){
        return ServicioResponseDTO.builder()
                .id(s.getId())
                .nombre(s.getNombre())
                .descripcion(s.getDescripcion())
                .activo(s.isActivo())
                .build();
    }
    public ServicioListDTO toList(Servicio s){
        return ServicioListDTO.builder()
                .id(s.getId())
                .nombre(s.getNombre())
                .descripcion(s.getDescripcion())
                .activo(s.isActivo())
                .build();
    }
    public Servicio toEntity(ServicioRequestDTO dto){
        return Servicio.builder()
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .activo(dto.isActivo())
                .build();
    }
}
