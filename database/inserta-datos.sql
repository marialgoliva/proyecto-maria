USE PROYECTO_TEST1;
-- Insertamos en la tabla usuarios datos del administrador

ALTER DATABASE PROYECTO_TEST1 CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Configuramos la codificación de caracteres para no tener problemas al insertar los datos


-- -- Insertamos otros datos de usuario

INSERT INTO `USUARIOS` (`dni`, `nombre`, `apellidos`, `email`, `username`, `password`, `rol`) VALUES ('76088478a', 'María', 'Ladrón de Guevara', 'admin@email.com', 'maria_admin', '$2b$10$srBMGktnnwF0JP4EQJdXb.NzFofKsF7iEAUicMg2gVbTQ0A3WptQy', 'admin');

INSERT INTO `USUARIOS` (`dni`, `nombre`, `apellidos`, `email`, `username`, `password`, `rol`) 
VALUES 
('12345678A', 'Juan', 'Pérez García', 'juan.perez@email.com', 'juanperez', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user'),
('23456789B', 'María', 'Rodríguez López', 'maria.rodriguez@email.com', 'mariarod', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user'),
('34567890C', 'Carlos', 'Martínez Ruiz', 'carlos.martinez@email.com', 'carlosmr', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user'),
('45678901D', 'Laura', 'González Sánchez', 'laura.gonzalez@email.com', 'laurags', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user'),
('56789012E', 'Alejandro', 'Pérez Rodríguez', 'alejandro.perez@email.com', 'alejandrop', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user');

-- Insertamos datos en la tabla cliente

INSERT INTO `CLIENTES` (`email`, `calle`,`ciudad`,`cp`, `nombre` ,`dni`) VALUES
('juan.perez@email.com', 'Calle 1', 'Ciudad A', '12345', 'Juan Pérez García', '12345678A'),
('maria.rodriguez@email.com', 'Calle 2', 'Ciudad B', '23456', 'María Rodríguez López', '23456789B'),
('carlos.martinez@email.com', 'Calle 3', 'Ciudad C', '34567', 'Carlos Martínez Ruiz', '34567890C'),
('laura.gonzalez@email.com', 'Calle 4', 'Ciudad D', '45678', 'Laura González Sánchez', '45678901D'),
('alejandro.perez@email.com', 'Calle 5', 'Ciudad E', '56789', 'Alejandro Pérez Rodríguez', '56789012E');




-- Insertamos categorias que no tienen categoria padre sin especificar este.

INSERT INTO `CATEGORIA` (`nombre`,`descripcion`) VALUES
('Gorros','Haz tu look único y cómodo con nuestra selección de gorros hechos a mano para todas las edades'),
('Bolsas','Explora nuestras bolsas hechas a mano en una variedad de colores para adaptarse a tu personalidad y ocasión. Estilo y comodidad en cada pieza.');

-- Insertamos categorias que en este caso si tienen categoria padre.

INSERT INTO `CATEGORIA` (`idCategoriaPadre`,`nombre`,`descripcion`) VALUES
(1,'Gorro Bucket','Gorros bucket hechos a mano. Estilo casual y desenfadado para completar tu look.'),
(1,'Gorro Punto','Estos gorros son tanto funcionales como elegantes, ideales para mantenerte abrigado y a la moda.');

-- Insertamos categorias que en este caso si tienen categoria padre.

INSERT INTO `CATEGORIA` (`idCategoriaPadre`,`nombre`,`descripcion`) VALUES
(3,'Bucket Pana','Estilo clásico y urbano: gorros bucket de pana para un look casual y vintage.'),
(3,'Bucket Reversible','Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno.'),
(2,'Bolsa XS','El bolso de mano perfecto para acompañarte en tus aventuras diarias.'),
(2,'Mochila Saco','Con amplio espacio de almacenamiento y durabilidad, esta mochila te permite llevar todo lo que necesitas mientras exploras el mundo.'),
(2,'Bolsa XL','Descubre nuestra colección única y elige la perfecta para cualquier ocasión.');


-- Insertamos productos de ejemplo.
-- Las imágenes se almacenarán como rutas al directorio en el que se encuentren, esto se modificará conforme el proyecto tome forma.

INSERT INTO `PRODUCTO` (`nombre`, `categoria`, `descripcion`, `color`, `precio`, `imagen`)
VALUES 
(
    'Gorro de Punto',
    4,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'camel',
    30,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630589/f1r9jvwn1kwcu2o2bvle.png'
),
(
    'Gorro de Punto',
    4,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'crema',
    30,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630678/ohg6oxsw8jlm2dvz0pkk.png'
),
(
    'Gorro de Punto',
    4,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'agua',
    30,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630182/idmjgbzeerqxrj3tmatf.png'
),
(
    'Gorro de Punto',
    4,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'gris',
    30,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630182/idmjgbzeerqxrj3tmatf.png'
),
(
    'Gorro de Punto',
    4,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'negro',
    30,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630182/idmjgbzeerqxrj3tmatf.png'
),
(
    'Gorro de Punto',
    4,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'rosa tinto',
    30,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630182/idmjgbzeerqxrj3tmatf.png'
),
(
    'Gorro bucket reversible',
    6,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'negro',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630246/pfbdysclokagzkyxhnxr.png'
),
(
    'Gorro bucket reversible',
    6,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'verde',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630267/rjmq4ocro8jqakmhfghw.png'
),
(
    'Gorro bucket reversible',
    6,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'topo',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630267/rjmq4ocro8jqakmhfghw.png'
),
(
    'Gorro bucket reversible',
    6,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'morado',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630267/rjmq4ocro8jqakmhfghw.png'
),
(
    'Gorro bucket reversible',
    6,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'azul',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630267/rjmq4ocro8jqakmhfghw.png'
),
(
    'Gorro bucket reversible',
    6,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'natural',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630267/rjmq4ocro8jqakmhfghw.png'
),
(
    'Gorro bucket pana',
    5,
    'Estilo clásico y urbano: gorros bucket de pana para un look casual y vintage.',
    'agua',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630267/rjmq4ocro8jqakmhfghw.png'
),
(
    'Gorro bucket pana',
    5,
    'Estilo clásico y urbano: gorros bucket de pana para un look casual y vintage.',
    'caldera',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630267/rjmq4ocro8jqakmhfghw.png'
),
(
    'Gorro bucket pana',
    5,
    'Estilo clásico y urbano: gorros bucket de pana para un look casual y vintage.',
    'oliva',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630267/rjmq4ocro8jqakmhfghw.png'
),
(
    'Bolso de mano',
    7,
    'El bolso de mano perfecto para acompañarte en tus aventuras diarias.',
    'negro',
    25,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630308/rkmndnmqflfudnjlwr8u.png'
),
(
    'Bolso de mano',
    7,
    'El bolso de mano perfecto para acompañarte en tus aventuras diarias.',
    'verde',
    25,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630308/rkmndnmqflfudnjlwr8u.png'
),
(
    'Bolso de mano',
    7,
    'El bolso de mano perfecto para acompañarte en tus aventuras diarias.',
    'natural',
    25,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630308/rkmndnmqflfudnjlwr8u.png'
),
(
    'Mochila Saco + Estuche',
    8,
    'Con amplio espacio de almacenamiento y durabilidad, esta mochila te permite llevar todo lo que necesitas mientras exploras el mundo.',
    'agua, mostaza y oliva',
    40,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630387/olt2j963vimdxx38ud6x.png'
),
(
    'Mochila Saco + Estuche',
    8,
    'Con amplio espacio de almacenamiento y durabilidad, esta mochila te permite llevar todo lo que necesitas mientras exploras el mundo.',
    'oliva, mostaza y camel',
    40,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630387/olt2j963vimdxx38ud6x.png'
),
(
    'Mochila Saco + Estuche',
    8,
    'Con amplio espacio de almacenamiento y durabilidad, esta mochila te permite llevar todo lo que necesitas mientras exploras el mundo.',
    'rosa, natural y coral',
    40,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630387/olt2j963vimdxx38ud6x.png'
),
(
    'Mochila Saco + Estuche',
    8,
    'Con amplio espacio de almacenamiento y durabilidad, esta mochila te permite llevar todo lo que necesitas mientras exploras el mundo.',
    'camel, agua y natural',
    40,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630387/olt2j963vimdxx38ud6x.png'
),
(
    'Bolsa de pana',
    9,
    'Bolso de pana grande: estilo moderno y funcional para llevar todo lo que necesitas con comodidad y estilo.',
    'agua, mostaza y oliva',
    45,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630387/olt2j963vimdxx38ud6x.png'
),
(
    'Bolsa de pana',
    9,
    'Bolso de pana grande: estilo moderno y funcional para llevar todo lo que necesitas con comodidad y estilo.',
    'agua, mostaza y oliva',
    45,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630387/olt2j963vimdxx38ud6x.png'
),
(
    'Bolsa de pana',
    9,
    'Bolso de pana grande: estilo moderno y funcional para llevar todo lo que necesitas con comodidad y estilo.',
    'agua, mostaza y oliva',
    45,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630387/olt2j963vimdxx38ud6x.png'
);


-- Insertamos las tallas y su stock correspondiente para cada producto

INSERT INTO `STOCK` (`idProducto`,`talla`,`stock`) VALUES
-- Stock de productos talla S 
(1,'S',10),
(2,'S',6),
(3,'S',8),
(4,'S',6),
(5,'S',9),
(6,'S',10),
(7,'S',6),
(8,'S',8),
(9,'S',6),
(10,'S',9),
(11,'S',10),
(12,'S',6),
(13,'S',8),
(14,'S',6),
(15,'S',9),
-- Stock de productos talla M 
(1,'M',6),
(2,'M',10),
(3,'M',8),
(4,'M',6),
(5,'M',5),
(6,'M',6),
(7,'M',10),
(8,'M',8),
(9,'M',6),
(10,'M',5),
(11,'M',6),
(12,'M',10),
(13,'M',8),
(14,'M',6),
(15,'M',5),
-- Stock de productos talla L
(1,'L',3),
(2,'L',2),
(3,'L',1),
(4,'L',3),
(5,'L',5),
(6,'L',3),
(7,'L',2),
(8,'L',1),
(9,'L',3),
(10,'L',5),
(11,'L',3),
(12,'L',2),
(13,'L',1),
(14,'L',3),
(15,'L',5),
-- Stock de productos talla única 
(16,'null',10),
(17,'null',6),
(18,'null',8),
(19,'null',7),
(20,'null',6),
(21,'null',8),
(22,'null',6),
(23,'null',9),
(24,'null',10),
(25,'null',6);

-- Insertamos datos en la tabla pedido

INSERT INTO `PEDIDOS` (`email`,`fechaPedido`,`fechaEntrega`,`estado`,`tipoPago`,`importeTotal`,`idCliente`) VALUES 
('juan.perez@email.com', '2024-01-01', '2024-01-10', 'En Proceso', 'tarjeta', 150.00, '12345678A'),
('maria.rodriguez@email.com', '2024-02-05', '2024-02-15', 'Entregado', 'bizum', 200.50, '23456789B'),
('carlos.martinez@email.com', '2024-03-10', '2024-03-20', 'En Proceso', 'efectivo', 75.80, '34567890C'),
('laura.gonzalez@email.com', '2024-04-15', '2024-04-25', 'Entregado', 'tarjeta', 120.30, '45678901D'),
('alejandro.perez@email.com', '2024-05-20', '2024-05-30', 'En Proceso', 'bizum', 90.25, '56789012E');

-- Insertamos datos de ejemplo en la tabla Pedido-Producto, que relacionará los productos con sus correspondientes pedidos

INSERT INTO `PEDIDO_PRODUCTO` (`idPedido`,`idProducto`,`cantidad`,`talla`) VALUES 
-- Pedido 1 (Juan)
(1,4,1,'S'),
(1,4,1,'M'),
(1,19,1,null),
-- Pedido 2 (maria)
(2,7,1,'M'),
(2,2,1,'M'),
-- Pedido 3 (carlos)
(3,8,2,'M'),
-- Pedido 4(laura)
(4,5,1,'L'),
(4,5,1,'M'),
(4,23,1,null),
-- Pedido 5(alejandro)
(5,12,1,'S'),
(5,13,1,'S'),
(5,22,1,null);

INSERT INTO `COMENTARIO` (`cliente`,`idProducto`,`puntuacion`,`texto`) VALUES 
('María Rodríguez López', 16, 4,'¡Me encanta mi nuevo bolso de mano! Es justo lo que estaba buscando: elegante, espacioso y de excelente calidad. Además, el diseño es tan versátil que combina perfectamente con cualquier atuendo. ¡Definitivamente mi bolso favorito para llevar a todas partes!'),
('Laura González Sánchez', 16, 5,'¡Me encanta mi nuevo bolso de mano! Es justo lo que estaba buscando: elegante, espacioso y de excelente calidad. Además, el diseño es tan versátil que combina perfectamente con cualquier atuendo. ¡Definitivamente mi bolso favorito para llevar a todas partes!'),
('Laura González Sánchez', 17, 5,'¡Me encanta mi nuevo bolso de mano! Es justo lo que estaba buscando: elegante, espacioso y de excelente calidad. Además, el diseño es tan versátil que combina perfectamente con cualquier atuendo. ¡Definitivamente mi bolso favorito para llevar a todas partes!'),
('Laura González Sánchez', 16, 5,'¡Me encanta mi nuevo bolso de mano! Es justo lo que estaba buscando: elegante, espacioso y de excelente calidad. Además, el diseño es tan versátil que combina perfectamente con cualquier atuendo. ¡Definitivamente mi bolso favorito para llevar a todas partes!'),
('Juan Pérez García', 1, '5','Este gorro de punto es increíblemente cálido y cómodo. Me encanta su diseño clásico y la calidad del tejido. ¡Es perfecto para mantenerme abrigado durante los días fríos de invierno! Definitivamente recomendaría este gorro a cualquiera que busque estilo y funcionalidad.' ),
('Carlos Martínez Ruiz', 1, '5','Este gorro de punto es increíblemente cálido y cómodo. Me encanta su diseño clásico y la calidad del tejido. ¡Es perfecto para mantenerme abrigado durante los días fríos de invierno! Definitivamente recomendaría este gorro a cualquiera que busque estilo y funcionalidad.' ),
('Juan Pérez García', 2, '5','Este gorro de punto es increíblemente cálido y cómodo. Me encanta su diseño clásico y la calidad del tejido. ¡Es perfecto para mantenerme abrigado durante los días fríos de invierno! Definitivamente recomendaría este gorro a cualquiera que busque estilo y funcionalidad.' ),
('María Rodríguez López', 2, '4','Este gorro de punto es increíblemente cálido y cómodo. Me encanta su diseño clásico y la calidad del tejido. ¡Es perfecto para mantenerme abrigado durante los días fríos de invierno! Definitivamente recomendaría este gorro a cualquiera que busque estilo y funcionalidad.' ),
('María Rodríguez López', 3, '4','Este gorro de punto es increíblemente cálido y cómodo. Me encanta su diseño clásico y la calidad del tejido. ¡Es perfecto para mantenerme abrigado durante los días fríos de invierno! Definitivamente recomendaría este gorro a cualquiera que busque estilo y funcionalidad.' ),
('Carlos Martínez Ruiz', 4, '5','Este gorro de punto es increíblemente cálido y cómodo. Me encanta su diseño clásico y la calidad del tejido. ¡Es perfecto para mantenerme abrigado durante los días fríos de invierno! Definitivamente recomendaría este gorro a cualquiera que busque estilo y funcionalidad.' ),
('María Rodríguez López', 7, '5','¡El gorro bucket reversible es increíble! Me encanta lo versátil que es, puedo cambiar mi estilo en un instante. Además, es cómodo y de alta calidad. ¡Definitivamente lo recomendaría a cualquiera que busque un gorro a la moda y funcional!' ),
('Juan Pérez García', 7, '5','¡El gorro bucket reversible es increíble! Me encanta lo versátil que es, puedo cambiar mi estilo en un instante. Además, es cómodo y de alta calidad. ¡Definitivamente lo recomendaría a cualquiera que busque un gorro a la moda y funcional!' ),
('María Rodríguez López', 12, '4','¡El gorro bucket reversible es increíble! Me encanta lo versátil que es, puedo cambiar mi estilo en un instante. Además, es cómodo y de alta calidad. ¡Definitivamente lo recomendaría a cualquiera que busque un gorro a la moda y funcional!' ),
('Juan Pérez García', 8, '5','¡El gorro bucket reversible es increíble! Me encanta lo versátil que es, puedo cambiar mi estilo en un instante. Además, es cómodo y de alta calidad. ¡Definitivamente lo recomendaría a cualquiera que busque un gorro a la moda y funcional!' ),
('Laura González Sánchez', 9, '4','¡El gorro bucket reversible es increíble! Me encanta lo versátil que es, puedo cambiar mi estilo en un instante. Además, es cómodo y de alta calidad. ¡Definitivamente lo recomendaría a cualquiera que busque un gorro a la moda y funcional!' ),
('Carlos Martínez Ruiz', 13, '5','¡El gorro bucket de pana es increíblemente suave y cómodo! Además, el diseño es muy estiloso.' ),
('Laura González Sánchez', 14, '4','¡El gorro bucket de pana es increíblemente suave y cómodo! Además, el diseño es muy estiloso.' ),
('María Rodríguez López', 15, '4','¡El gorro bucket de pana es increíblemente suave y cómodo! Además, el diseño es muy estiloso.' ),
('Carlos Martínez Ruiz', 23, '5','La bolsa de pana es perfecta para el día a día. Muy cómoda de llevar y tiene un estilo único.' ),
('Laura González Sánchez', 24, '4','La bolsa de pana es perfecta para el día a día. Muy cómoda de llevar y tiene un estilo único.' ),
('María Rodríguez López', 25, '4','La bolsa de pana es perfecta para el día a día. Muy cómoda de llevar y tiene un estilo único.' ),
('Carlos Martínez Ruiz', 20, '5','La mochila saco es impresionante! Tiene mucho espacio y es muy resistente. Perfecta para mis viajes.' ),
('Juan Pérez García', 21, '5','La mochila saco es impresionante! Tiene mucho espacio y es muy resistente. Perfecta para mis viajes.' ),
('Laura González Sánchez', 22, '4','La mochila saco es impresionante! Tiene mucho espacio y es muy resistente. Perfecta para mis viajes.' );

