-- CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL
);

-- PRODUCTOS
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
);

-- VENTAS
CREATE TABLE IF NOT EXISTS ventas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE
);

-- DETALLE DE VENTAS
CREATE TABLE IF NOT EXISTS venta_detalle (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
    producto_id INTEGER NOT NULL REFERENCES productos(id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_ventas_cliente ON ventas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_detalle_venta ON venta_detalle(venta_id);
CREATE INDEX IF NOT EXISTS idx_detalle_producto ON venta_detalle(producto_id);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- Relación muchos-a-muchos usuario ↔ rol
CREATE TABLE IF NOT EXISTS usuario_roles (
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    rol_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, rol_id)
);

-- Roles
INSERT INTO roles (id, nombre) 
VALUES (1, 'ADMIN') 
ON CONFLICT (id) DO NOTHING;

INSERT INTO roles (id, nombre) 
VALUES (2, 'OPERADOR') 
ON CONFLICT (id) DO NOTHING;

-- Usuarios
INSERT INTO usuarios (id, username, password) 
VALUES 
  (1, 'admin', '$2a$10$WNzWwnlnN8qm6gwqJmxveOLugps2jmHTRRA.nOtOuxjgLP.RiB3I2'),
  (2, 'operador', '$2a$10$7Wx/uoa3WWxC/l1PjNFkwOJH3n3yOXeKPCDURP1Ekn4NaKuMHPJki')
ON CONFLICT (id) DO NOTHING;

-- Asignación de roles
INSERT INTO usuario_roles (usuario_id, rol_id) VALUES
  (1, 1),
  (2, 2)
ON CONFLICT DO NOTHING;

-- Función para calcular total
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'set_total_venta_detalle'
  ) THEN
    CREATE FUNCTION set_total_venta_detalle()
    RETURNS TRIGGER AS $BODY$
    DECLARE
        v_precio NUMERIC(10,2);
    BEGIN
        SELECT precio INTO v_precio FROM productos WHERE id = NEW.producto_id;
        NEW.total := NEW.cantidad * v_precio;
        RETURN NEW;
    END;
    $BODY$ LANGUAGE plpgsql;
  END IF;
END$$;

-- Trigger para total
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_set_total_venta_detalle'
  ) THEN
    CREATE TRIGGER trg_set_total_venta_detalle
    BEFORE INSERT OR UPDATE ON venta_detalle
    FOR EACH ROW
    EXECUTE FUNCTION set_total_venta_detalle();
  END IF;
END$$;
