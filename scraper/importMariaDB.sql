CREATE TABLE Weapon(
	`weapon-id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`bloat-damage` int(11) NOT NULL,
	`real-damage` int(11) NOT NULL,
	`element-damage` int(11),
	`element-type` varchar(255),
	`weapon_affinity` int(11),
	PRIMARY KEY (`weapon-id`),
	UNIQUE KEY (`name`)
)


LOAD DATA INFILE 'test.csv' INTO TABLE test
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
SET test_id=null
IGNORE 1 LINES;