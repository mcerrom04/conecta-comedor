-- Comedores de prueba NO visibles
INSERT INTO COMEDORES (nombre, direccion, latitud, longitud, telefono, normas, visible) VALUES
('Comedor Usera', 'Calle Marcelo Usera 150', 40.3800, -3.7070, '911111130', 'Normas básicas', 0),
('Comedor Barajas', 'Avenida Logroño 300', 40.4730, -3.5770, '911111131', 'Normas básicas', 0),
('Comedor Hortaleza', 'Calle Silvano 100', 40.4740, -3.6450, '911111132', 'Normas básicas', 0),
('Comedor Latina', 'Calle Camarena 200', 40.3930, -3.7630, '911111133', 'Normas básicas', 0);

-- Comedores de prueba repartidos por Madrid
INSERT INTO COMEDORES (nombre, direccion, latitud, longitud, telefono, normas, visible) VALUES
('Comedor Central', 'Calle Mayor 1', 40.416775, -3.703790, '911234567', 'Normas generales', 1),
('Comedor Norte', 'Calle Arturo Soria 100', 40.4650, -3.6540, '911111112', 'Normas básicas', 1),
('Comedor Sur', 'Avenida de Andalucía 50', 40.3700, -3.7000, '911111113', 'Normas básicas', 1),
('Comedor Este', 'Calle Alcalá 600', 40.4370, -3.6150, '911111114', 'Normas básicas', 1),
('Comedor Oeste', 'Calle Princesa 89', 40.4300, -3.7200, '911111115', 'Normas básicas', 1),
('Comedor Chamartín', 'Plaza Castilla 1', 40.4675, -3.6880, '911111116', 'Normas básicas', 1),
('Comedor Vallecas', 'Avenida de la Albufera 200', 40.3910, -3.6580, '911111117', 'Normas básicas', 1),
('Comedor Carabanchel', 'Calle General Ricardos 150', 40.3840, -3.7450, '911111118', 'Normas básicas', 1),
('Comedor Tetuán', 'Calle Bravo Murillo 300', 40.4600, -3.7030, '911111119', 'Normas básicas', 1),
('Comedor Retiro', 'Calle Retiro 50', 40.4210, -3.6740, '911111120', 'Normas básicas', 1);

-- Ejemplo de horario de prueba
INSERT INTO HORARIOS (id_comedor, dia, hora_ini, hora_fin) VALUES
(1, 'Lunes', '12:00:00', '15:00:00');
