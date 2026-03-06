## Requerimientos no funcionales
A continuación se presentan los requerimientos no funcionales definidos para la implementación del proyecto de gestión de inventarios.

## Validaciones básicas: 
No permitir que el stock tenga cantidades negativas.
No permitir que se registren movimientos de salida en inventario si la cantidad que se desea extraer es mayor a la que se tiene en stock. 
No permitir que existan SKU duplicados, o agregar categorías y productos que ya están registrados.
No permitir que se envíen formularios con campos vacíos.
No permitir modificar el SKU de un producto.
No permitir que se elimine una categoría si existen productos registrados en ella.

## Interfaz:
Se requiere una interfaz intuitiva y amigable para el usuario.
Debe ser responsiva, funcionando correctamente en distintos tamaños de pantalla.
Debe ofrecer al usuario una interacción correcta y fluida al trabajar con formularios, listas y movimientos de inventario.
La estructura visual del proyecto debe estar diseñada para ser clara y organizada, facilitando la navegación entre categorías, productos y registros de inventario.

## Datos:
Se utiliza una base de datos relacional para el manejo de la información.
Tablas principales:
Categorías: almacena las categorías de productos.
Productos: cada producto está asociado a una categoría.
Movimientos de inventario: registra entradas y salidas de productos, permitiendo calcular el stock actual de manera precisa.
Implementación de procedimientos almacenados para optimizar el manejo de la información, permitiendo la modificación, extracción y cálculo de datos de manera dinámica y eficiente en la base de datos.

## Estructura del código:
El proyecto está desarrollado siguiendo la arquitectura MVC (Modelo-Vista-Controlador), lo que facilita la creación de módulos y la separación de responsabilidades. La estructura del código está organizada para que la información pueda modificarse y ampliarse fácilmente a medida que el proyecto crece. A continuación se detalla la organización de carpetas y archivos, explicando el propósito de cada una de ellas:

Controllers: Contiene los controladores de la aplicación. Se encargan de procesar las solicitudes del usuario, interactuar con los modelos y devolver respuestas a las vistas.
Models: Contiene los modelos de datos. Define la estructura de la base de datos y las funciones para consultas, inserciones y cálculos. Utiliza procedimientos almacenados o métodos para calcular el stock y manejar movimientos de inventario.
Routes: Contiene los archivos de rutas que definen las URL disponibles en la aplicación. Cada ruta está asociada a un controlador que procesa la solicitud correspondiente.
Middleware: Contiene funciones intermedias que se ejecutan antes de llegar a los controladores, como validaciones de autenticación, autorización, o manejo de errores.
Views: Contiene las vistas de la aplicación, desarrolladas con HBS (Handlebars). Cada sección del DOM está separada en plantillas independientes, facilitando el mantenimiento y mejorando el flujo de la interfaz.
Public: Contiene archivos estáticos, como hojas de estilo CSS, scripts de JavaScript del lado del cliente.
Config: Contiene la configuración de la aplicación, como la conexión a la base de datos y variables de entorno.

## Preguntas
¿Cuál sería el prompt que le darías a la IA para que te genere el código de este módulo?
Actúa como un Ingeniero de Software. Ayúdame a crear una aplicación web que ayude a registrar movimientos en el inventario de una tienda con las funciones de agregar, editar y eliminar lógicamente tanto productos como categorías, así como registrar movimientos de entrada y salida de stock a inventario. Los requerimientos son los siguientes:
[requerimientos]. Ayúdame a definir la estructura de las carpetas, de la base de datos y la estructura base del código, por favor. Utilizando las tecnologías [tecnologías deseadas].

¿Cuáles serían las funcionalidades extra que agregarías al proyecto?
Permitir ver los productos y categorias que se hayan eliminado para poder volver a activarlos.
Permitir generar reportes sobre los movimientos en inventario.
Permitir descargar archivos que muestren la información de la tabla, ya sea filtrada por categoría o por búsqueda de nombre/SKU.
Agregar registro de usuarios.

¿Cuáles serían las funcionalidades básicas y las buenas prácticas de código que pedirías?
Las funcionalidades básicas que consideraría indispensables en un proyecto de gestión de inventarios incluyen:
Gestión de productos y categorías (CRUD), control de stock, validaciones en los datos, interfaz amigable y responsiva.
En cuanto a buenas prácticas de código, las principales serían:
Buena estructuración de carpetas, homologación y claridad de identificadores, separación de responsabilidades, uso de plantillas y componentes reutilizables para las vistas y documentación y comentarios claros.

