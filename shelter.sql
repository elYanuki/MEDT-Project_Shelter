-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 14. Apr 2023 um 18:27
-- Server-Version: 10.4.25-MariaDB
-- PHP-Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `shelter`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `animal`
--

CREATE TABLE `animal` (
  `ID` int(4) NOT NULL,
  `shelter_email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `note` varchar(300) DEFAULT NULL,
  `typeID` int(4) NOT NULL,
  `breedID` int(4) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `gender` int(1) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `acquiryDate` date NOT NULL,
  `ownerID` int(3) NOT NULL,
  `roomID` int(3) NOT NULL,
  `foodType` varchar(50) DEFAULT NULL,
  `foodTime` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `animal`
--

INSERT INTO `animal` (`ID`, `shelter_email`, `name`, `note`, `typeID`, `breedID`, `image`, `gender`, `birthdate`, `acquiryDate`, `ownerID`, `roomID`, `foodType`, `foodTime`) VALUES
(42, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(43, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(44, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(45, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(46, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(47, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(48, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(49, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(50, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(51, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-13', 0, 1, NULL, NULL),
(52, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-14', 0, 1, NULL, NULL),
(53, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-14', 0, 1, NULL, NULL),
(54, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-14', 0, 1, NULL, NULL),
(55, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-14', 0, 1, NULL, NULL),
(56, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-14', 0, 1, NULL, NULL),
(57, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-14', 0, 1, NULL, NULL),
(58, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-14', 0, 1, NULL, NULL),
(59, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-04-14', 0, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `animal_breed`
--

CREATE TABLE `animal_breed` (
  `ID` int(4) NOT NULL,
  `shelter_email` varchar(100) NOT NULL,
  `animal_type_ID` int(4) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `animal_breed`
--

INSERT INTO `animal_breed` (`ID`, `shelter_email`, `animal_type_ID`, `name`) VALUES
(11, 'yanik@kendler.me', 1, 'pudel'),
(12, 'yanik@kendler.me', 1, 'german shepard'),
(13, 'yanik@kendler.me', 1, 'bulldog'),
(14, 'yanik@kendler.me', 2, 'dicker hamster'),
(15, 'yanik@kendler.me', 2, 'zwerg hamster'),
(16, 'yanik@kendler.me', 3, 'rabe'),
(17, 'yanik@kendler.me', 3, 'papagei'),
(18, 'yanik@kendler.me', 3, 'adler');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `animal_type`
--

CREATE TABLE `animal_type` (
  `ID` int(4) NOT NULL,
  `shelter_email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `animal_type`
--

INSERT INTO `animal_type` (`ID`, `shelter_email`, `name`) VALUES
(1, 'yanik@kendler.me', 'hund'),
(2, 'yanik@kendler.me', 'hamster'),
(3, 'yanik@kendler.me', 'vogel');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `owner`
--

CREATE TABLE `owner` (
  `ID` int(4) NOT NULL,
  `shelter_email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `adress` varchar(50) NOT NULL,
  `tel` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `note` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `owner`
--

INSERT INTO `owner` (`ID`, `shelter_email`, `name`, `adress`, `tel`, `email`, `note`) VALUES
(1, 'yanik@kendler.com', 'motty', 'iwo in talheim', '04353453', 'motty@msf.sadf', 'whats poppin');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `room`
--

CREATE TABLE `room` (
  `ID` int(4) NOT NULL,
  `shelter_email` varchar(100) NOT NULL,
  `size` int(2) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `room`
--

INSERT INTO `room` (`ID`, `shelter_email`, `size`, `name`) VALUES
(1, 'yanik@kendler.com', 23, 'cool');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`email`, `name`, `password`, `admin_password`) VALUES
('yanik@kendler.me', 'haus', '$2y$10$B2HbE1Wm67Iks8pp1waVpODkKwFWSiDWySaFOy/fxEQMAK.d1agHi', 'Hallo123');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `animal_breed`
--
ALTER TABLE `animal_breed`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `animal_type`
--
ALTER TABLE `animal_type`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `animal`
--
ALTER TABLE `animal`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT für Tabelle `animal_breed`
--
ALTER TABLE `animal_breed`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT für Tabelle `animal_type`
--
ALTER TABLE `animal_type`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
