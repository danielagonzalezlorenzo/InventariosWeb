CREATE DATABASE IF NOT EXISTS InventarioDB;
USE InventarioDB;

CREATE TABLE IF NOT EXISTS Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    sku_categoria VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    sku_producto VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    id_categoria INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    unidad_medida VARCHAR(20) NOT NULL,
    stock_minimo INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Movimientos_Inventario (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    tipo_movimiento ENUM('entrada','salida') NOT NULL,
    cantidad INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(255),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);


USE `inventariodb`;
DROP procedure IF EXISTS `sp_addCategory`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_addCategory`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addCategory`(
IN sku VARCHAR(10),
IN nomb VARCHAR(50) 
)
BEGIN
	IF EXISTS (SELECT 1 FROM categorias WHERE sku = sku_categoria) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'SKU ya existe';
    ELSE
        INSERT INTO categorias (sku_categoria, nombre,activo) VALUES (sku, nomb, 1);
    END IF;
END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_addMovement`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_addMovement`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addMovement`(
IN sku VARCHAR(10),
IN tipo VARCHAR(10),
IN cant INT, 
IN motiv VARCHAR(255)
)
BEGIN
	DECLARE producto INT;
	SELECT id_producto INTO producto FROM productos WHERE sku_producto = sku;
    
    INSERT INTO movimientos_inventario(id_producto,tipo_movimiento,cantidad,fecha,motivo) 
        VALUES (producto,tipo,cant,NOW(),motiv);
    
END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_addProduct`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_addProduct`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addProduct`(
IN sku VARCHAR(10),
IN nomb VARCHAR(50),
IN cat INT,
IN precio DECIMAL(10,2), 
IN medida VARCHAR(20), 
IN stock INT)
BEGIN
	IF EXISTS (SELECT 1 FROM productos WHERE sku = sku_producto) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'SKU ya existe';
    ELSE
        INSERT INTO productos(sku_producto,nombre,id_categoria,precio_unitario,unidad_medida,stock_minimo,activo) 
        VALUES (sku,nomb,cat,precio,medida,stock,1);
    END IF;
END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_deleteCategory`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_deleteCategory`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteCategory`(IN sku VARCHAR(10))
BEGIN
	IF NOT EXISTS (SELECT 1 FROM categorias WHERE sku_categoria = sku) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Categoria no encontrada';
    ELSE
        UPDATE categorias SET activo=0
        WHERE sku_categoria = sku;
    END IF;
END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_deleteProduct`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_deleteProduct`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteProduct`(IN sku VARCHAR(10))
BEGIN
	IF NOT EXISTS (SELECT 1 FROM productos WHERE sku_producto = sku) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Producto no encontrado';
    ELSE
        UPDATE productos SET activo=0
        WHERE sku_producto = sku;
    END IF;
END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_editCategory`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_editCategory`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_editCategory`(
    IN sku VARCHAR(10), 
    IN nomb VARCHAR(50) 
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM categorias WHERE sku_categoria = sku) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Categoria no encontrada';
    ELSE
        UPDATE categorias SET nombre = nomb
        WHERE sku_categoria = sku;
    END IF;

END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_editProduct`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_editProduct`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_editProduct`(
IN sku VARCHAR(10),
IN nomb VARCHAR(50),
IN cat INT,
IN precio DECIMAL(10,2), 
IN medida VARCHAR(20), 
IN stock INT)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM productos WHERE sku = sku_producto) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Producto no encontrado';
    ELSE
        UPDATE productos SET nombre = nomb, id_categoria = cat, precio_unitario = precio,
        unidad_medida = medida, stock_minimo = stock, activo = 1
        WHERE sku_producto = sku;
    END IF;
END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_getCategories`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_getCategories`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getCategories`()
BEGIN
    SELECT * FROM categorias WHERE activo = 1;
END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_stockByCat`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_stockByCat`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_stockByCat`(IN cat INT)
BEGIN
    SELECT 
        p.id_producto,
        p.sku_producto,
        p.nombre AS nombre_producto,
        c.nombre AS categoria,
        p.precio_unitario,
        p.unidad_medida,
        p.stock_minimo,
        
        COALESCE(SUM(
            CASE 
                WHEN m.tipo_movimiento = 'entrada' THEN m.cantidad
                WHEN m.tipo_movimiento = 'salida' THEN -m.cantidad
            END
        ), 0) AS stock_actual
        
    FROM Productos p
    INNER JOIN Categorias c 
        ON p.id_categoria = c.id_categoria
    LEFT JOIN Movimientos_Inventario m 
        ON p.id_producto = m.id_producto
    WHERE p.activo = 1 AND (cat IS NULL OR cat = c.id_categoria)
    GROUP BY 
        p.id_producto,
        p.sku_producto,
        p.nombre,
        c.nombre,
        p.precio_unitario,
        p.unidad_medida,
        p.stock_minimo
    ORDER BY p.id_producto;
END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_stockBySearch`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_stockBySearch`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_stockBySearch`(IN busqueda VARCHAR(100))
BEGIN
SELECT 
        p.id_producto,
        p.sku_producto,
        p.nombre AS nombre_producto,
        c.nombre AS categoria,
        p.precio_unitario,
        p.unidad_medida,
        p.stock_minimo,
        
        COALESCE(SUM(
            CASE 
                WHEN m.tipo_movimiento = 'entrada' THEN m.cantidad
                WHEN m.tipo_movimiento = 'salida' THEN -m.cantidad
            END
        ), 0) AS stock_actual
        
    FROM Productos p
    INNER JOIN Categorias c 
        ON p.id_categoria = c.id_categoria
    LEFT JOIN Movimientos_Inventario m 
        ON p.id_producto = m.id_producto
    WHERE p.activo = 1 AND (p.sku_producto LIKE CONCAT('%', busqueda, '%')
       OR p.nombre LIKE CONCAT('%', busqueda, '%'))
    GROUP BY 
        p.id_producto,
        p.sku_producto,
        p.nombre,
        c.nombre,
        p.precio_unitario,
        p.unidad_medida,
        p.stock_minimo
    ORDER BY p.id_producto;
END$$

DELIMITER ;
;

USE `inventariodb`;
DROP procedure IF EXISTS `sp_stockComplet`;

USE `inventariodb`;
DROP procedure IF EXISTS `inventariodb`.`sp_stockComplet`;
;

DELIMITER $$
USE `inventariodb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_stockComplet`()
BEGIN
	SELECT 
        p.id_producto,
        p.sku_producto,
        p.nombre AS nombre_producto,
        c.nombre AS categoria,
        p.precio_unitario,
        p.unidad_medida,
        p.stock_minimo,
        
        COALESCE(SUM(
            CASE 
                WHEN m.tipo_movimiento = 'entrada' THEN m.cantidad
                WHEN m.tipo_movimiento = 'salida' THEN -m.cantidad
            END
        ), 0) AS stock_actual
        
    FROM Productos p
    INNER JOIN Categorias c 
        ON p.id_categoria = c.id_categoria
    LEFT JOIN Movimientos_Inventario m 
        ON p.id_producto = m.id_producto
    WHERE p.activo = 1 
    GROUP BY 
        p.id_producto,
        p.sku_producto,
        p.nombre,
        c.nombre,
        p.precio_unitario,
        p.unidad_medida,
        p.stock_minimo
    ORDER BY p.id_producto;
END$$

DELIMITER ;
;