## Descripción general
El proyecto es una aplicación web de gestión de inventarios que permite registrar, visualizar y controlar los movimientos de inventario en una empresa comercializadora.
Funcionalidades principales:
Gestión de productos y categorías: agregar, editar y eliminar productos y categorías mediante formularios intuitivos.
Menú interactivo: las opciones se presentan mediante botones que permiten al usuario seleccionar fácilmente la acción deseada.
Dashboard de inventario: visualiza en tiempo real el stock disponible y permite filtrar la información por categoría y buscar productos por SKU o nombre.

## Decisiones técnicas
Para el desarrollo de este proyecto se eligieron las siguientes tecnologías por su eficiencia, escalabilidad y facilidad de mantenimiento:
Node.js: permite ejecutar JavaScript en el servidor, ofreciendo alta velocidad y rendimiento para manejar múltiples conexiones de manera eficiente. Además, facilita el uso de la misma sintaxis en frontend y backend, simplificando el desarrollo.
Express.js: framework de Node.js que proporciona una estructura flexible para construir aplicaciones web y APIs, con manejo sencillo de rutas, middlewares y controladores.
HTML, CSS y Bootstrap: base para construir una interfaz visual clara y responsiva, adaptable a distintos tamaños de pantalla sin necesidad de complejas configuraciones.
jQuery y AJAX: facilitan la interacción dinámica con el servidor sin recargar la página, mejorando la experiencia del usuario en formularios y dashboards.
Handlebars (HBS): motor de plantillas que permite separar la lógica de la vista, manteniendo el código organizado y reutilizable, especialmente útil para componentes del DOM que se repiten.
MySQL (base de datos relacional): permite estructurar la información de manera consistente usando tablas relacionadas, ideal para manejar productos, categorías y movimientos de inventario. Además, su compatibilidad con procedimientos almacenados facilita cálculos y consultas dinámicas.
En conjunto, estas tecnologías me permitieron construir una aplicación modular, escalable y mantenible, con un flujo de información confiable y una experiencia de usuario intuitiva.

## Arquitectura
### Proyecto
El proyecto Inventarios Web está desarrollado en Node.js utilizando el patrón de diseño Modelo-Vista-Controlador (MVC). Este patrón permite separar responsabilidades, facilitando el mantenimiento y la escalabilidad del proyecto.
Como se muestra en el siguiente diagrama
 ┌─────────────┐
 │   Cliente   │
 │  (Browser)  │
 └─────┬───────┘
       ▼
 ┌─────────────┐
 │   Vistas    │  <- Handlebars (.hbs)
 └─────┬───────┘
       ▼
 ┌─────────────┐
 │Controladores│
 │(controllers)│
 └─────┬───────┘
       │
       ▼
 ┌─────────────┐
 │   Modelos   │
 │  (models)   │
 └─────┬───────┘
       ▼
┌─────────────┐
│  Base de    │
│  Datos MySQL│
└─────────────┘
### Base de datos 
El proyecto utiliza una base de datos relacional en MySQL para gestionar la información de productos, categorías y movimientos de inventario. 
La estructura principal incluye las siguientes tablas con las siguientes especificaciones:
Categorias
id: clave primaria, identificador único de la categoría.
sku: código único de la categoría.
nombre: nombre descriptivo de la categoría.

Productos
id: clave primaria, identificador único del producto.
sku: código único del producto.
id_categoria: clave foránea que referencia a categorias.id, indicando la categoría a la que pertenece el producto.
nombre: nombre del producto.
stock_minimo: cantidad mínima de stock permitida.
activo: bandera que indica si el producto está activo o desactivado.

Movimientos
id: clave primaria, identificador único del movimiento.
id_producto: clave foránea que referencia a productos.id, indicando el producto del que se realiza el movimiento.
tipo_movimiento: dato que indica si el movimiento es de entrada o salida del producto al inventario.
cantidad: número de productos que se entran o salen del inventario.
fecha: fecha en la que se realiza el registro del movimiento.
motivo: descripción de la razón del movimiento.

Usuarios
id: clave primaria, identificador único del usuario.
usuario: credencial de acceso para iniciar sesión.
contraseña: credencial de acceso para iniciar sesión.

## Instrucciones de instalación, ambientación y ejecución
### Prerequisitos 
Node.js: versión 9.8.1 de npm y estar usando la versión 18.18.2 de node. 
Mysql: Versión 8.0.45 for Win64 on x86_64 (MySQL Community Server - GPL) y MySQL Workbench 8.0. 

