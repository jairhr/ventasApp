package com.ventas.Ventas.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clientes", schema = "oms")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    private String correo;
}
