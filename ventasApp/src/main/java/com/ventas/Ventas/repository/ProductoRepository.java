package com.ventas.Ventas.repository;

import com.ventas.Ventas.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}