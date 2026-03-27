MercaBlue

README — Guía General del Proyecto
Repositorio: https://github.com/iimcriiss/supermercado

1. Descripción del Proyecto

MercaBlue es un sistema de comercio electrónico para supermercado que permite a los usuarios:

Explorar el catálogo de productos
Agregar artículos al carrito
Registrarse e iniciar sesión
Realizar compras en línea

El proyecto incluye además un panel de ventas para administradores.

   Campo	    |    Detalle
Nombre	      | MercaBlue
Tipo	        | E-commerce / Supermercado en línea
Repositorio   |	github.com/iimcriiss/supermercado
Estado	      | En desarrollo activo
Lenguajes	    | HTML, CSS, JavaScript, PHP
Base de datos	| MySQL
Estilos     	| Tailwind CSS (CDN)

2. Equipo de Desarrollo

El proyecto es desarrollado por un equipo de 3 personas con roles diferenciados:

 Integrante	|        Rol        | 	     Tecnologías
Cris	      |Frontend Designer	| HTML, Tailwind CSS, 
Yoiner	    | Base de datos -Backend Developer|	MySQL, administración de BD, PHP, lógica del servidor y Javascript

3. Estructura del Repositorio
supermercado/
│
├── index.html          -> Página principal (Home)
├── productos.html      -> Catálogo de productos
├── ventas.html         -> Panel de ventas (solo admin)
│
├── js/
│   └── scripts.js      -> Lógica JavaScript compartida
│
├── php/
│   ├── db.php    -> Conexión a la base de datos
│   ├── login.php    -> Autenticación de usuarios
│   ├── registro.php    -> Registro de nuevos usuarios
│   ├── consultar_usuarios.php    -> Visualización de usuarios registrados
│   ├── guardar_venta.php    -> Procesamiento y creación de nuevas ventas
│   ├── consultar_ventas.php    -> Listado y reporte de ventas realizadas
│   ├── actualizar_venta.php    -> Modificación de datos de ventas existentes
│   └── eliminar_venta.php    -> Borrado de registros de ventas
│
├── css/
│   └── styles.css      -> Estilos personalizados
│
├── images/             -> Assets organizados por categoría
│
└── README.md

4. Requisitos del Sistema
Software necesario
Laragon (Apache + PHP + MySQL)
Navegador web moderno (Chrome, Firefox, Edge)
Git
Editor de código (VS Code recomendado)

⚠️ IMPORTANTE:
El proyecto debe ejecutarse desde Laragon
http://localhost/supermercado
NO desde Live Server de VS Code, ya que los archivos PHP requieren un servidor real.

5. Instalación y Configuración
Paso 1 — Clonar el repositorio
git clone https://github.com/iimcriiss/supermercado.git
Paso 2 — Ubicar el proyecto

Colocar la carpeta dentro del directorio raíz de Laragon:

C:\laragon\www\supermercado\
Paso 3 — Configurar la base de datos
Abrir phpMyAdmin desde Laragon
Crear una base de datos llamada: mercablue
Importar el archivo SQL del proyecto (ESTA EN EL REPOSITORIO)
Paso 4 — Ejecutar el proyecto
Iniciar Laragon
Abrir en el navegador:
http://localhost/supermercado

6. Flujo de Trabajo con Git
Ramas del proyecto
  Rama	        |     Uso
main    	      | Producción
dev-cristopher	| HTML, CSS, JS (Cris)
dev-yoiner     	| SQL, PHP y base de datos (Yoiner)

Flujo recomendado
# Antes de trabajar
git checkout dev-nombre-de-la-rama
git pull origin main

# Hacer cambios
git add .
git commit -m "descripcion del cambio"
git push origin frontend
Luego abrir un Pull Request en GitHub hacia main.

7. Funcionalidades Implementadas
Página de inicio con hero, productos destacados y slider de ofertas
Catálogo con sidebar de categorías y subcategorías
Filtro por texto, categoría y rango de precio
Carrito deslizante con contador y total
Modal de login y registro con feedback dinámico
Sistema de sesión con roles (usuario / administrador)
Panel de ventas solo para administradores
Filtrado por categoría desde URL (?categoria=...)
Botón de favoritos en tarjetas de producto

8. Tecnologías Utilizadas
    Tecnología	    |     Uso en el proyecto
HTML5	              | Estructura de las páginas
Tailwind CSS CDN    | Estilos y diseño responsivo
JavaScript Vanilla	| Carrito, filtros, modals, slider
PHP	                | Login, registro, procesamiento de datos
MySQL	              | Usuarios, productos, ventas
Laragon	            | Entorno de desarrollo local
Git / GitHub	      | Control de versiones y colaboración

MercaBlue — 2024-2025 - Proyecto Académico
