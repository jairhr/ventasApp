package com.ventas.Ventas.service;

import com.ventas.Ventas.repository.VentaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VentaService {

    private final VentaRepository ventaRepo;

    public VentaService(VentaRepository ventaRepo) {
        this.ventaRepo = ventaRepo;
    }

    public BigDecimal totalUltimoMes() {
        return ventaRepo.getTotalUltimoMes();
    }

    public String clienteMayorIngreso() {
        return ventaRepo.getClienteMayorIngreso();
    }

    public Map<String, Object> clienteMayorIngresoConTotal() {
        List<Object[]> resultados = ventaRepo.getClienteMayorIngresoConTotal();
        if (resultados.isEmpty()) {
            return Map.of("cliente", "Sin datos", "total", 0);
        }
        Object[] fila = resultados.get(0);
        return Map.of("cliente", fila[0], "total", fila[1]);
    }
    public List<Object[]> top3Productos() {
        return ventaRepo.getTop3Productos();
    }
}
