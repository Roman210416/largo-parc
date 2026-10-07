CREATE DATABASE IF NOT EXISTS largo_event_park CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE largo_event_park;

CREATE TABLE IF NOT EXISTS pachete (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nume VARCHAR(100) NOT NULL,
  descriere TEXT NOT NULL,
  include_text TEXT NOT NULL COMMENT 'elemente separate prin |',
  ordine INT NOT NULL DEFAULT 0,
  activ TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rezervari (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nume VARCHAR(120) NOT NULL,
  telefon VARCHAR(30) NOT NULL,
  email VARCHAR(160) NULL,
  data_eveniment DATE NOT NULL,
  nr_invitati SMALLINT UNSIGNED NOT NULL,
  pachet_id INT UNSIGNED NULL,
  mesaj TEXT NULL,
  status ENUM('noua','contactat','confirmata','anulata') NOT NULL DEFAULT 'noua',
  creat_la TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_data (data_eveniment),
  CONSTRAINT fk_rez_pachet FOREIGN KEY (pachet_id) REFERENCES pachete(id) ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT INTO pachete (id, nume, descriere, include_text, ordine) VALUES
 (1,'Classic','Esențialul unei nunți reușite, într-un cadru elegant.','Sala de bal cu vitraliu|Meniu festiv complet|Aranjament standard al meselor|Coordonator de eveniment',1),
 (2,'Largo','Pachetul nostru cel mai ales: ceremonie pe terasă și petrecere în sală.','Tot ce include Classic|Ceremonie în aer liber pe terasă|Welcome drink și candy bar|Decor floral pentru arcadă',2),
 (3,'Signature','O nuntă gândită în întregime după povestea voastră.','Tot ce include Largo|Meniu personalizat cu bucătarul-șef|Decor și lumini la comandă|Întregul complex, în exclusivitate',3)
ON DUPLICATE KEY UPDATE nume=VALUES(nume), descriere=VALUES(descriere), include_text=VALUES(include_text), ordine=VALUES(ordine);
