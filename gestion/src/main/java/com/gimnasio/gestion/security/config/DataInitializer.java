package com.gimnasio.gestion.security.config;

import com.gimnasio.gestion.security.entity.Permiso;
import com.gimnasio.gestion.security.entity.Rol;
import com.gimnasio.gestion.security.entity.Usuario;
import com.gimnasio.gestion.security.repository.PermisoRepository;
import com.gimnasio.gestion.security.repository.RolRepository;
import com.gimnasio.gestion.security.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer implements CommandLineRunner {
    private final PermisoRepository permisoRepository;
    private final RolRepository rolRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(PermisoRepository permisoRepository, RolRepository rolRepository,
                           UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder){
        this.permisoRepository = permisoRepository;
        this.rolRepository = rolRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public void run(String... args){
        // Permisos base
        List<String> permisos = List.of(
                "CLIENTE_VER", "CLIENTE_CREAR", "CLIENTE_EDITAR",
                "PLAN_VER", "PLAN_CREAR",
                "COBRO_REGISTRAR"
        );
        permisos.forEach(codigo ->
                    permisoRepository.findByCodigo(codigo)
                            .orElseGet(() -> permisoRepository.save(new Permiso(null,codigo, null)))
        );
        //Roles
        Rol admin = rolRepository.findByNombre("ADMIN")
                .orElseGet(() -> rolRepository.save(new Rol(null,"ADMIN", "Administrador", null)));
        admin.setPermisos(Set.copyOf(permisoRepository.findAll()));
        rolRepository.save(admin);

        //usuario admin
        if(usuarioRepository.findByUsername("admin").isEmpty()){
            Usuario u = Usuario.builder()
                    .nombre("Administrador")
                    .apellido("Administrador")
                    .username("admin")
                    .email("admin@gimnasio.com")
                    .passwordHash(passwordEncoder.encode("admin"))
                    .roles(Set.of(admin))
                    .activo(true)
                    .build();
            usuarioRepository.save(u);
        }
    }
}
