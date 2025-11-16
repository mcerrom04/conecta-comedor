-- Ejemplo de comedor de prueba
INSERT INTO COMEDORES (nombre, direccion, latitud, longitud, telefono, normas, visible) VALUES
('Comedor Central', 'Calle Mayor 1', 40.416775, -3.703790, '911234567', 'Normas generales', 1);

-- Ejemplo de horario de prueba
INSERT INTO HORARIOS (id_comedor, dia, hora_ini, hora_fin) VALUES
(1, 'Lunes', '12:00:00', '15:00:00');
