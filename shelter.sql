-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 14. Jun 2023 um 18:36
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.0.28

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
  `typeID` int(4) DEFAULT NULL,
  `breedID` int(4) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `gender` int(1) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `acquiryDate` date NOT NULL,
  `ownerID` int(3) NOT NULL,
  `roomID` int(3) NOT NULL,
  `food` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `animal`
--

INSERT INTO `animal` (`ID`, `shelter_email`, `name`, `note`, `typeID`, `breedID`, `image`, `gender`, `birthdate`, `acquiryDate`, `ownerID`, `roomID`, `food`) VALUES
(76, 'yanik@kendler.me', 'ANIMAL', 'sdfsadf dsafd asf', 2, 14, './uploads/animalimage-76.jpg', 0, '2015-07-01', '2023-06-11', 0, 0, 'sdafdsaf s'),
(77, 'yanik@kendler.me', 'ANIMAL', '&nbsp;asdf asdf sadf dsafdsafdsaf s', 1, 0, './uploads/animalimage-77.jpg', 0, '0000-00-00', '2023-06-11', 0, 0, 'sad fs sdf asdf sdfasd f hgkghjk hjkghjk sdfa sf sadfads fasdf asdf asdf asf asd fas fa sfd asf '),
(78, 'yanik@kendler.me', 'ANIMAL', '', 1, 0, '', 0, '0000-00-00', '2023-06-13', 0, 0, ''),
(79, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-06-13', 0, 0, NULL),
(80, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-06-13', 0, 0, NULL),
(81, 'yanik@kendler.me', 'animal', NULL, 1, 0, NULL, 0, NULL, '2023-06-14', 0, 0, NULL),
(83, 'test@test.com', 'GUSTAF', 'läuft gern rad', 6, 23, './uploads/animalimage-83.jpg', 1, '2021-06-14', '2023-06-14', 9, 11, 'karroten moregens sidn cool'),
(84, 'test@test.com', 'MANFRED', '', 4, 21, '', 0, '0000-00-00', '2023-06-14', 0, 0, ''),
(85, 'test@test.com', 'JOE', '', 6, 22, '', 0, '0000-00-00', '2023-06-14', 0, 0, ''),
(86, 'test@test.com', 'BOB', '', 4, 0, '', 0, '0000-00-00', '2023-06-14', 0, 0, ''),
(87, 'test@test.com', 'PETER', '', 6, 23, '', 0, '0000-00-00', '2023-06-14', 0, 0, ''),
(89, 'test@test.com', 'animal', NULL, 0, 0, NULL, 0, NULL, '2023-06-14', 0, 11, NULL),
(90, 'test@test.com', 'animal', NULL, 0, 0, NULL, 0, NULL, '2023-06-14', 0, 0, NULL),
(91, 'test@test.com', 'animal', NULL, 0, 0, NULL, 0, NULL, '2023-06-14', 0, 0, NULL),
(92, 'test@test.com', 'animal', NULL, 0, 0, NULL, 0, NULL, '2023-06-14', 0, 0, NULL),
(93, 'test@test.com', 'animal', NULL, 0, 0, NULL, 0, NULL, '2023-06-14', 0, 0, NULL),
(94, 'test@test.com', 'animal', NULL, 0, 0, NULL, 0, NULL, '2023-06-14', 0, 0, NULL),
(95, 'test@test.com', 'animal', NULL, 0, 0, NULL, 0, NULL, '2023-06-14', 0, 0, NULL),
(96, 'test@test.com', 'animal', NULL, 0, 0, NULL, 0, NULL, '2023-06-14', 0, 0, NULL),
(97, 'test@test.com', 'animal', NULL, 0, 0, NULL, 0, NULL, '2023-06-14', 0, 0, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `animal_breed`
--

CREATE TABLE `animal_breed` (
  `ID` int(4) NOT NULL,
  `shelter_email` varchar(100) NOT NULL,
  `animal_type_ID` int(4) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(18, 'yanik@kendler.me', 3, 'adler'),
(19, 'test@test.com', 5, 'asdfasf'),
(20, 'test@test.com', 5, 'gdfg'),
(21, 'test@test.com', 4, 'dalamtiner'),
(22, 'test@test.com', 6, 'dickes'),
(23, 'test@test.com', 6, 'dünnes');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `animal_type`
--

CREATE TABLE `animal_type` (
  `ID` int(4) NOT NULL,
  `shelter_email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `animal_type`
--

INSERT INTO `animal_type` (`ID`, `shelter_email`, `name`) VALUES
(1, 'yanik@kendler.me', 'hund'),
(2, 'yanik@kendler.me', 'hamster'),
(3, 'yanik@kendler.me', 'vogel'),
(4, 'test@test.com', 'hund'),
(5, 'test@test.com', 'fgdsgsd'),
(6, 'test@test.com', 'meerschwienchen');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `owner`
--

CREATE TABLE `owner` (
  `ID` int(4) NOT NULL,
  `shelter_email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `owner`
--

INSERT INTO `owner` (`ID`, `shelter_email`, `name`) VALUES
(1, 'yanik@kendler.com', 'motty'),
(2, 'yanik@kendler.me', 'felix'),
(3, 'yanik@kendler.me', 'leon'),
(4, 'yanik@kendler.me', 'hugo'),
(9, 'test@test.com', 'asdfasdf'),
(10, 'test@test.com', 'fdfsdaasdf');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `room`
--

CREATE TABLE `room` (
  `ID` int(4) NOT NULL,
  `shelter_email` varchar(100) NOT NULL,
  `size` int(2) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `room`
--

INSERT INTO `room` (`ID`, `shelter_email`, `size`, `name`) VALUES
(1, 'yanik@kendler.com', 23, 'cool'),
(2, 'yanik@kendler.me', 5, 'holzhütte'),
(3, 'yanik@kendler.me', 5, 'hundehaus'),
(4, 'yanik@kendler.me', 5, 'käfig 1'),
(5, 'yanik@kendler.me', 2, 'käfig 2'),
(7, 'test@test.com', 0, 'asdf'),
(8, 'test@test.com', 0, 'hallolo'),
(9, 'test@test.com', 0, 'heyyyy'),
(10, 'test@test.com', 0, 'dsafdsaffs'),
(11, 'test@test.com', 0, 'asdf'),
(12, 'test@test.com', 0, 'sdfad'),
(13, 'test@test.com', 0, 'maaaa'),
(14, 'test@test.com', 0, 'ahh'),
(15, 'test@test.com', 0, 'hey');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`email`, `name`, `password`, `admin_password`) VALUES
('test@test.com', 'test', '$2y$10$nptbrNMmF.3z94FSu7yS0eVCX57AQTbw.FtRV37IvMLE2Q2tmWdbS', '$2y$10$0UIqP920tNcPjun9z0h69.OXQxE3ZUUOEOG74sIozknmbocqjSCCu'),
('yanik@kendler.com', 'yaniks-haus', '$2y$10$VXSwhiy9PSmSoKEWt7uqceO7mykQCcMUssdsb/7Bdu.GK12bHQl.e', '$2y$10$9FPLeuVHkS.c/TQPH6Uv3O05LN6/kUKq2AXuWRvYxJD9Y3GSLnhSu'),
('yanik@kendler.me', 'animal haven linz', '$2y$10$B2HbE1Wm67Iks8pp1waVpODkKwFWSiDWySaFOy/fxEQMAK.d1agHi', 'Hallo123');

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
-- Indizes für die Tabelle `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `room`
--
ALTER TABLE `room`
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
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT für Tabelle `animal_breed`
--
ALTER TABLE `animal_breed`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT für Tabelle `animal_type`
--
ALTER TABLE `animal_type`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `owner`
--
ALTER TABLE `owner`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `room`
--
ALTER TABLE `room`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
