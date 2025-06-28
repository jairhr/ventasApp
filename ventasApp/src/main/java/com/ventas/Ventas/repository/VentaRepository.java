package com.ventas.Ventas.repository;

import com.ventas.Ventas.entity.Venta;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Integer> {

    // Total generado el último mes
    @Query(value = """
        SELECT COALESCE(SUM(vd.total), 0) 
        FROM venta_detalle vd
        JOIN ventas v ON vd.venta_id = v.id
        WHERE v.fecha >= (CURRENT_DATE - INTERVAL '1 month')
        """, nativeQuery = true)
    BigDecimal getTotalUltimoMes();

    // Cliente que más ingresos generó
    @Query(value = """
        SELECT c.nombre 
        FROM clientes c
        JOIN ventas v ON v.cliente_id = c.id
        JOIN venta_detalle d ON d.venta_id = v.id
        GROUP BY c.id
        ORDER BY SUM(d.total) DESC
        LIMIT 1
        """, nativeQuery = true)
    String getClienteMayorIngreso();

    // Top 3 productos más vendidos
    @Query(value = """
        SELECT p.nombre, SUM(d.cantidad) AS total_vendidos
        FROM productos p
        JOIN venta_detalle d ON d.producto_id = p.id
        GROUP BY p.id
        ORDER BY total_vendidos DESC
        LIMIT 3
        """, nativeQuery = true)
    List<Object[]> getTop3Productos();

    @Query(value = """
    SELECT c.nombre, SUM(d.total) AS total_generado
    FROM clientes c
    JOIN ventas v ON v.cliente_id = c.id
    JOIN venta_detalle d ON d.venta_id = v.id
    GROUP BY c.id
    ORDER BY total_generado DESC
    LIMIT 1
    """, nativeQuery = true)
    List<Object[]> getClienteMayorIngresoConTotal();

}
