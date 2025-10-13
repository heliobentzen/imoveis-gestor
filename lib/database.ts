import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'imoveis.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initDatabase() {
  // Users table (corretores and gestores)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      photo TEXT,
      role TEXT NOT NULL CHECK(role IN ('corretor', 'gestor')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Properties table (empreendimentos)
  db.exec(`
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      location TEXT,
      price_from REAL,
      price_to REAL,
      bedrooms TEXT,
      area TEXT,
      images TEXT,
      features TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Personalized links table
  db.exec(`
    CREATE TABLE IF NOT EXISTS personalized_links (
      id TEXT PRIMARY KEY,
      property_id TEXT NOT NULL,
      corretor_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (property_id) REFERENCES properties(id),
      FOREIGN KEY (corretor_id) REFERENCES users(id)
    )
  `);

  // Leads table
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT,
      property_id TEXT NOT NULL,
      corretor_id TEXT NOT NULL,
      link_id TEXT,
      status TEXT DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (property_id) REFERENCES properties(id),
      FOREIGN KEY (corretor_id) REFERENCES users(id),
      FOREIGN KEY (link_id) REFERENCES personalized_links(id)
    )
  `);

  // Insert sample data
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  
  if (userCount.count === 0) {
    // Sample corretores
    db.prepare(`
      INSERT INTO users (id, name, email, phone, photo, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('corretor-1', 'João Silva', 'joao@example.com', '(11) 98765-4321', '/images/corretor-1.jpg', 'corretor');

    db.prepare(`
      INSERT INTO users (id, name, email, phone, photo, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('corretor-2', 'Maria Santos', 'maria@example.com', '(11) 98765-4322', '/images/corretor-2.jpg', 'corretor');

    // Sample gestor
    db.prepare(`
      INSERT INTO users (id, name, email, phone, photo, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('gestor-1', 'Carlos Oliveira', 'carlos@example.com', '(11) 98765-4323', '/images/gestor-1.jpg', 'gestor');

    // Sample properties
    db.prepare(`
      INSERT INTO properties (id, name, description, location, price_from, price_to, bedrooms, area, images, features)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'prop-1',
      'Residencial Vista Verde',
      'Empreendimento moderno com área de lazer completa, localizado em região nobre da cidade. Apartamentos de alto padrão com acabamento premium.',
      'Bairro Jardins, São Paulo - SP',
      450000,
      850000,
      '2 a 4 quartos',
      '65m² a 120m²',
      JSON.stringify(['/images/prop-1-1.jpg', '/images/prop-1-2.jpg', '/images/prop-1-3.jpg']),
      JSON.stringify(['Piscina', 'Academia', 'Salão de Festas', 'Playground', 'Churrasqueira', '2 Vagas de Garagem'])
    );

    db.prepare(`
      INSERT INTO properties (id, name, description, location, price_from, price_to, bedrooms, area, images, features)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'prop-2',
      'Condomínio Parque das Flores',
      'Casas em condomínio fechado com segurança 24h. Área verde preservada e infraestrutura completa para toda família.',
      'Alphaville, Barueri - SP',
      650000,
      1200000,
      '3 a 5 quartos',
      '150m² a 250m²',
      JSON.stringify(['/images/prop-2-1.jpg', '/images/prop-2-2.jpg', '/images/prop-2-3.jpg']),
      JSON.stringify(['Portaria 24h', 'Quadra Poliesportiva', 'Lago', 'Espaço Gourmet', 'Pet Place', '4 Vagas de Garagem'])
    );

    db.prepare(`
      INSERT INTO properties (id, name, description, location, price_from, price_to, bedrooms, area, images, features)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'prop-3',
      'Edifício Sky Tower',
      'Apartamentos de luxo com vista panorâmica. Localização privilegiada no coração financeiro da cidade.',
      'Avenida Paulista, São Paulo - SP',
      800000,
      2500000,
      '2 a 4 quartos',
      '80m² a 200m²',
      JSON.stringify(['/images/prop-3-1.jpg', '/images/prop-3-2.jpg', '/images/prop-3-3.jpg']),
      JSON.stringify(['Heliponto', 'Spa', 'Coworking', 'Adega Climatizada', 'Cinema', '3 Vagas de Garagem'])
    );
  }
}

export default db;
