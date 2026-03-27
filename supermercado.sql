-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 27, 2026 at 08:21 PM
-- Server version: 8.4.3
-- PHP Version: 8.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermercado`
--
drop database if exists supermercado;
create database if not exists supermercado;
use supermercado;
-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id_producto` int NOT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoria` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `imagen` longblob,
  `activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `categoria`, `precio`, `stock`, `imagen`, `activo`) VALUES
(1, 'Chuleta de Cerdo 500g', 'cerdo', 11500.00, 49, NULL, 1),
(2, 'Costilla de Cerdo 500g', 'cerdo', 15900.00, 49, NULL, 1),
(3, 'Tocino para Chicharrón 500g', 'cerdo', 13200.00, 50, NULL, 1),
(4, 'Cañón de Cerdo en Medallones 500g', 'cerdo', 14500.00, 50, NULL, 1),
(5, 'Posta de Bagre Rayado 500g', 'pescado', 18900.00, 50, NULL, 1),
(6, 'Mojarra Roja Entera 450g', 'pescado', 12500.00, 50, NULL, 1),
(7, 'Atún Lomitos en Agua 160g', 'enlatados', 6500.00, 50, NULL, 1),
(8, 'Maíz Tierno Dulce Lata 220g', 'enlatados', 4200.00, 50, NULL, 1),
(9, 'Arvejas con Zanahoria Lata 300g', 'alimentos-basicos', 3800.00, 50, NULL, 1),
(10, 'Sardinas en Salsa de Tomate 425g', 'pescado', 5500.00, 50, NULL, 1),
(11, 'Carne Molida de Res Especial 500g', 'res', 15000.00, 50, NULL, 1),
(12, 'Lomo Ancho de Res Tajado 500g', 'res', 22000.00, 50, NULL, 1),
(13, 'Costilla de Res Porcionada 500g', 'res', 14000.00, 50, NULL, 1),
(14, 'Carne de Res para Desmechar 500g', 'res', 16500.00, 50, NULL, 1),
(15, 'Pechuga de Pollo Entera 1 Kg', 'pollo', 18000.00, 50, NULL, 1),
(16, 'Muslos de Pollo Bandeja 500g', 'pollo', 9500.00, 50, NULL, 1),
(17, 'Alas de Pollo Especiales 500g', 'pollo', 11000.00, 50, NULL, 1),
(18, 'Pollo Entero Fresco Sin Menudencias', 'pollo', 28000.00, 50, NULL, 1),
(19, 'Panal Huevos Rojos Tamaño AA x 30', 'huevos', 16500.00, 50, NULL, 1),
(20, 'Caja Huevos Rojos Tamaño A x 12', 'huevos', 7200.00, 50, NULL, 1),
(21, 'Huevos de Codorniz Frescos x 24', 'huevos', 5500.00, 50, NULL, 1),
(22, 'Huevos Orgánicos Gallina Libre x 12', 'huevos', 12000.00, 50, NULL, 1),
(23, 'Cilantro Fresco Ramo Grande', 'hierbas', 1500.00, 50, NULL, 1),
(24, 'Ajo Blanco Malla x 3 Cabezas', 'hierbas', 3200.00, 50, NULL, 1),
(25, 'Perejil Crespo Fresco Ramo', 'hierbas', 1500.00, 50, NULL, 1),
(26, 'Pimienta Negra Molida Frasco 50g', 'hierbas', 4800.00, 50, NULL, 1),
(27, 'Arroz Blanco Premium 1kg', 'alimentos-basicos', 3500.00, 50, NULL, 1),
(28, 'Aceite 900ml', 'alimentos-basicos', 12000.00, 50, NULL, 1),
(29, 'Sal Refinada Yodada 1kg', 'alimentos-basicos', 1800.00, 50, NULL, 1),
(30, 'Azúcar Blanca Especial 1kg', 'alimentos-basicos', 4200.00, 50, NULL, 1),
(31, 'Jamón de Cerdo Tajado 250g', 'charcuteria', 8500.00, 50, NULL, 1),
(32, 'Salchicha Perro Caliente x10', 'charcuteria', 11000.00, 50, NULL, 1),
(33, 'Salami Tipo Italiano 100g', 'charcuteria', 9800.00, 50, NULL, 1),
(34, 'Chorizo Antioqueño x 6 Unid', 'charcuteria', 14500.00, 50, NULL, 1),
(35, 'Gaseosa Coca Cola 1.5 Litros', 'bebidas-liquidas', 4500.00, 50, NULL, 1),
(36, 'Jugo 1L', 'bebidas-liquidas', 6800.00, 50, NULL, 1),
(37, 'Agua Mineral Sin Gas 600ml', 'bebidas-liquidas', 2500.00, 50, NULL, 1),
(38, 'Té Frío Sabor Limón 400ml', 'bebidas-liquidas', 3800.00, 50, NULL, 1),
(39, 'Mantequilla con Sal 125g', 'mantequilla', 5500.00, 50, NULL, 1),
(40, 'Crema de Leche Bolsa 200ml', 'mantequilla', 4800.00, 50, NULL, 1),
(41, 'Margarina de Girasol 250g', 'mantequilla', 3900.00, 50, NULL, 1),
(42, 'Suero Costeño Tradicional 250g', 'mantequilla', 6200.00, 50, NULL, 1),
(43, 'Helado de Vainilla 1000ml', 'helados', 14000.00, 50, NULL, 1),
(44, 'Paleta de Agua Sabor Limón', 'helados', 2000.00, 50, NULL, 1),
(45, 'Copa de Helado Chocolate 150ml', 'helados', 4500.00, 50, NULL, 1),
(46, 'Helado Gourmet Vainilla Brownie', 'helados', 16500.00, 50, NULL, 1),
(47, 'Gelatina de Fresa en Vaso', 'postres', 1500.00, 50, NULL, 1),
(48, 'Flan de Caramelo Individual', 'postres', 3800.00, 50, NULL, 1),
(49, 'Arroz con Leche Casero 200g', 'postres', 4200.00, 50, NULL, 1),
(50, 'Arequipe Tradicional 250g', 'postres', 5500.00, 50, NULL, 1),
(51, 'Chocolate en Polvo Fortificado 500g', 'bebidas-polvo', 12000.00, 50, NULL, 1),
(52, 'Café Clásico Frasco 170g', 'bebidas-polvo', 8500.00, 50, NULL, 1),
(53, 'Refresco en Polvo Sabor Lulo', 'bebidas-polvo', 1000.00, 50, NULL, 1),
(54, 'Avena Molida en Polvo 400g', 'bebidas-polvo', 7500.00, 50, NULL, 1),
(55, 'Manzanas Rojas Frescas 1 Kg', 'frutas', 3500.00, 50, NULL, 1),
(56, 'Bananos Maduros 1 Kg', 'frutas', 2800.00, 50, NULL, 1),
(57, 'Naranjas Valencia Jugosas 1 Kg', 'frutas', 3200.00, 50, NULL, 1),
(58, 'Fresas Frescas de Temporada 500g', 'frutas', 4500.00, 50, NULL, 1),
(59, 'Tomate Chonto Maduro 1 Kg', 'verduras', 2500.00, 50, NULL, 1),
(60, 'Papa Pastusa Seleccionada 2 Kg', 'verduras', 3000.00, 50, NULL, 1),
(61, 'Cebolla Cabezona Blanca 1 Kg', 'verduras', 2200.00, 50, NULL, 1),
(62, 'Espinaca Fresca Bolsa 500g', 'verduras', 1900.00, 50, NULL, 1),
(63, 'Leche Entera Larga Vida 1L', 'leche', 3800.00, 50, NULL, 1),
(64, 'Leche Descremada Deslactosada 1L', 'leche', 4000.00, 50, NULL, 1),
(65, 'Leche en Polvo Entera 400g', 'leche', 18500.00, 50, NULL, 1),
(66, 'Queso Campesino Fresco 250g', 'queso', 9500.00, 50, NULL, 1),
(67, 'Queso Mozarella Rallado 250g', 'queso', 14000.00, 50, NULL, 1),
(68, 'Queso Doble Crema Tajado 250g', 'queso', 11000.00, 50, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_rol` int NOT NULL,
  `nombre_rol` enum('admin','cliente') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cliente',
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `descripcion`) VALUES
(1, 'admin', 'Administrador del sistema - Acceso total'),
(2, 'cliente', 'Cliente - Puede realizar compras');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contraseña` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_rol` int NOT NULL DEFAULT '2',
  `activo` tinyint(1) DEFAULT '1',
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `email`, `telefono`, `contraseña`, `id_rol`, `activo`, `fecha_registro`) VALUES
(1, 'yoiner', 'niño', 'yoineracosta902@gmai.com', '3138741772', '$2y$12$MMo/54fvpehgZuQuGucgf.1FXSf6N9fv83PpLRXmh1k1AfR6S4hm.', 2, 1, '2026-03-27 20:03:15'),
(2, 'cris', 'sayago', 'cris2@gmail.com', '6075834579', '$2y$12$22tFeaiZv6nhn3mSpiVUOuXWc3AOT7.BegThP413xLY.Do1AzIwPG', 1, 1, '2026-03-27 20:03:47');


-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int NOT NULL,
  `id_usuario` int NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `estado` enum('pendiente','completada','cancelada') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ventas`
--



-- --------------------------------------------------------

--
-- Table structure for table `ventas_detalle`
--

CREATE TABLE `ventas_detalle` (
  `id_detalle` int NOT NULL,
  `id_venta` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ventas_detalle`
--



-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_usuarios_roles`
-- (See below for the actual view)
--
CREATE TABLE `vw_usuarios_roles` (
`id_usuario` int
,`nombre` varchar(100)
,`apellido` varchar(100)
,`email` varchar(150)
,`nombre_rol` enum('admin','cliente')
,`rol_descripcion` varchar(100)
,`activo` tinyint(1)
,`fecha_registro` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_ventas_completas`
-- (See below for the actual view)
--
CREATE TABLE `vw_ventas_completas` (
`id_venta` int
,`id_usuario` int
,`fecha` timestamp
,`total` decimal(10,2)
,`estado` enum('pendiente','completada','cancelada')
,`nombre` varchar(100)
,`apellido` varchar(100)
,`total_items` bigint
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `uk_nombre_rol` (`nombre_rol`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `uk_email` (`email`),
  ADD KEY `fk_usuarios_roles` (`id_rol`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `fk_ventas_usuarios` (`id_usuario`);

--
-- Indexes for table `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `fk_detalle_ventas` (`id_venta`),
  ADD KEY `fk_detalle_productos` (`id_producto`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  MODIFY `id_detalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

-- --------------------------------------------------------

--
-- Structure for view `vw_usuarios_roles`
--
DROP TABLE IF EXISTS `vw_usuarios_roles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_usuarios_roles`  AS SELECT `u`.`id_usuario` AS `id_usuario`, `u`.`nombre` AS `nombre`, `u`.`apellido` AS `apellido`, `u`.`email` AS `email`, `r`.`nombre_rol` AS `nombre_rol`, `r`.`descripcion` AS `rol_descripcion`, `u`.`activo` AS `activo`, `u`.`fecha_registro` AS `fecha_registro` FROM (`usuarios` `u` join `roles` `r` on((`u`.`id_rol` = `r`.`id_rol`))) ;

-- --------------------------------------------------------

--
-- Structure for view `vw_ventas_completas`
--
DROP TABLE IF EXISTS `vw_ventas_completas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_ventas_completas`  AS SELECT `v`.`id_venta` AS `id_venta`, `v`.`id_usuario` AS `id_usuario`, `v`.`fecha` AS `fecha`, `v`.`total` AS `total`, `v`.`estado` AS `estado`, `u`.`nombre` AS `nombre`, `u`.`apellido` AS `apellido`, count(`vd`.`id_detalle`) AS `total_items` FROM ((`ventas` `v` join `usuarios` `u` on((`v`.`id_usuario` = `u`.`id_usuario`))) left join `ventas_detalle` `vd` on((`v`.`id_venta` = `vd`.`id_venta`))) GROUP BY `v`.`id_venta` ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_ventas_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  ADD CONSTRAINT `fk_detalle_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detalle_ventas` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
