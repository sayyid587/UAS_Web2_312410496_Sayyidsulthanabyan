-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2026 at 03:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `kategori_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `nama_barang` varchar(100) NOT NULL,
  `stok` int(11) DEFAULT 0,
  `harga` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `kategori_id`, `supplier_id`, `nama_barang`, `stok`, `harga`) VALUES
(2, 1, 1, 'Laptop Asus', 18, 9000000.00),
(3, 1, 1, 'Keyboard Mechanical', 20, 650000.00),
(4, 2, 3, 'Buku Tulis A5', 75, 6000.00),
(5, 3, 4, 'Meja Kantor', 4, 3500000.00),
(6, 2, 3, 'Kertas HVS A4', 28, 65000.00),
(7, 2, 3, 'Pulpen Pilot', 69, 5000.00),
(8, 3, 4, 'Lemari Arsip', 5, 4300000.00),
(9, 3, 4, 'Kursi Kantor', 5, 1400000.00);

-- --------------------------------------------------------

--
-- Table structure for table `histori_barang`
--

CREATE TABLE `histori_barang` (
  `id` int(11) NOT NULL,
  `barang_id` int(11) NOT NULL,
  `jenis` enum('masuk','keluar') DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `tanggal` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `histori_barang`
--

INSERT INTO `histori_barang` (`id`, `barang_id`, `jenis`, `jumlah`, `tanggal`) VALUES
(3, 2, 'masuk', 3, '2026-06-12 16:38:54'),
(4, 2, 'keluar', 2, '2026-06-12 16:59:41'),
(5, 2, 'masuk', 1, '2026-06-12 17:00:14'),
(6, 2, 'keluar', 19, '2026-06-12 18:44:43'),
(7, 4, 'keluar', 12, '2026-06-13 07:27:57'),
(8, 9, 'keluar', 9, '2026-06-13 07:28:53'),
(9, 2, 'masuk', 15, '2026-06-13 07:29:28');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `nama_kategori`) VALUES
(1, 'Elektronik'),
(2, 'ATK'),
(3, 'Mebel');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `nama_supplier` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `telepon` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `nama_supplier`, `alamat`, `telepon`) VALUES
(1, 'PT Asus Indonesia', 'Jl. Sudirman No 10', '081234567893'),
(3, 'PT Sinar Dunia', 'Jl. Gatot Subroto No 5', '081345678901'),
(4, 'PT Maju Jaya', 'Jl. Jababeka No 28', '085828347919');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `token`, `created_at`) VALUES
(1, 'admin', '$2y$10$zQibkQjaOUVF5M.nE4cbDuFZuosrjKYYFUs6TyIvmxqcWn4xzAxWq', '08c6dde1ad941b2069db5ce3c9ab79245f29246ab99dbea0f5f00577f7ae2075', '2026-06-11 04:16:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_id` (`kategori_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `histori_barang`
--
ALTER TABLE `histori_barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barang_id` (`barang_id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `histori_barang`
--
ALTER TABLE `histori_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `barang_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `histori_barang`
--
ALTER TABLE `histori_barang`
  ADD CONSTRAINT `histori_barang_ibfk_1` FOREIGN KEY (`barang_id`) REFERENCES `barang` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
