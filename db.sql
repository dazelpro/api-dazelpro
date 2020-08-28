/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 8.0.13-4 : Database - OxpZQl17sX
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`OxpZQl17sX` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

/*Table structure for table `table_hero_ml` */

DROP TABLE IF EXISTS `table_hero_ml`;

CREATE TABLE `table_hero_ml` (
  `hero_id` int(11) NOT NULL AUTO_INCREMENT,
  `hero_name` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hero_role` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hero_avatar` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hero_specially` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hero_durability` int(11) DEFAULT NULL,
  `hero_offence` int(11) DEFAULT NULL,
  `hero_ability` int(11) DEFAULT NULL,
  `hero_difficulty` int(11) DEFAULT NULL,
  PRIMARY KEY (`hero_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `table_hero_ml` */

insert  into `table_hero_ml`(`hero_id`,`hero_name`,`hero_role`,`hero_avatar`,`hero_specially`,`hero_durability`,`hero_offence`,`hero_ability`,`hero_difficulty`) values 
(6,'Alucard','Fighter,Assassin','alucard.jpg','Charge,Crowd Control',45,87,50,45),
(7,'Bruno','Marksman','bruno.jpg','Reap',42,90,68,46),
(8,'Fanny','Assassin','fanny.jpg','Charge,Reap',60,85,50,100),
(9,'Lancelot','Assassin','lancelot.jpg','Charge,Burst Damage',50,96,40,68),
(10,'Claude','Marksman','claude.jpg','Reap,Burst',31,88,46,87),
(11,'Clint','Marksman','clint.jpg','Reap',42,86,86,45),
(12,'Ling','Assassin','ling.jpg','Reap,Burst Damage',0,0,0,0),
(13,'Granger','Marksman','granger.jpg','Reap,Burst Damage',0,0,0,0),
(14,'Hanabi','Marksman','hanabi.jpg','Regen,Burst Damage',50,90,52,65),
(15,'Gusion','Assassin','gusion.jpg','Charge,Burst',87,50,90,55),
(16,'Irithel','Marksman','irithel.jpg','Reap',42,80,44,66),
(17,'Karrie','Marksman','karrie.jpg','Reap,Burst Damage',31,88,46,87),
(18,'Lesley','Marksman,Assassin','lesley.jpg','Reap,Burst Damage',38,80,49,65),
(19,'Kimmy','Marksman,Mage','kimmy.jpg','Damage,Poke',0,0,0,0),
(20,'Hanzo','Assassin','hanzo.jpg','Reap,Burst',0,0,0,0),
(21,'Layla','Marksman','layla.jpg','Reap',18,95,62,25),
(22,'Mia','Marksman','mia.jpg','Reap',42,95,62,25),
(23,'Hayabusa','Assassin','hayabusa.jpg','Charge,Burst Damage',62,87,50,82),
(24,'Moskov','Marksman','moskov.jpg','Push,Burst Damage',25,95,42,72),
(25,'Helcurt','Assassin','helcurt.jpg','Charge,Burst Damage',62,87,50,82),
(26,'Roger','Marksman,Fighter','roger.jpg','Reap,Burst Damage',52,68,59,52),
(27,'Yi Sun-shin','Marksman','yi-sun-shin.jpg','Poke,Reap',46,79,75,60),
(28,'Karina','Mage,Assassin','karina.jpg','Charge,Reap',37,85,50,65),
(29,'Natalia','Assassin','natalia.jpg','Charge,Burst Damage',55,94,43,54),
(30,'Angela','Support','angela.jpg','Regen,Poke',49,36,85,32),
(31,'Lapu-Lapu','Assassin','lapu-lapu.jpg','Charge,Burst Damage',50,78,62,50),
(32,'Saber','Assassin','saber.jpg','Charge,Reap',62,87,50,62),
(33,'Selena','Mage,Assassin','selena.jpg','Reap,Burst',0,0,0,0),
(34,'Zilong','Fighter,Assassin','zilong.jpg','Initiator,Charge',70,80,40,50),
(35,'Aurora','Mage','aurora.jpg','Crowd Control,Burst Damage',40,45,90,60),
(36,'Akai','Tank','akai.jpg','Charge,Crowd Control',90,65,55,45),
(37,'Alice','Mage','alice.jpg','Regen,Charge',70,49,75,67),
(38,'Chang`e','Mage','change.jpg','Poke,Reap',42,40,92,70),
(39,'Estes','Support','estes.jpg','Regen,Cost',47,50,68,45),
(40,'Cyclops','Mage','cyclops.jpg','Damage,Cost',40,45,90,60),
(41,'Eudora','Mage','eudora.jpg','Damage,Reap',43,50,90,40),
(42,'Esmeralda','Tank,Mage','esmeralda.jpg','Charge,Burst Damage',0,0,0,0),
(43,'Balmond','Tank','balmond.jpg','Charge,Crowd Control',80,68,40,30),
(44,'Gord','Mage','gord.jpg','Damage,Poke',45,50,90,65),
(45,'Guinevere','Mage,Fighter','guinevere.jpg','Charge,Burst Damage',0,0,0,0),
(46,'Harith','Mage','harith.jpg','Charge,Burst Damage',0,0,0,0),
(47,'Harley','Mage','harley.jpg','Damage,Poke',40,65,75,55),
(48,'Belerick','Tank','belerick.jpg','Regen,Poke',85,64,62,45),
(49,'Kadita','Mage','kadita.jpg','Charge,Burst',0,0,0,0),
(50,'Kagura','Mage','kagura.jpg','Damage,Reap',60,43,92,88),
(51,'Baxia','Tank','baxia.jpg','Initiator,Crowd Control',0,0,0,0),
(52,'Lunox','Mage','lunox.jpg','Damage,Poke',66,40,78,65),
(53,'Lylia','Mage','lylia.jpg','Push,Poke',0,0,0,0),
(54,'Franco','Tank','franco.jpg','Initiator',80,60,50,60),
(55,'Aldous','Fighter','aldous.jpg','Push,Burst',82,64,68,42),
(56,'Nana','Mage,Support','nana.jpg','Crowd Control,Reap',50,50,40,0),
(57,'Odette','Mage','odette,jpg','Poke,Burst Damage',62,42,92,62),
(58,'Pharsa','Mage','pharsa.jpg','Damage,Poke',62,42,92,62),
(59,'Gatot kaca','Tank,Fighter','gatot-kaca.jpg','Initiator,Crowd Control',92,49,70,70),
(60,'Vale','Mage','vale.jpg','Poke,Burst',0,0,0,0),
(61,'Valir','Mage','valir.jpg','Poke,Burst',46,40,88,65),
(62,'Vexana','Mage','vexana.jpg','Crowd Control,Poke',40,54,65,66),
(63,'Grock','Tank','grock.jpg','Initiator,Charge',81,54,60,45),
(64,'Zhask','Mage','zhask.jpg','Push,Poke',40,43,92,66),
(65,'Hilda','Tank,Fighter','hilda.jpg','Regen,Damage',85,58,52,40),
(66,'Alpha','Fighter','alpha.jpg','Charge,Damage',72,78,64,73),
(67,'Argus','Fighter','argus.jpg','Charge,Burst Damage',46,85,72,46),
(68,'Hylos','Tank','hylos.jpg','Regen,Damage',90,34,62,25),
(69,'Badang','Fighter','badang.jpg','Reap,Burst',0,0,0,0),
(70,'Bane','Fighter','bane.jpg','Push',70,65,48,55),
(71,'Chou','Fighter','chou.jpg','Charge,Burst Damage',78,82,52,64),
(72,'Dyrroth','Fighter','dyrroth.jpg','Charge,Burst Damage',0,0,0,0),
(73,'Freya','Fighter','freya.jpg','Charge,Burst Damage',70,80,37,40),
(74,'Jawhead','Fighter','jawhead.jpg','Charge,Burst Damage',82,78,64,77),
(75,'Leomord','Fighter','leomord.jpg','Push,Burst Damage',0,0,0,0),
(76,'Martis','Fighter','martis.jpg','Reap,Burst Damage',68,82,59,56),
(77,'Minsitthar','Fighter','minsitthar.jpg','Initiator,Crowd Control',65,70,50,35),
(78,'Ruby','Fighter','ruby.jpg','Crowd Control',78,45,65,70),
(79,'Sun','Fighter','sun.jpg','Push,Charge',78,45,65,70),
(80,'Terizla','Fighter','terizla.jpg','Damage,Burst Damage',0,0,0,0),
(81,'Thamuz','Fighter','thamuz.jpg','Reap,Burst',68,82,59,56),
(82,'X.Borg','Fighter','x-borg.jpg','Regen,Burst Damage',0,0,0,0),
(83,'Johnson','Tank','johnson.jpg','Initiator,Crowd Control',92,39,60,50),
(84,'Kaja','Fighter,Support','kaja.jpg','Initiator,Charge',75,49,80,56),
(85,'Rafaela','Support','rafaela.jpg','Regen',52,50,70,34),
(86,'Diggie','Support','diggie.jpg','Crowd Control,Cost',59,46,75,28),
(87,'Faramis','Support','faramis.jpg','Initiator,Crowd Control',0,0,0,0),
(88,'Lolita','Tank,Support','lolita.jpg','Push,Crowd Control',83,52,75,83),
(89,'Minotaur','Tank,Support','minotaur.jpg','Crowd Control',90,64,53,30),
(90,'Kufra','Tank','kufra.jpg','Initiator,Crowd Control',0,0,0,0),
(91,'Tigreal','Tank','tigreal.jpg','Initiator,Crowd Control',90,34,62,25),
(92,'Uranus','Tank','uranus','Regen,Poke',85,34,82,45);

/*Table structure for table `table_role_hero_ml` */

DROP TABLE IF EXISTS `table_role_hero_ml`;

CREATE TABLE `table_role_hero_ml` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `table_role_hero_ml` */

insert  into `table_role_hero_ml`(`role_id`,`role_name`) values 
(1,'Marksman'),
(2,'Tank'),
(3,'Mage'),
(4,'Fighter'),
(5,'Assassin'),
(6,'Support');

/*Table structure for table `table_specially_hero_ml` */

DROP TABLE IF EXISTS `table_specially_hero_ml`;

CREATE TABLE `table_specially_hero_ml` (
  `specially_id` int(11) NOT NULL AUTO_INCREMENT,
  `specially_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`specially_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `table_specially_hero_ml` */

insert  into `table_specially_hero_ml`(`specially_id`,`specially_name`) values 
(1,'Initiator'),
(2,'Push'),
(3,'Regen'),
(4,'Charge'),
(5,'Damage'),
(6,'Crowd Control'),
(7,'Poke'),
(8,'Reap'),
(9,'Burst Damage'),
(10,'Burst'),
(11,'Cost');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
