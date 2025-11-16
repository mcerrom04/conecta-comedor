-- Ejemplo de comedor de prueba
INSERT INTO COMEDORES (nombre, direccion, latitud, longitud, telefono, normas, visible) VALUES
('Comedor Central', 'Calle Mayor 1', 40.416775, -3.703790, '911234567', 'Normas generales', 1);
('Comedor Social Esperanza', 'Calle Real 10', 40.4167, -3.7037, '911111111', 'Normas básicas', 0),
('Comedor San Juan', 'Avenida Paz 22', 40.4200, -3.7050, '912222222', 'Sin normas especiales', 0),
('Comedor Luz', 'Plaza Mayor 5', 40.4150, -3.7070, '913333333', 'Normas de higiene', 0);

-- Ejemplo de horario de prueba
INSERT INTO HORARIOS (id_comedor, dia, hora_ini, hora_fin) VALUES
(1, 'Lunes', '12:00:00', '15:00:00');
