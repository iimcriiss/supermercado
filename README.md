<div align="center">

# 🛒 MercaBlue

**Sistema de e-commerce para supermercado en línea**

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)

</div>

---

## 📋 Descripción

MercaBlue es un sistema de comercio electrónico para supermercado que permite a los usuarios explorar el catálogo de productos, agregar artículos al carrito, registrarse, iniciar sesión y realizar compras en línea. Incluye un panel de ventas exclusivo para administradores.

---

## 👥 Equipo de Desarrollo

| Integrante | Rol | Tecnologías |
|------------|-----|-------------|
| **Cris** | Frontend Designer | HTML, Tailwind CSS, JavaScript |
| **Nicolás** | Backend Developer | PHP, lógica del servidor |
| **Yoiner** | DBA / Base de datos | MySQL, administración de BD |

---

## 📁 Estructura del Repositorio

```
supermercado/
├── index.html              → Página principal (Home)
├── productos.html          → Catálogo de productos
├── ventas.html             → Panel de ventas (solo admin)
├── js/
│   └── scripts.js          → Lógica JavaScript compartida
├── php/
│   ├── db.php              → Conexión a la base de datos
│   ├── login.php           → Autenticación de usuarios
│   ├── registro.php        → Registro de nuevos usuarios
│   ├── consultar_usuarios.php  → Visualización de usuarios registrados
│   ├── guardar_venta.php   → Procesamiento y creación de nuevas ventas
│   ├── consultar_ventas.php    → Listado y reporte de ventas realizadas
│   ├── actualizar_venta.php    → Modificación de datos de ventas existentes
│   └── eliminar_venta.php  → Borrado de registros de ventas
├── css/
│   └── styles.css          → Estilos personalizados
├── images/                 → Assets organizados por categoría
└── README.md
```

---

## ⚙️ Requisitos del Sistema

- [Laragon](https://laragon.org/) (Apache + PHP + MySQL)
- Navegador web moderno (Chrome, Firefox, Edge)
- [Git](https://git-scm.com/)
- Editor de código (VS Code recomendado)

> ⚠️ **Importante:** El proyecto debe ejecutarse desde Laragon (`http://localhost/supermercado`), **NO** desde Live Server de VS Code. Los archivos PHP requieren un servidor real para funcionar.

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/iimcriiss/supermercado.git
```

### 2. Ubicar el proyecto en Laragon

```
C:\laragon\www\supermercado\
```

### 3. Configurar la base de datos

1. Abrir **phpMyAdmin** desde el panel de Laragon
2. Crear una base de datos llamada `mercablue`
3. Importar el archivo SQL del proyecto

### 4. Ejecutar el proyecto

1. Iniciar Laragon
2. Abrir el navegador en: `http://localhost/supermercado`

---

## 🌿 Flujo de Trabajo con Git

### Ramas

| Rama | Responsable | Contenido |
|------|-------------|-----------|
| `main` | Todos | Rama principal (producción) |
| `frontend` | Cris | HTML, CSS, JavaScript |
| `backend` | Nicolás | PHP |
| `database` | Yoiner | SQL, base de datos |

### Flujo recomendado

```bash
# Antes de trabajar, sincronizar con main
git checkout frontend
git pull origin main

# Hacer cambios, luego subir
git add .
git commit -m "descripción del cambio"
git push origin frontend

# Abrir un Pull Request en GitHub para mergear a main
```

---

## ✅ Funcionalidades Implementadas

- [x] Página de inicio con hero, productos destacados y slider de ofertas
- [x] Catálogo de productos con sidebar de categorías y subcategorías
- [x] Filtro de productos por texto, categoría y rango de precio
- [x] Carrito de compras deslizante con contador y total
- [x] Modal de login y registro con feedback dinámico
- [x] Sistema de sesión con roles (usuario / administrador)
- [x] Panel de ventas visible solo para administradores
- [x] Filtrado por categoría desde URL (`?categoria=...`)
- [x] Botón de favoritos en tarjetas de producto

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura de las páginas |
| Tailwind CSS (CDN) | Estilos y diseño responsivo |
| JavaScript Vanilla | Lógica del cliente (carrito, filtros, modals, slider) |
| PHP | Backend: login, registro, procesamiento de datos |
| MySQL | Base de datos: usuarios, productos, ventas |
| Laragon | Entorno de desarrollo local |
| Git / GitHub | Control de versiones y colaboración |

---

<div align="center">

**MercaBlue** · Proyecto Académico · 2024–2025
https://mercablue.page.gd/

</div>
<img width="1902" height="871" alt="Captura de pantalla 2026-03-29 194824" src="https://github.com/user-attachments/assets/f40a1186-6fc7-4e42-b401-ffb34f7067f8" />

<img width="1899" height="867" alt="Captura de pantalla 2026-03-29 194842" src="https://github.com/user-attachments/assets/3adbd8f3-d188-4602-8781-77564f431fbe" />

<img width="1899" height="873" alt="Captura de pantalla 2026-03-29 194902" src="https://github.com/user-attachments/assets/ddf2934c-1c39-45d0-b06f-064bebef43e2" />

<img width="1898" height="872" alt="Captura de pantalla 2026-03-29 194916" src="https://github.com/user-attachments/assets/73d9225c-95c3-488a-8103-1a6771ec0617" />

<img width="1899" height="871" alt="Captura de pantalla 2026-03-29 194934" src="https://github.com/user-attachments/assets/c9e4ad03-a0ee-4570-b0a5-04aeb4824a9c" />

<img width="1900" height="870" alt="Captura de pantalla 2026-03-29 194951" src="https://github.com/user-attachments/assets/b96d993b-8d7a-4284-b5fa-980325af4f1a" />

<img width="1900" height="872" alt="Captura de pantalla 2026-03-29 195010" src="https://github.com/user-attachments/assets/70dc230b-de40-4dd9-8d3f-f1f974727d6b" />

<img width="1894" height="872" alt="Captura de pantalla 2026-03-29 195025" src="https://github.com/user-attachments/assets/3534d85f-4049-47f2-a276-8f296dfe31af" />

<img width="1894" height="875" alt="Captura de pantalla 2026-03-29 195052" src="https://github.com/user-attachments/assets/7df5f964-5c85-4d99-ab30-20b2488b9345" />