### Clonación e instalación 
git clone https://github.com/danielagonzalezlorenzo/InventariosWeb.git 
- Entrar a la carpeta raíz del proyecto
- Ejecutar comando cp .env.example .env
- Ejecutar el siguiente comando para instalar todas las dependencias que se mencionan en package.json
npm install
- En caso de que no funcione el comando anterior, ejecutar los comandos siguientes
npm install express mysql2 dotenv jsonwebtoken bcryptjs
npm install express-handlebars cookie-parser
npm install --save-dev nodemon
- Revisar package.json, que contenga lo siguiente en la parte de scripts. 
"scripts": {
  "dev": "nodemon app.js",
  "start": "node app.js"
}

## Variables de entorno 
Mi archivo .env.example contiene los datos que utilicé para conectar mi proyecto a mi base de datos y crear el token de mi sesión iniciada, crear un archivo .env con los datos de sus variables.
Editar archivo .env, cambiar mis datos por los datos de conexión a su base de datos.

## Base de datos 
El proyecto incluye una carpeta llamada database en donde se encuentra un archivo llamado schema.sql, el cual muestra todas las instrucciones para crear o migrar mi base de datos.
- Entrar a MySQL Workbench, pegar todo el script y ejecutar.
- Hacer lo mismo con el script seed.sql, el cual contiene datos de prueba y el usuario que se debe agregar para iniciar sesión.

## Ejecución
- Ingresar a la carpeta raiz en donde se encuentra el proyecto
cd ..\InventariosWeb 
- Ejecutar el comando npm run dev

## Accesso
- Ingresar a la URL local http://localhost:3000/auth/login
Las credenciales de prueba son:
  usuario:admin, contraseña:1234

## Proceso de Desarrollo con IA
### Herramientas utilizadas
Para el desarrollo de este proyecto se emplearon las herramientas de IA ChatGPT y Gemini. Estas se utilizaron como apoyo para:
Definir la estructura del proyecto y de la base de datos.
Identificar y solucionar errores rápidamente.
Optimizar y mejorar la calidad del código.
En la carpeta raíz del proyecto se incluyó un archivo llamado prompts.md, que contiene los prompts más relevantes utilizados durante el proceso de desarrollo.

### Proceso de desarrollo
Antes de iniciar la implementación, se analizaron los requerimientos y se realizó una planeación previa en papel. 
Durante esta etapa se definieron:
Las herramientas a utilizar.
El patrón de diseño a implementar (Modelo-Vista-Controlador).
La estructura de la base de datos, incluyendo las tablas y sus relaciones.
Posteriormente, se utilizó la IA para revisar y recibir retroalimentación sobre la estructura de la base de datos, permitiendo realizar mejoras antes de la implementación.

Posteriormente se configuraron todas las herramientas necesarias para el desarrollo de la aplicación y se creó la base de datos, agregando tablas y datos de prueba. También se definieron algunos procedimientos almacenados que serían utilizados durante la implementación.
El siguiente paso fue solicitar ayuda a la IA para definir la estructura inicial del proyecto MVC, incluyendo la organización de carpetas y archivos base con su configuración inicial. Esto permitió comenzar el desarrollo de forma ordenada y eficiente.
El código se construyó de manera incremental, agregando funcionalidades según su prioridad. 
Durante la implementación surgieron errores difíciles de identificar, para los cuales la IA fue de gran ayuda, proporcionando soluciones o sugiriendo alternativas.
La IA también ayudó a optimizar funciones y mejorar la calidad del código. En casos de funciones complejas, la IA proporcionaba ejemplos con identificadores diferentes, que luego se adaptaban a la nomenclatura del proyecto.

Conclusión sobre el uso de IA
La IA resultó ser una herramienta clave para el desarrollo del proyecto, ayudando a:
Definir estructuras de proyectos y bases de datos.
Crear módulos y funciones de manera eficiente.
Identificar y solucionar errores rápidamente.
Optimizar el código y mejorar la calidad del desarrollo.
En general, la IA permitió reducir significativamente el tiempo de desarrollo, facilitó la implementación de la aplicación y sirvió como guía durante todo el proceso.
En lo personal, la IA se tomará en cuenta para el desarrollo de futuras aplicaciones, buscando mejorar la interacción con la misma mediante prompts mas específicos. 

