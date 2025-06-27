# VentasApp

Sistema backend en Spring Boot con base de datos PostgreSQL y frontend independiente.

---

## Usuarios por defecto

| Usuario  | Contraseña  | Rol      |
| -------- | ----------- | -------- |
| admin    | admin123    | ADMIN    |
| operador | operador123 | OPERADOR |

---

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) (usualmente incluido con Docker Desktop)
- (Opcional) Cliente PostgreSQL como pgAdmin o DBeaver para administración de base de datos
- JDK 17 si deseas ejecutar backend localmente sin Docker

---

## Levantar proyecto con Docker

```bash
git clone <url-del-proyecto>
cd <carpeta-del-proyecto>
docker-compose up --build
