CREATE SCHEMA om;

-- CLIENTES
CREATE TABLE oms.clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL
);

-- PRODUCTOS
CREATE TABLE oms.productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
);

-- VENTAS
CREATE TABLE oms.ventas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cliente_id INTEGER NOT NULL REFERENCES oms.clientes(id) ON DELETE CASCADE
);


-- DETALLE DE VENTAS
CREATE TABLE oms.venta_detalle (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER NOT NULL REFERENCES oms.ventas(id) ON DELETE CASCADE,
    producto_id INTEGER NOT NULL REFERENCES oms.productos(id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0)
);

CREATE INDEX idx_ventas_cliente ON oms.ventas(cliente_id);
CREATE INDEX idx_detalle_venta ON oms.venta_detalle(venta_id);
CREATE INDEX idx_detalle_producto ON oms.venta_detalle(producto_id);

-- Tabla de usuarios
CREATE TABLE oms.usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de roles
CREATE TABLE oms.roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- Relación muchos-a-muchos usuario ↔ rol
CREATE TABLE oms.usuario_roles (
    usuario_id INTEGER REFERENCES oms.usuarios(id) ON DELETE CASCADE,
    rol_id INTEGER REFERENCES oms.roles(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, rol_id)
);

INSERT INTO oms.roles (id, nombre) VALUES (1, 'ADMIN');
INSERT INTO oms.roles (id, nombre) VALUES (2, 'OPERADOR');

-- Insertar usuarios
INSERT INTO oms.usuarios (username, password) 
VALUES 
  (1,'admin', '"$2a$10$WNzWwnlnN8qm6gwqJmxveOLugps2jmHTRRA.nOtOuxjgLP.RiB3I2"'),
  (2,'operador', '"$2a$10$7Wx/uoa3WWxC/l1PjNFkwOJH3n3yOXeKPCDURP1Ekn4NaKuMHPJki"');


INSERT INTO oms.usuario_roles (usuario_id, rol_id) VALUES
  (1, 1),
  (2, 2);

CREATE OR REPLACE FUNCTION oms.set_total_venta_detalle()
RETURNS TRIGGER AS $$
DECLARE
    v_precio NUMERIC(10,2);
BEGIN
    -- Obtener precio del producto relacionado
    SELECT precio INTO v_precio FROM oms.productos WHERE id = NEW.producto_id;

    -- Calcular el total
    NEW.total := NEW.cantidad * v_precio;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_total_venta_detalle
BEFORE INSERT OR UPDATE ON oms.venta_detalle
FOR EACH ROW
EXECUTE FUNCTION oms.set_total_venta_detalle();