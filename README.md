# Task Manager — Desafío PHP Developer

Aplicación web para **gestión de tareas** con **autenticación**, **asignación de usuarios**, **CRUD**, **búsqueda/filtros** y **estadísticas**. Este repositorio incluye instrucciones claras para **instalar**, **ejecutar** y **probar** el proyecto.

---

## 🧰 Stack

- **Backend:** PHP 8.x (**Laravel 10**)
- **Base de datos:** MySQL 8.x
- **Frontend:** Next.js 14 / React 18 (consumiendo API REST)
- **Autenticación:** Token Bearer

---

## ✅ Requisitos funcionales implementados

- **Registro y login de usuarios** 
- **Tareas:** crear, listar, editar, eliminar
- **Búsqueda** por título y **filtro** por estado (_pending_ | _completed_)
- **Estadísticas:** total, completadas, pendientes, porcentaje, asignadas a mí y creadas por mí

---

## 🔐 Credenciales demo

- **Email:** `admin@example.com`
- **Password:** `password`

---

## 🗄️ Base de datos

Crear base de datos:

```sql
mysql -uroot -p -e "CREATE DATABASE IF NOT EXISTS taskmanager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER IF NOT EXISTS 'taskuser'@'%' IDENTIFIED BY 'taskpass'; GRANT ALL PRIVILEGES ON taskmanager.* TO 'taskuser'@'%'; FLUSH PRIVILEGES;"
```

---

## 🚀 Cómo ejecutar

### Backend

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --force
php artisan db:seed
php artisan serve    # http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev    # http://localhost:3000
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

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync

SANCTUM_STATEFUL_DOMAINS=127.0.0.1:3000,localhost:3000
SESSION_DOMAIN=localhost
FRONTEND_URL=http://127.0.0.1:3000
```

### Frontend (Next.js)

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 🔗 Endpoints de la API

### Autenticación

- **POST** `/api/register` — `{{ name, email, password }}` → `{{ token, user }}`
- **POST** `/api/login` — `{{ email, password }}` → `{{ token, user }}`
- **GET** `/api/me — header Authorization: Bearer <token>` → `{ id, name, email }`

### Usuarios

- **GET** `/api/users — lista { id, name, email }`

### Tareas

- **GET** `/api/tasks`
- **POST** `/api/tasks` — `{{ title, description?, status?, assigned_to? }}`
- **PUT** `/api/tasks/:id` — `{{ title?, description?, status?, assigned_to }}`
- **DELETE** `/api/tasks/:id`

### Estadísticas

- **GET** `/api/stats` → `{{ total, completed, pending, percent }}`

---

## 🧱 Notas de implementación

- **Registro y login de usuarios**
- **Búsqueda y filtros**
- **Asignación de usuarios**
- **Validaciones:** título requerido; estado permitido: `pending|completed`.
- **Manejo de errores:** respuestas JSON claras con código HTTP apropiado.
- **Arquitectura:** controladores delgados; lógica en servicios/repositorios; modelos con reglas.

---

## 👤 Autor

- Contacto: Lucas Tello - lucastello97@gmail.com

---
