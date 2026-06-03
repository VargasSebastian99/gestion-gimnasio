package com.gimnasio.gestion.controller;

import com.gimnasio.gestion.dto.*;
import com.gimnasio.gestion.mapper.ServicioMapper;
import com.gimnasio.gestion.security.annotations.RequirePermiso;
import com.gimnasio.gestion.service.ServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicios")
@RequiredArgsConstructor
public class ServicioController {

    private final ServicioService service;
    private final ServicioMapper mapper;

    @RequirePermiso("SERVICIO_VER")
    @GetMapping
    public List<ServicioListDTO> getAll(){
        return service.findAll()
                .stream()
                .map(mapper::toList)
                .toList();
    }
    @RequirePermiso("SERVICIO_VER")
    @GetMapping("/{id}")
    public ServicioResponseDTO getById(@PathVariable Long id){
        return mapper.toResponse(service.findById(id));
    }
    @RequirePermiso("SERVICIO_CREAR")
    @PostMapping
    public ServicioResponseDTO create(@RequestBody ServicioRequestDTO dto){
        return mapper.toResponse(service.create(dto));
    }
    @RequirePermiso("SERVICIO_EDITAR")
    @PutMapping("/{id}")
    public ServicioResponseDTO update(@PathVariable Long id, @RequestBody ServicioRequestDTO dto){
        return mapper.toResponse(service.update(id,dto));
    }
    @RequirePermiso("SERVICIO_ELIMINAR")
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

}
