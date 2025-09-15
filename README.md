# Task Manager — Desafío PHP Developer

Aplicación web para **gestión de tareas** con **autenticación de administrador**, **CRUD**, **búsqueda/filtros** y **estadísticas**. Este repositorio incluye instrucciones claras para **instalar**, **ejecutar** y **probar** el proyecto, además del archivo **schema.sql** para la base de datos.

---

## 🧰 Stack

- **Backend:** PHP 8.x (**Laravel 10**)
- **Base de datos:** MySQL 8.x
- **Frontend:** Next.js 14 / React 18 (consumiendo API REST)
- **Autenticación:** Token Bearer

---

## ✅ Requisitos funcionales implementados

- **Login de administrador** (usuario único; sin registro de usuarios)
- **Tareas:** crear, listar, editar, eliminar
- **Búsqueda** por título y **filtro** por estado (_pending_ | _completed_)
- **Estadísticas:** total, completadas, pendientes, porcentaje

---

## 🔐 Credenciales demo

- **Email:** `admin@example.com`
- **Password:** `password`

---

## 🗄️ Base de datos

1. Crear base de datos y **cargar el esquema** (desde `db/schema.sql`):

```sql
CREATE DATABASE IF NOT EXISTS tasksmanager
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE tasksmanager;
```

Desde terminal:

```bash
mysql -u <USER> -p tasksmanager < db/schema.sql
```

---

## ⚙️ Variables de entorno

### Backend (Laravel)

```
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=taskmanager
DB_USERNAME=taskuser
DB_PASSWORD=taskpass

SANCTUM_STATEFUL_DOMAINS=127.0.0.1:3000,localhost:3000
SESSION_DOMAIN=localhost
FRONTEND_URL=http://127.0.0.1:3000
```

### Frontend (Next.js)

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 🚀 Cómo ejecutar

### Backend

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan serve    # http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev    # http://localhost:3000
```

---

## 🔗 Endpoints de la API

### Autenticación

- **POST** `/api/login` — `{{ email, password }}` → `{{ token, email }}`

### Tareas

- **GET** `/api/tasks?q=<string>&status=<pending|completed>`
- **POST** `/api/tasks` — `{{ title, description?, status? }}`
- **PUT** `/api/tasks/:id` — `{{ title?, description?, status? }}`
- **DELETE** `/api/tasks/:id`

### Estadísticas

- **GET** `/api/stats` → `{{ total, completed, pending, percent }}`

---

## 🧱 Notas de implementación

- **Búsqueda y filtros:** server-side (por `q` y `status`) o client-side en el frontend.
- **Validaciones:** título requerido; estado permitido: `pending|completed`.
- **Manejo de errores:** respuestas JSON claras con código HTTP apropiado.
- **CORS:** habilitar si el front corre en otro origen.
- **Arquitectura:** controladores delgados; lógica en servicios/repositorios; modelos con reglas.

---

## 👤 Autor

- Contacto: Lucas Tello - lucastello97@gmail.com

---
