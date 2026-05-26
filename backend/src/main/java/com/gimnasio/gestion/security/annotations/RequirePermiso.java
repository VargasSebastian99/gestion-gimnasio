package com.gimnasio.gestion.security.annotations;

import java.lang.annotation.*;
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequirePermiso {
    String value();
}
