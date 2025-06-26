package com.ventas.Ventas.service;

import com.ventas.Ventas.entity.Cliente;
import com.ventas.Ventas.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepo;

    public ClienteService(ClienteRepository clienteRepo) {
        this.clienteRepo = clienteRepo;
    }

    public List<Cliente> listar() {
        return clienteRepo.findAll();
    }

    public Optional<Cliente> obtenerPorId(Integer id) {
        return clienteRepo.findById(id);
    }

    public Cliente crear(Cliente cliente) {
        return clienteRepo.save(cliente);
    }

    public Cliente actualizar(Integer id, Cliente nuevo) {
        return clienteRepo.findById(id)
                .map(c -> {
                    c.setNombre(nuevo.getNombre());
                    c.setCorreo(nuevo.getCorreo());
                    return clienteRepo.save(c);
                })
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    public void eliminar(Integer id) {
        clienteRepo.deleteById(id);
    }
}
