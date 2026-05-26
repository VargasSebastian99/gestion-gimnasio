package com.gimnasio.gestion.security.service;

import com.gimnasio.gestion.security.entity.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {
    private final Usuario usuario;
    public CustomUserDetails(Usuario usuario){
        this.usuario = usuario;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return usuario.getRoles().stream()
                .flatMap(rol -> rol.getPermisos().stream())
                .map(permiso -> new SimpleGrantedAuthority(permiso.getCodigo()))
                .collect(Collectors.toSet());
    }
    @Override
    public String getPassword(){
        return usuario.getPasswordHash();
    }
    @Override
    public String getUsername(){
        return usuario.getUsername();
    }
    @Override
    public boolean isAccountNonExpired() {
        return usuario.getActivo();
    }
    @Override
    public boolean isAccountNonLocked(){
        return usuario.getActivo();
    }
    @Override
    public boolean isCredentialsNonExpired(){
        return usuario.getActivo();
    }
    @Override
    public boolean isEnabled(){
        return usuario.getActivo();
    }
}
