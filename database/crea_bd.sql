/*Creamos la base de datos*/
CREATE DATABASE IF NOT EXISTS PROYECTO_MARIA;

/*Utilizar la base de datos*/
USE PROYECTO_MARIA;

/*Crear las tablas*/
CREATE TABLE USUARIO (
    dni CHAR(9) PRIMARY KEY,
    nombre VARCHAR(30),
    apellidos VARCHAR(50),
    email VARCHAR(100),
    username VARCHAR(25),
    password VARCHAR(12),
    rol ENUM('user','admin') DEFAULT 'user');

CREATE TABLE CLIENTE (
    dni CHAR(9) PRIMARY KEY,
    calle VARCHAR(100),
    ciudad VARCHAR(50),
    cp CHAR(5),
    FOREIGN KEY (dni) REFERENCES Usuario(dni)
    );

CREATE TABLE PEDIDO (
	idPedido INT AUTO_INCREMENT PRIMARY KEY,
    idCliente CHAR(9),
    fechaPedido DATE,
    fechaEntrega DATE,
    estado VARCHAR(100),
    tipoPago ENUM('mano','bizum','transferencia'),
    importeTotal DOUBLE,
    FOREIGN KEY (idCliente) REFERENCES Cliente(dni)
    
);

CREATE TABLE CATEGORIA (
	idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    idCategoriaPadre INT,
    nombre VARCHAR(50),
    descripcion TEXT,
    FOREIGN KEY (idCategoriaPadre) REFERENCES Categoria(idCategoria)
);

CREATE TABLE PRODUCTO(
	idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    categoria INT,
    descripcion TEXT,
    color VARCHAR(25),
    precio DOUBLE,
    imagen BLOB,
    FOREIGN KEY (categoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE PEDIDO_PRODUCTO(
    idPedido INT,
    idProducto INT,
    precioUnitario DOUBLE,
    cantidad INTEGER,
    PRIMARY KEY (idPedido,idProducto),
    FOREIGN key (idPedido) REFERENCES Pedido(idPedido),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

CREATE TABLE COMENTARIO (
  	idComentario  INT AUTO_INCREMENT PRIMARY KEY,
    idCliente CHAR(9),
    idProducto INT,
    puntuacion INTEGER,
    texto TEXT,
    FOREIGN KEY (idCliente) REFERENCES Cliente(dni),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

CREATE TABLE TALLA (
  	idProducto INT,
    talla VARCHAR(25),
    stock INTEGER,
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);
