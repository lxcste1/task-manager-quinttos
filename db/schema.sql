-- schema.sql — MySQL schema for Tasks challenge
-- Recreated: 2025-09-15 01:37:05

-- NOTE: If running from MySQL Workbench and you need to set a default schema:
-- CREATE DATABASE IF NOT EXISTS tasks_challenge
--   DEFAULT CHARACTER SET utf8mb4
--   COLLATE utf8mb4_unicode_ci;
-- USE tasksmanager;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending','completed') NOT NULL DEFAULT 'pending',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tasks (title, description, status, created_at)
VALUES
('Prueba de tarea completada', 'Esta es una tarea que se completo', 'completed', '2025-09-13 19:03:19'),
('Prueba de creacion de tarea', 'Esta es una prueba de creacion de tarea', 'pending',    '2025-09-13 18:07:55'),
('Sacar a Marlon', 'Sacar a pasear a Marlon a las 15 hs', 'pending', '2025-09-08 00:46:20');

-- To seed an admin user (bcrypt hash from PHP):
-- php -r "echo password_hash('password', PASSWORD_BCRYPT), PHP_EOL;"
-- INSERT INTO admin_users (email, password_hash) VALUES ('admin@example.com', '<bcrypt-hash-here>');
