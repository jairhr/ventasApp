package com.ventas.Ventas.controller;

import com.ventas.Ventas.service.VentaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ventas/estadisticas")
public class VentaStatsController {

    private final VentaService servicio;

    public VentaStatsController(VentaService servicio) {
        this.servicio = servicio;
    }

    @GetMapping("/top3-productos")
    public List<Map<String, Object>> top3Productos() {
        List<Object[]> raw = servicio.top3Productos();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : raw) {
            Map<String, Object> item = new HashMap<>();
            item.put("nombre", row[0]);
            item.put("cantidad", row[1]);
            result.add(item);
        }
        return result;
    }

    @GetMapping("/mayor-cliente")
    public Map<String, Object> clienteMayorIngreso() {
        return servicio.clienteMayorIngresoConTotal();
    }

    @GetMapping("/total-mensual")
    public Map<String, BigDecimal> totalMensual() {
        return Map.of("total", servicio.totalUltimoMes());
    }
}
