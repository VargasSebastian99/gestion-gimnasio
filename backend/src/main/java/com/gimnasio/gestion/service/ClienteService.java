package com.gimnasio.gestion.service;

import com.gimnasio.gestion.dto.ClienteRequestDTO;
import com.gimnasio.gestion.exception.BadRequestException;
import com.gimnasio.gestion.exception.NotFoundException;
import com.gimnasio.gestion.mapper.ClienteMapper;
import com.gimnasio.gestion.model.Cliente;
import com.gimnasio.gestion.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository repo;
    private final ClienteMapper mapper;

    public List<Cliente> findAll() {
        return repo.findAll()
                .stream()
                .filter(Cliente::isActivo)
                .toList();
    }

    public Cliente findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente no encontrado"));
    }

    public Cliente save(Cliente cliente) {

        if (cliente.getDni() != null && repo.existsByDni(cliente.getDni())) {
            throw new BadRequestException("El DNI ya está registrado");
        }

        return repo.save(cliente);
    }

    public Cliente update(Long id, ClienteRequestDTO dto) {

        Cliente c = findById(id);

        c.setNombre(dto.getNombre());
        c.setApellido(dto.getApellido());
        c.setDni(dto.getDni());
        c.setTelefono(dto.getTelefono());
        c.setEmail(dto.getEmail());
        c.setDireccion(dto.getDireccion());
        c.setObservaciones(dto.getObservaciones());
        c.setActivo(dto.isActivo());

        if (!dto.isActivo() && c.getFechaBaja() == null) {
            c.setFechaBaja(LocalDateTime.now());
        }

        return repo.save(c);
    }
    public Cliente create(ClienteRequestDTO dto) {

        if (dto.getDni() != null && repo.existsByDni(dto.getDni())) {
            throw new BadRequestException("El DNI ya está registrado");
        }

        Cliente c = mapper.toEntity(dto);

        c.setActivo(true);
        c.setCreadoEn(LocalDateTime.now());
        c.setActualizadoEn(LocalDateTime.now());
        c.setFechaBaja(null);

        return repo.save(c);
    }



    public void delete(Long id) {
        Cliente c = findById(id);

        c.setActivo(false);
        c.setFechaBaja(LocalDateTime.now());

        repo.save(c);
    }
}
