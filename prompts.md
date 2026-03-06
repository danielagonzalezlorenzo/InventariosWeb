- Creacion de la estructura del proyecto
Necesito crear una aplicación web para un sistema de inventarios y ventas.
Requisitos principales:
Autenticación: login usando JWT.
Dashboard: mostrar información del stock actual, con filtros por categoría y búsqueda por SKU o nombre de producto.
Gestión de productos y categorías: vistas separadas para CRUD de productos y categorías.
Ya tengo la base de datos creada en MySQL Workbench, incluyendo tablas y procedimientos almacenados.
Planeo usar las siguientes tecnologías:
Backend: Node.js con Express.
Frontend: HTML, CSS, JavaScript, Handlebars (HBS) como motor de plantillas, Ajax y jQuery.
Por favor, ayúdame a diseñar la estructura de carpetas y archivos del proyecto siguiendo el patrón Modelo-Vista-Controlador (MVC), asegurando un flujo correcto de la aplicación y facilitando la escalabilidad y mantenimiento.

-Mejora de la estructura en la base de datos
Tengo una propuesta de base de datos para un proyecto de inventarios y ventas. Las tablas y campos que propuse son los siguientes:
Tabla categorias: id (PK), sku unico, nombre
Tabla productos: id (PK), sku unico, id_categoria(FK a categorias.id), nombre, stock_minimo, activo
Tabla movimientos: id (PK), producto_id (FK a productos.id), tipo (entrada/salida), cantidad, fecha
Tabla usuarios: id (PK), username, password
Quiero que me ayudes a mejorar la estructura de mi base de datos teniendo en cuenta:
Buenas prácticas de diseño relacional.
Tipos de datos adecuados para cada campo.
Relaciones y restricciones (PK, FK, UNIQUE, NOT NULL).
