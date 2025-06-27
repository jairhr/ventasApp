package com.ventas.Ventas.controller;

import com.ventas.Ventas.entity.Cliente;
import com.ventas.Ventas.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin
public class ClienteController {

    private final ClienteService servicio;

    public ClienteController(ClienteService servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<Cliente> listar() {
        return servicio.listar();
    }

    @GetMapping("/{id}")
    public Cliente obtener(@PathVariable Integer id) {
        return servicio.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    @PostMapping
    public Cliente crear(@RequestBody Cliente cliente) {
        return servicio.crear(cliente);
    }

    @PutMapping("/{id}")
    public Cliente actualizar(@PathVariable Integer id, @RequestBody Cliente cliente) {
        return servicio.actualizar(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        servicio.eliminar(id);
    }
}