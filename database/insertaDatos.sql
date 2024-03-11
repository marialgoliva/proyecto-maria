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

INSERT INTO `PEDIDO` (`idPedido`,`idCliente`,`fechaPedido`,`fechaEntrega`,`estado`,`tipoPago`,`importeTotal`) VALUES 
('1', '12345678A', '2024-01-01', '2024-01-10', 'En Proceso', 'Transferencia', 150.00),
('2', '23456789B', '2024-02-05', '2024-02-15', 'Entregado', 'Bizum', 200.50),
('3', '34567890C', '2024-03-10', '2024-03-20', 'En Proceso', 'Mano', 75.80),
('4', '45678901D', '2024-04-15', '2024-04-25', 'Entregado', 'Transferencia', 120.30),
('5', '56789012E', '2024-05-20', '2024-05-30', 'En Proceso', 'Bizum', 90.25);


-- Insertamos categorias que no tienen categoria padre sin especificar este.

INSERT INTO `CATEGORIA` (`idCategoria`,`nombre`,`descripcion`) VALUES
('1','Gorros','Haz tu look único y cómodo con nuestra selección de gorros hechos a mano para todas las edades'),
('2','Bolsas','Explora nuestras bolsas hechas a mano en una variedad de colores para adaptarse a tu personalidad y ocasión. Estilo y comodidad en cada pieza.'),
('3','Prendas','Descubre la comodidad y el atractivo de nuestras prendas, con opciones para todas las edades.');

-- Insertamos categorias que en este caso si tienen categoria padre.

INSERT INTO `CATEGORIA` (`idCategoria`,`idCategoriaPadre`,`nombre`,`descripcion`) VALUES
('1a','1','Gorro Bucket','Gorros bucket hechos a mano. Estilo casual y desenfadado para completar tu look.'),
('2a','2','Bolsos','Descubre nuestra colección única y elige la perfecta para cualquier ocasión.');

-- Insertamos productos de ejemplo.
-- Las imágenes se almacenarán como rutas al directorio en el que se encuentren, esto se modificará conforme el proyecto tome forma.

INSERT INTO `PRODUCTO` (`idProducto`, `nombre`, `categoria`, `descripcion`, `color`, `precio`, `imagen`)
VALUES 
(
    'G1',
    'Gorro de Punto',
    '1',
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'verde',
    30,
    '/img/gorro_punto_verde.png'
),
(
    'G2',
    'Gorro de Punto',
    '1',
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'verde',
    30,
    '/img/gorro_punto_verde.png'
),
(
    'G3',
    'Gorro de Punto',
    '1',
    'Gorros de punto únicos, tejidos a mano con cariño. Calidez y estilo en cada detalle.',
    'verde',
    30,
    '/img/gorro_punto_verde.png'
),
(
    'G4',
    'Gorro bucket reversible',
    '1a',
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'negro',
    35,
    '/img/bucket_reversible_negro.png'
),
(
    'G5',
    'Gorro bucket reversible',
    '1a',
    'Este gorro no solo te brinda un estilo único, sino que también te ofrece la versatilidad de dos diseños en uno',
    'negro',
    35,
    '/img/bucket_reversible_negro.png'
),
(
    'B1',
    'Bolso de mano',
    '2a',
    'El bolso de mano perfecto para acompañarte en tus aventuras diarias.',
    'negro',
    40,
    '/img/bolso_mano_negro.png'
),
(
    'B2',
    'Mochila Saco',
    '2',
    'Con amplio espacio de almacenamiento y durabilidad, esta mochila te permite llevar todo lo que necesitas mientras exploras el mundo.',
    'gris',
    25,
    '/img/mochila_gris.png'
);

-- Insertamos las tallas y su stock correspondiente para cada producto
INSERT INTO `TALLA` (`idProducto`,`talla`,`stock`) VALUES 
('G1','S',3),
('G2','S',2),
('G3','S',5),
('G4','S',4),
('G5','S',2),
('G1','M',6),
('G2','M',10),
('G3','M',8),
('G4','M',6),
('G5','M',5),
('G1','L',3),
('G2','L',2),
('G3','L',1),
('G4','L',3),
('G5','L',5),
('B1','',1),
('B2','',3);

-- Insertamos datos de ejemplo en la tabla Pedido-Producto, que relacionará los productos con sus correspondientes pedidos

INSERT INTO `PEDIDO_PRODUCTO` (`idPedido`,`idProducto`,`precioUnitario`,`cantidad`) VALUES 
('1','B1',40,1),
('1','G4',35,1),
('1','G5',35,1),
('2','B2',25,1),
('2','G1',30,1),
('2','G2',30,1),
('3','G2',30,3);

-- Insertamos datos en la tabla comentario relacionada con la tabla producto

INSERT INTO `COMENTARIO` (`idComentario`,`idCliente`,`idProducto`,`puntuacion`,`texto`) VALUES 
('C-1', '23456789B', 'B1','5','¡Me encanta mi nuevo bolso de mano! Es justo lo que estaba buscando: elegante, espacioso y de excelente calidad. Además, el diseño es tan versátil que combina perfectamente con cualquier atuendo. ¡Definitivamente mi bolso favorito para llevar a todas partes!'),
('C-2', '12345678A', 'G3', '5','Este gorro de punto es increíblemente cálido y cómodo. Me encanta su diseño clásico y la calidad del tejido. ¡Es perfecto para mantenerme abrigado durante los días fríos de invierno! Definitivamente recomendaría este gorro a cualquiera que busque estilo y funcionalidad.' );