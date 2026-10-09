-- ICON-NUST application schema (MySQL 8.0+).
-- Select the target database before importing this file. The application's
-- `npm run db:schema` command selects DB_NAME and creates it if necessary.
-- This file creates all application tables without deleting existing data.
-- CREATE TABLE IF NOT EXISTS does not upgrade existing tables; legacy column
-- migrations and initial FAQ/portfolio data are handled by apply-schema.mjs.
-- For existing production databases use `npm run db:migrate:production` to
-- preview upgrades, then append `-- --apply` to execute the reviewed changes.
-- Content and admin accounts are populated separately by the seed scripts.
-- JSON columns contain arrays: news.content is paragraphs; team_members.focus
-- is focus areas. Display dates stay strings to match the application models.

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Innovation portfolio: parent tables must precede the association table.

CREATE TABLE IF NOT EXISTS innovation_sectors (
  slug VARCHAR(120) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  icon_key VARCHAR(30) NOT NULL DEFAULT 'settings',
  hero_image VARCHAR(500) NOT NULL,
  ip_assets VARCHAR(100) NULL,
  industry_partners INT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_innovation_sectors_order (sort_order, title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS innovation_projects (
  id VARCHAR(120) PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  type ENUM('project', 'spin-off') NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL DEFAULT '',
  status VARCHAR(500) NOT NULL DEFAULT '',
  highlight VARCHAR(300) NOT NULL DEFAULT '',
  category VARCHAR(300) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_innovation_projects_order (sort_order, title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS innovation_project_sectors (
  project_id VARCHAR(120) NOT NULL,
  sector_slug VARCHAR(120) NOT NULL,
  PRIMARY KEY (project_id, sector_slug),
  KEY idx_project_sectors_sector (sector_slug, project_id),
  CONSTRAINT fk_project_sectors_project
    FOREIGN KEY (project_id) REFERENCES innovation_projects(id) ON DELETE CASCADE,
  CONSTRAINT fk_project_sectors_sector
    FOREIGN KEY (sector_slug) REFERENCES innovation_sectors(slug) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Authentication and schema bookkeeping.
CREATE TABLE IF NOT EXISTS ip_portfolio_records (
  id CHAR(36) PRIMARY KEY,
  ip_title VARCHAR(500) NOT NULL,
  ip_type ENUM('Utility Patent', 'Copyright', 'Industrial Design') NOT NULL,
  sector VARCHAR(200) NOT NULL DEFAULT 'Unknown',
  description TEXT NOT NULL,
  application_no VARCHAR(200) NULL,
  award_date DATE NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_ip_portfolio_status_type (status, ip_type),
  KEY idx_ip_portfolio_sector (sector)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(200) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(150) NOT NULL DEFAULT 'Admin',
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  otp_code_hash VARCHAR(255) NULL,
  otp_expires_at DATETIME NULL,
  otp_attempts INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_admins_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS schema_migrations (
  migration_key VARCHAR(190) PRIMARY KEY,
  applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Page content and form submissions.
CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page ENUM('innovation-collaboration', 'industry-services', 'commercialization') NOT NULL,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_faqs_page_order (page, sort_order, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS invention_disclosures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source ENUM('idf-modal', 'quick-form') NOT NULL,
  invention_title VARCHAR(300) NOT NULL,
  domain VARCHAR(200) NOT NULL DEFAULT '',
  inventor_names VARCHAR(300) NOT NULL DEFAULT '',
  department VARCHAR(200) NOT NULL DEFAULT '',
  student_or_employee_id VARCHAR(100) NOT NULL DEFAULT '',
  contact_email VARCHAR(200) NOT NULL,
  contact_phone VARCHAR(50) NOT NULL DEFAULT '',
  conception_date VARCHAR(50) NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  novelty TEXT NULL,
  applications TEXT NULL,
  funding_source VARCHAR(300) NOT NULL DEFAULT '',
  prior_disclosure ENUM('yes', 'no') NOT NULL DEFAULT 'no',
  prior_disclosure_details TEXT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  display_status VARCHAR(100) NOT NULL DEFAULT '',
  trl VARCHAR(20) NOT NULL DEFAULT '',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_disclosures_status_created (status, created_at DESC),
  KEY idx_disclosures_status_updated (status, updated_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS home_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organization VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL DEFAULT '',
  industry VARCHAR(200) NOT NULL DEFAULT '',
  phone_number VARCHAR(50) NOT NULL DEFAULT '',
  email VARCHAR(200) NOT NULL,
  province VARCHAR(200) NOT NULL DEFAULT '',
  address VARCHAR(300) NOT NULL DEFAULT '',
  brief_about_company TEXT NULL,
  domain VARCHAR(200) NOT NULL DEFAULT '',
  message TEXT NULL,
  status ENUM('new', 'read') NOT NULL DEFAULT 'new',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_home_inquiries_status_created (status, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS industry_service_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organization VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL DEFAULT '',
  industry VARCHAR(200) NOT NULL DEFAULT '',
  phone_number VARCHAR(50) NOT NULL DEFAULT '',
  email VARCHAR(200) NOT NULL,
  province VARCHAR(200) NOT NULL DEFAULT '',
  address VARCHAR(300) NOT NULL DEFAULT '',
  brief_about_company TEXT NULL,
  domain VARCHAR(200) NOT NULL DEFAULT '',
  message TEXT NULL,
  status ENUM('new', 'read') NOT NULL DEFAULT 'new',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_industry_service_inquiries_status_created (status, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS innovation_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organization VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL DEFAULT '',
  industry VARCHAR(200) NOT NULL DEFAULT '',
  phone_number VARCHAR(50) NOT NULL DEFAULT '',
  email VARCHAR(200) NOT NULL,
  province VARCHAR(200) NOT NULL DEFAULT '',
  address VARCHAR(300) NOT NULL DEFAULT '',
  brief_about_company TEXT NULL,
  domain VARCHAR(200) NOT NULL DEFAULT '',
  message TEXT NULL,
  status ENUM('new', 'read') NOT NULL DEFAULT 'new',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_innovation_inquiries_status_created (status, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  title VARCHAR(200) NOT NULL,
  dept VARCHAR(200) NOT NULL,
  bio TEXT NOT NULL,
  focus JSON NOT NULL,
  image VARCHAR(500) NOT NULL,
  email VARCHAR(200) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_team_members_order (sort_order, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  tag VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  founder VARCHAR(200) NOT NULL,
  funding VARCHAR(100) NOT NULL,
  image VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_stories_status_order (status, sort_order, created_at DESC),
  KEY idx_stories_order (sort_order, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  day VARCHAR(10) NOT NULL,
  month VARCHAR(20) NOT NULL,
  year VARCHAR(10) NOT NULL,
  title VARCHAR(300) NOT NULL,
  type VARCHAR(100) NOT NULL,
  location VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  registered INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_events_status_order (status, sort_order, created_at DESC),
  KEY idx_events_order (sort_order, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscriber (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(300) NOT NULL DEFAULT '',
  email VARCHAR(300) NOT NULL,
  notify_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_subscriber_email (email),
  KEY idx_subscriber_notify_created (notify_enabled, created_at DESC),
  KEY idx_subscriber_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Statistics and charts managed through the admin dashboard.
CREATE TABLE IF NOT EXISTS stat_tiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page ENUM('home', 'innovation') NOT NULL,
  label VARCHAR(200) NOT NULL,
  value INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_stat_tiles_page_order (page, sort_order, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ip_breakdown (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  value INT NOT NULL DEFAULT 0,
  color VARCHAR(20) NOT NULL DEFAULT '#3B82C4',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_ip_breakdown_order (sort_order, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ip_yearly_stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chart_type ENUM('filed', 'awarded') NOT NULL,
  year VARCHAR(10) NOT NULL,
  industrial_design INT NOT NULL DEFAULT 0,
  copyright INT NOT NULL DEFAULT 0,
  patents INT NOT NULL DEFAULT 0,
  trademark INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_ip_yearly_chart_order (chart_type, sort_order, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS financial_stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year VARCHAR(30) NOT NULL,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  is_total BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_financial_stats_order (sort_order, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tech_place_stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  value INT NOT NULL DEFAULT 0,
  subtitle VARCHAR(500) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_tech_place_stats_order (sort_order, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- News publishing and industry partners.
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL,
  category VARCHAR(150) NOT NULL,
  excerpt TEXT NOT NULL,
  content JSON NOT NULL,
  image VARCHAR(500) NOT NULL,
  date VARCHAR(50) NOT NULL,
  read_time VARCHAR(20) NOT NULL DEFAULT '3 min',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_news_slug (slug),
  KEY idx_news_status_order (status, sort_order, created_at DESC, id DESC),
  KEY idx_news_order (sort_order, created_at DESC, id DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS partners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  logo VARCHAR(500) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_partners_order (sort_order, created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
