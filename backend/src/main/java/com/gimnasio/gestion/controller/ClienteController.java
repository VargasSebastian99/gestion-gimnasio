package com.gimnasio.gestion.controller;

import com.gimnasio.gestion.dto.ClienteListDTO;
import com.gimnasio.gestion.dto.ClienteRequestDTO;
import com.gimnasio.gestion.dto.ClienteResponseDTO;
import com.gimnasio.gestion.mapper.ClienteMapper;
import com.gimnasio.gestion.model.Cliente;
import com.gimnasio.gestion.security.annotations.RequirePermiso;
import com.gimnasio.gestion.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService service;
    private final ClienteMapper mapper;

    @RequirePermiso("CLIENTE_VER")
    @GetMapping
    public List<ClienteListDTO> getAll(){
        return service.findAll()
                .stream()
                .map(mapper::toList)
                .toList();
    }
    @RequirePermiso("CLIENTE_VER")
    @GetMapping("/{id}")
    public ClienteResponseDTO getById(@PathVariable Long id){
        return mapper.toResponse(service.findById(id));
    }
    @RequirePermiso("CLIENTE_CREAR")
    @PostMapping
    public ClienteResponseDTO create(@RequestBody ClienteRequestDTO dto){
        return mapper.toResponse(service.create(dto));
    }

    @RequirePermiso("CLIENTE_EDITAR")
    @PutMapping("/{id}")
    public ClienteResponseDTO update(@PathVariable Long id, @RequestBody ClienteRequestDTO dto){
        return mapper.toResponse(service.update(id,dto));
    }
    @RequirePermiso("CLIENTE_ELIMINAR")
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
}
