package com.ventas.Ventas;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class GenerarHashPassword {
    public static void main(String[] args) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String passwordPlain = "operador123";  // Cambia por la contraseña que quieres cifrar
        String passwordHash = encoder.encode(passwordPlain);
        System.out.println("Hashed password: " + passwordHash);
    }
}