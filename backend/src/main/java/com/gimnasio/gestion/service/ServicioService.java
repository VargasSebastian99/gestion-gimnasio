package com.gimnasio.gestion.service;

import com.gimnasio.gestion.dto.ServicioRequestDTO;
import com.gimnasio.gestion.exception.NotFoundException;
import com.gimnasio.gestion.mapper.ServicioMapper;
import com.gimnasio.gestion.model.Servicio;
import com.gimnasio.gestion.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicioService {
    private final ServicioRepository repo;
    private final ServicioMapper mapper;

    public List<Servicio> findAll(){
        return repo.findAll()
                .stream()
                .filter(Servicio::isActivo)
                .toList();
    }
    public Servicio findById(Long id){
        return repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Servicio no encontrado"));
    }
    public Servicio save(Servicio servicio){
        return repo.save(servicio);
    }
    public Servicio update(Long id, ServicioRequestDTO dto){
        Servicio s = findById(id);

        s.setNombre(dto.getNombre());
        s.setDescripcion(dto.getDescripcion());
        s.setActivo(dto.isActivo());
        return repo.save(s);
    }
    public Servicio create(ServicioRequestDTO dto){
        Servicio s = mapper.toEntity(dto);
        s.setActivo(true);
        return repo.save(s);
    }
    public void delete(Long id){
        Servicio s = findById(id);
        s.setActivo(false);
        repo.save(s);
    }
}
