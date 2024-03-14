USE PROYECTO_MARIA;
-- Insertamos en la tabla usuarios datos del administrador

INSERT INTO `USUARIO` (`dni`, `nombre`, `apellidos`, `email`, `username`, `password`, `rol`) VALUES ('76088478a', 'María', 'Ladrón de Guevara', 'admin@gmail.com', 'maria_admin', '123admin', 'admin');

-- Insertamos otros datos de usuario

INSERT INTO `USUARIO` (`dni`, `nombre`, `apellidos`, `email`, `username`, `password`, `rol`) 
VALUES 
('12345678A', 'Juan', 'Pérez García', 'juan.perez@email.com', 'juanperez', 'contra123','user'),
('23456789B', 'María', 'Rodríguez López', 'maria.rodriguez@email.com', 'mariarod', 'clave456','user'),
('34567890C', 'Carlos', 'Martínez Ruiz', 'carlos.martinez@email.com', 'carlosmr', 'secreto789','user'),
('45678901D', 'Laura', 'González Sánchez', 'laura.gonzalez@email.com', 'laurags', '9876password','user'),
('56789012E', 'Alejandro', 'Pérez Rodríguez', 'alejandro.perez@email.com', 'alejandrop', '1234pass','user');

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
    'verde',
    30,
    ''
),
(
    'Gorro de Punto',
    1,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'verde',
    30,
    ''
),
(
    'Gorro de Punto',
    1,
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'verde',
    30,
    ''
),
(
    'Gorro bucket reversible',
    3,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'negro',
    35,
    ''
),
(
    'Gorro bucket reversible',
    3,
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'negro',
    35,
    ''
),
(
    'Bolso de mano',
    4,
    'El bolso de mano perfecto para acompañarte en tus aventuras diarias.',
    'negro',
    40,
    ''
),
(
    'Mochila Saco',
    2,
    'Con amplio espacio de almacenamiento y durabilidad, esta mochila te permite llevar todo lo que necesitas mientras exploras el mundo.',
    'gris',
    25,
    ''
);

-- Insertamos las tallas y su stock correspondiente para cada producto
INSERT INTO `TALLA` (`idProducto`,`talla`,`stock`) VALUES 
(8,'S',3),
(9,'S',2),
(10,'S',5),
(11,'S',4),
(12,'S',2),
(8,'M',6),
(9,'M',10),
(10,'M',8),
(11,'M',6),
(12,'M',5),
(8,'L',3),
(9,'L',2),
(10,'L',1),
(11,'L',3),
(12,'L',5),
(13,'',1),
(14,'',3);

-- Insertamos datos de ejemplo en la tabla Pedido-Producto, que relacionará los productos con sus correspondientes pedidos

INSERT INTO `PEDIDO_PRODUCTO` (`idPedido`,`idProducto`,`precioUnitario`,`cantidad`) VALUES 
(1,13,40,1),
(1,11,35,1),
(1,12,35,1),
(2,14,25,1),
(2,8,30,1),
(2,9,30,1),
(3,9,30,3);

-- Insertamos datos en la tabla comentario relacionada con la tabla producto

INSERT INTO `COMENTARIO` (`idCliente`,`idProducto`,`puntuacion`,`texto`) VALUES 
('23456789B', 13,'5','¡Me encanta mi nuevo bolso de mano! Es justo lo que estaba buscando: elegante, espacioso y de excelente calidad. Además, el diseño es tan versátil que combina perfectamente con cualquier atuendo. ¡Definitivamente mi bolso favorito para llevar a todas partes!'),
('12345678A', 10, '5','Este gorro de punto es increíblemente cálido y cómodo. Me encanta su diseño clásico y la calidad del tejido. ¡Es perfecto para mantenerme abrigado durante los días fríos de invierno! Definitivamente recomendaría este gorro a cualquiera que busque estilo y funcionalidad.' );