package com.ventas.Ventas.service;

import com.ventas.Ventas.entity.Producto;
import com.ventas.Ventas.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepo;

    public ProductoService(ProductoRepository productoRepo) {
        this.productoRepo = productoRepo;
    }

    public List<Producto> listar() {
        return productoRepo.findAll();
    }

    public Optional<Producto> obtenerPorId(Integer id) {
        return productoRepo.findById(id);
    }

    public Producto crear(Producto producto) {
        return productoRepo.save(producto);
    }

    public Producto actualizar(Integer id, Producto nuevo) {
        return productoRepo.findById(id)
                .map(p -> {
                    p.setNombre(nuevo.getNombre());
                    p.setPrecio(nuevo.getPrecio());
                    p.setStock(nuevo.getStock());
                    return productoRepo.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public void eliminar(Integer id) {
        productoRepo.deleteById(id);
    }
}