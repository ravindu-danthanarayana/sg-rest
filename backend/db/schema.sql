-- Sungreen Habarana Restaurant Database Schema
CREATE DATABASE IF NOT EXISTS sungreen
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sungreen;

CREATE TABLE IF NOT EXISTS menu_items (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150) NOT NULL,
  description   TEXT,
  price         DECIMAL(10,2) NOT NULL,
  category      ENUM('Breakfast','Lunch','Dinner','Desserts','Beverages') NOT NULL,
  image_url     VARCHAR(500),
  available     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  customer_name     VARCHAR(100) NOT NULL,
  email             VARCHAR(255) NOT NULL,
  phone             VARCHAR(30)  NOT NULL,
  reservation_date  DATE NOT NULL,
  reservation_time  TIME NOT NULL,
  guests            INT NOT NULL,
  special_request   TEXT,
  status            ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
('Tropical Sunrise Bowl', 'Coconut yogurt, papaya, mango, toasted cashews & forest honey.', 1800, 'Breakfast', '/images/dish-3.jpg'),
('Habarana Egg Hoppers', 'Crisp coconut milk hoppers with farm egg, lunu miris & seeni sambol.', 1600, 'Breakfast', '/images/dish-1.jpg'),
('Jungle Rice & Curry', 'Seven-curry tasting plate with red rice, papadam and coconut sambol.', 3200, 'Lunch', '/images/dish-1.jpg'),
('Grilled Lagoon Prawns', 'Tamarind glaze, charred lime, fragrant pandan rice.', 4400, 'Lunch', '/images/dish-2.jpg'),
('Cinnamon Smoked Pork Belly', 'Ceylon cinnamon glaze, kithul molasses, charred greens.', 4800, 'Dinner', '/images/dish-2.jpg'),
('Catch of the Day', 'Pan seared seer fish, coconut velouté, seasonal jungle greens.', 5200, 'Dinner', '/images/dish-2.jpg'),
('Watalappan', 'Steamed jaggery & coconut custard, toasted cashew lace.', 1400, 'Desserts', '/images/dish-3.jpg'),
('King Coconut Sorbet', 'Habarana king coconut, lime zest, edible flower.', 1200, 'Desserts', '/images/dish-3.jpg'),
('Ceylon High Tea', 'Single-estate black tea poured tableside.', 700, 'Beverages', '/images/dish-3.jpg'),
('King Coconut Fresh', 'Chilled, straight from the husk.', 600, 'Beverages', '/images/dish-3.jpg');

-- Default admin: username = admin, password = admin123 (bcrypt hash)
INSERT INTO admins (username, password_hash) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
