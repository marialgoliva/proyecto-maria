USE PROYECTO_MARIA;
-- Insertamos en la tabla usuarios datos del administrador

ALTER DATABASE PROYECTO_TEST CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Configuramos la codificación de caracteres para no tener problemas al insertar los datos

INSERT INTO `USUARIO` (`dni`, `nombre`, `apellidos`, `email`, `username`, `password`, `rol`) VALUES ('76088478a', 'María', 'Ladrón de Guevara', 'admin@gmail.com', 'maria_admin', '$2b$10$srBMGktnnwF0JP4EQJdXb.NzFofKsF7iEAUicMg2gVbTQ0A3WptQy', 'admin');

-- Insertamos otros datos de usuario

INSERT INTO `USUARIO` (`dni`, `nombre`, `apellidos`, `email`, `username`, `password`, `rol`) 
VALUES 
('12345678A', 'Juan', 'Pérez García', 'juan.perez@email.com', 'juanperez', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user'),
('23456789B', 'María', 'Rodríguez López', 'maria.rodriguez@email.com', 'mariarod', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user'),
('34567890C', 'Carlos', 'Martínez Ruiz', 'carlos.martinez@email.com', 'carlosmr', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user'),
('45678901D', 'Laura', 'González Sánchez', 'laura.gonzalez@email.com', 'laurags', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user'),
('56789012E', 'Alejandro', 'Pérez Rodríguez', 'alejandro.perez@email.com', 'alejandrop', '$2b$10$YBvkE6le2Pn.D7jdfHjb5eZ9rA61EllOjT2VEh6eoaNGDM7CyJbam','user');

-- Insertamos datos en la tabla cliente

INSERT INTO `CLIENTE` (`dni`, `calle`,`ciudad`,`cp`) VALUES
('12345678A', 'Calle 1', 'Ciudad A', '12345'),
('23456789B', 'Calle 2', 'Ciudad B', '23456'),
('34567890C', 'Calle 3', 'Ciudad C', '34567'),
('45678901D', 'Calle 4', 'Ciudad D', '45678'),
('56789012E', 'Calle 5', 'Ciudad E', '56789');

-- Insertamos datos en la tabla pedido

INSERT INTO `PEDIDO` (`idCliente`,`fechaPedido`,`fechaEntrega`,`estado`,`tipoPago`,`importeTotal`) VALUES 
('12345678A', '2024-01-01', '2024-01-10', 'En Proceso', 'Transferencia', 150.00),
('23456789B', '2024-02-05', '2024-02-15', 'Entregado', 'Bizum', 200.50),
('34567890C', '2024-03-10', '2024-03-20', 'En Proceso', 'Mano', 75.80),
('45678901D', '2024-04-15', '2024-04-25', 'Entregado', 'Transferencia', 120.30),
('56789012E', '2024-05-20', '2024-05-30', 'En Proceso', 'Bizum', 90.25);


-- Insertamos categorias que no tienen categoria padre sin especificar este.

INSERT INTO `CATEGORIA` (`nombre`,`descripcion`) VALUES
('Gorros','Haz tu look único y cómodo con nuestra selección de gorros hechos a mano para todas las edades'),
('Bolsas','Explora nuestras bolsas hechas a mano en una variedad de colores para adaptarse a tu personalidad y ocasión. Estilo y comodidad en cada pieza.'),
('Prendas','Descubre la comodidad y el atractivo de nuestras prendas, con opciones para todas las edades');

-- Insertamos categorias que en este caso si tienen categoria padre.

INSERT INTO `CATEGORIA` (`idCategoriaPadre`,`nombre`,`descripcion`) VALUES
(1,'Gorro Bucket','Gorros bucket hechos a mano. Estilo casual y desenfadado para completar tu look.'),
(2,'Bolsos','Descubre nuestra colección única y elige la perfecta para cualquier ocasión.');

-- Insertamos productos de ejemplo.
-- Las imágenes se almacenarán como rutas al directorio en el que se encuentren, esto se modificará conforme el proyecto tome forma.

INSERT INTO `PRODUCTO` (`nombre`, `categoria`, `descripcion`, `color`, `precio`, `imagen`)
VALUES 
(
    'Gorro de Punto',
    1,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'camel',
    30,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630589/f1r9jvwn1kwcu2o2bvle.png'
),
(
    'Gorro de Punto',
    1,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'crema',
    30,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630678/ohg6oxsw8jlm2dvz0pkk.png'
),
(
    'Gorro de Punto',
    1,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'verde',
    30,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630182/idmjgbzeerqxrj3tmatf.png'
),
(
    'Gorro bucket reversible',
    3,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'negro',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630246/pfbdysclokagzkyxhnxr.png'
),
(
    'Gorro bucket reversible',
    3,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'negro',
    35,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630267/rjmq4ocro8jqakmhfghw.png'
),
(
    'Bolso de mano',
    4,
    'El bolso de mano perfecto para acompañarte en tus aventuras diarias.',
    'negro',
    40,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630308/rkmndnmqflfudnjlwr8u.png'
),
(
    'Mochila Saco',
    2,
    'Con amplio espacio de almacenamiento y durabilidad, esta mochila te permite llevar todo lo que necesitas mientras exploras el mundo.',
    'verde y mostaza',
    25,
    'https://res.cloudinary.com/dfx2u327l/image/upload/v1711630387/olt2j963vimdxx38ud6x.png'
);

-- Insertamos las tallas y su stock correspondiente para cada producto
INSERT INTO `STOCK` (`idProducto`,`talla`,`stock`) VALUES 
(1,'S',3),
(2,'S',2),
(3,'S',5),
(4,'S',4),
(5,'S',2),
(1,'M',6),
(2,'M',10),
(3,'M',8),
(4,'M',6),
(5,'M',5),
(1,'L',3),
(2,'L',2),
(3,'L',1),
(4,'L',3),
(5,'L',5),
(6,'null',1),
(7,'null',3);

-- Insertamos datos de ejemplo en la tabla Pedido-Producto, que relacionará los productos con sus correspondientes pedidos

INSERT INTO `PEDIDO_PRODUCTO` (`idPedido`,`idProducto`,`precioUnitario`,`cantidad`) VALUES 
(1,4,35,1),
(1,5,35,1),
(2,7,25,1),
(2,1,30,1),
(2,2,30,1),
(3,2,30,3);

-- Insertamos datos en la tabla comentario relacionada con la tabla producto

INSERT INTO `COMENTARIO` (`idCliente`,`idProducto`,`puntuacion`,`texto`) VALUES 
('23456789B', 4,'5','¡Me encanta mi nuevo bolso de mano! Es justo lo que estaba buscando: elegante, espacioso y de excelente calidad. Además, el diseño es tan versátil que combina perfectamente con cualquier atuendo. ¡Definitivamente mi bolso favorito para llevar a todas partes!'),
('12345678A', 3, '5','Este gorro de punto es increíblemente cálido y cómodo. Me encanta su diseño clásico y la calidad del tejido. ¡Es perfecto para mantenerme abrigado durante los días fríos de invierno! Definitivamente recomendaría este gorro a cualquiera que busque estilo y funcionalidad.' );