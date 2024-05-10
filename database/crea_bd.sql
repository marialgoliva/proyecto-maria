/*Creamos la base de datos*/
CREATE DATABASE IF NOT EXISTS PROYECTO_TEST1;

/*Utilizar la base de datos*/
USE PROYECTO_TEST1;



CREATE TABLE USUARIOS (
    dni CHAR(9) PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(25) NOT NULL,
    password CHAR(60) NOT NULL,
    rol ENUM('user','admin') DEFAULT 'user' NOT NULL
);


CREATE TABLE CLIENTES (
    email VARCHAR(100) PRIMARY KEY,
    calle VARCHAR(100) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    cp CHAR(5) NOT NULL,
    nombre VARCHAR(250) UNIQUE,
    dni CHAR(9)
    );
    
CREATE TABLE PEDIDOS (
	idPedido INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    fechaPedido DATE NOT NULL,
    fechaEntrega DATE,
    estado VARCHAR(100),
    tipoPago ENUM('efectivo','bizum','tarjeta'),
    importeTotal DOUBLE NOT NULL,
    idCliente CHAR(9),
    FOREIGN KEY (email) REFERENCES CLIENTES(email) ON DELETE CASCADE
    
);

CREATE TABLE CATEGORIA (
	idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    idCategoriaPadre INT,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (idCategoriaPadre) REFERENCES Categoria(idCategoria) ON DELETE CASCADE
);

CREATE TABLE PRODUCTO(
	idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    categoria INT NOT NULL,
    descripcion TEXT,
    color VARCHAR(25),
    precio DOUBLE NOT NULL,
    imagen VARCHAR(250),
    FOREIGN KEY (categoria) REFERENCES Categoria(idCategoria) ON DELETE CASCADE
);

CREATE TABLE PEDIDO_PRODUCTO(
    id INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT,
    talla VARCHAR(4),
    FOREIGN key (idPedido) REFERENCES Pedidos(idPedido) ON DELETE CASCADE, 
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON DELETE CASCADE
);

CREATE TABLE COMENTARIO (
  	idComentario  INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100),
    idProducto INT NOT NULL,
    puntuacion INT NOT NULL,
    texto TEXT,
    FOREIGN KEY (cliente) REFERENCES Clientes(nombre),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON DELETE CASCADE
);

CREATE TABLE STOCK (
  	idProducto INT ,
    talla VARCHAR(25),
    stock INT NOT NULL,
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto) ON DELETE CASCADE
);
