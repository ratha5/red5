-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 26, 2014 at 03:11 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `midori`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `Product_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Price` int(30) NOT NULL,
  `Photo` varchar(500) NOT NULL,
  PRIMARY KEY (`Product_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Product_ID`, `Name`, `Description`, `Price`, `Photo`) VALUES
(3, 'Japanese Foods', 'Yummyliciuos ', 200, 'upload/1.jpg'),
(4, 'Fruitellas', 'All Fruits', 55, 'upload/por2.jpg'),
(5, 'Fruit Ice cream ', 'Fruits with Ice cream on top', 75, 'upload/pro1.jpg'),
(6, 'Sinamakan', 'Vinegar with Chilli', 40, 'upload/22.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE IF NOT EXISTS `tbl_admin` (
  `User_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Full_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`User_ID`, `Username`, `Password`, `Full_Name`) VALUES
(1, 'admin', 'admin', 'Jeff Ree Artagame'),
(2, 'jeff', 'jeff', 'AKO SI JEFF');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contacts`
--

CREATE TABLE IF NOT EXISTS `tbl_contacts` (
  `Name_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Message` varchar(500) NOT NULL,
  `Date_and_Time` varchar(100) NOT NULL,
  `Subject` varchar(100) NOT NULL,
  PRIMARY KEY (`Name_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_contacts`
--

INSERT INTO `tbl_contacts` (`Name_ID`, `Name`, `Email`, `Message`, `Date_and_Time`, `Subject`) VALUES
(1, 'Test', 'test@yahoo.com', 'This is a Test', '2014-09-24 02:04:50', 'Test');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_gallery`
--

CREATE TABLE IF NOT EXISTS `tbl_gallery` (
  `Photo_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Photo` varchar(500) NOT NULL,
  PRIMARY KEY (`Photo_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `tbl_gallery`
--

INSERT INTO `tbl_gallery` (`Photo_ID`, `Photo`) VALUES
(4, 'upload/Coffee.jpg'),
(5, 'upload/coffee2.JPG'),
(6, 'upload/coffee3.JPG'),
(7, 'upload/10.jpg'),
(8, 'upload/1.jpg'),
(9, 'upload/6.jpg'),
(10, 'upload/4.JPG'),
(11, 'upload/3.jpg'),
(12, 'upload/7.JPG'),
(13, 'upload/2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_info`
--

CREATE TABLE IF NOT EXISTS `tbl_info` (
  `Information_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `Content` varchar(500) NOT NULL,
  `Photo` varchar(500) NOT NULL,
  PRIMARY KEY (`Information_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `tbl_info`
--

INSERT INTO `tbl_info` (`Information_ID`, `Title`, `Content`, `Photo`) VALUES
(4, 'Planting', 'In Ikao-Ako, Im doing the planting of mangroves in coastal areas of Bohol Philippines and Nishinegurosu State. The planting of mangroves, in order to ensure the independence of the local population, we are together with residents local organizations always.', 'upload/plant.JPG'),
(5, 'B-E-A-U-T-F-U-L', 'An island nation consisting of more than 7,000 islands, the Philippines, has led to Japan as part of the Pacific Rim orogenic belt. Terrain is similar to Japan, Mountains ran north to south in the center of the island, the distance to the river mouth is short is often from a water source.\r\n\r\nSubtropical forests, tropical forests, and forests of the Philippines, is a forest that is classified as mangrove forests in brackish water. It is estimated by a complex terrain, biodiversity is high, the nu', 'upload/plant2.jpg'),
(6, 'New Products', 'We are excited to launch our new healthy wraps including Hawaiian, Californian, Yakisoba, Omelette and Adobo. Thank you to chef Ela for introducing us to this exciting menu option. Visit us to try one today!', 'upload/1.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
