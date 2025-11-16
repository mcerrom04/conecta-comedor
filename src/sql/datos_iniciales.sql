-- Insertar rol administrador
INSERT INTO ROLES (id_rol, nombre, desc_rol) VALUES ('admin', 'Administrador', 'Administrador del sistema')
    ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), desc_rol=VALUES(desc_rol);

-- Insertar usuario administrador de prueba (password: admin123, hash generado con password_hash)
INSERT INTO USUARIOS (email, password, id_rol) VALUES (
    'admin@conecta.com',
    '$2y$10$taD7/.1ONf2GRhQ0C0bvBeAwBCr.lMxmcM8Z07ftuVgA1FRV5e5EO',
    'admin'
);