-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 02, 2025 at 02:09 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node`
--

-- --------------------------------------------------------

--
-- Dumping data for table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `description`, `prix`, `stock`, `categorieId`, `createdAt`, `updatedAt`) VALUES
(1, 'Aspirateur', 'Aspirateur DYSON Dernier cri', 150, 1000, 1, '2025-04-02 13:05:16', '2025-04-02 13:05:16'),
(2, 'Seche-cheveux', 'Seche-cheveux DYSON Dernier cri', 500, 1000, 1, '2025-04-02 13:05:44', '2025-04-02 13:05:44'),
(3, 'Croquette', 'Miam miam', 500, 1000, 2, '2025-04-02 13:07:11', '2025-04-02 13:07:11'),
(4, 'Croquette 2', 'Miam miam', 500, 0, 2, '2025-04-02 13:07:16', '2025-04-02 13:07:16'),
(5, 'test3', 'test3', 10, 10, 1, '2025-04-02 13:24:10', '2025-04-02 13:24:10'),
(6, 'test4', 'test4', 30, 2, 1, '2025-04-02 13:24:10', '2025-04-02 13:24:10'),
(7, 'test5', 'test5', 500, 23, 1, '2025-04-02 13:25:16', '2025-04-02 13:25:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categorieId` (`categorieId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`categorieId`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
