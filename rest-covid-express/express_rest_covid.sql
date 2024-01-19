-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 20, 2023 at 01:22 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express_rest_covid`
--

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `status` enum('positive','recovered','dead','') NOT NULL,
  `in_date_at` date NOT NULL,
  `out_date_at` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `name`, `phone`, `address`, `status`, `in_date_at`, `out_date_at`, `createdAt`, `updatedAt`) VALUES
(15, 'Gigih', '08813781776', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:14:27', '2023-01-19 04:49:08'),
(17, 'dhodi', '08637126731', 'depok', 'dead', '2022-11-24', NULL, '2023-01-19 04:22:17', '2023-01-19 04:22:17'),
(18, 'aziz', '08637126731', 'depok', 'dead', '2022-11-24', NULL, '2023-01-19 04:24:18', '2023-01-19 04:24:18'),
(19, 'gigih', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:24:52', '2023-01-19 04:24:52'),
(20, 'gigih2', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:27:42', '2023-01-19 04:27:42'),
(21, 'gigih2', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:28:56', '2023-01-19 04:28:56'),
(22, 'gigih zhafrans', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:29:20', '2023-01-19 04:29:20'),
(23, 'gigih zhafrans2', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:29:25', '2023-01-19 04:29:25'),
(24, 'gigih zhafrans2', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:29:33', '2023-01-19 04:29:33'),
(25, 'gigih zhafrans 2', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:29:42', '2023-01-19 04:29:42'),
(26, 'gigih zhafrans 2113', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:29:49', '2023-01-19 04:29:49'),
(27, 'gigih zhafrans 2113', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:31:27', '2023-01-19 04:31:27'),
(28, 'gigih zhafrans 22', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:33:32', '2023-01-19 04:33:32'),
(29, 'gigih zhafrans', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:36:11', '2023-01-19 04:36:11'),
(30, 'gigih zhafrans mukti', '08637126731', 'depok', 'recovered', '2022-11-24', NULL, '2023-01-19 04:36:26', '2023-01-19 04:36:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
