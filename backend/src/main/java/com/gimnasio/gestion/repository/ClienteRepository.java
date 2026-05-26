package com.gimnasio.gestion.repository;

import com.gimnasio.gestion.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByDni(String dni);
}
