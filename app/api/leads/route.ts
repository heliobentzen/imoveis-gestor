import { NextResponse } from 'next/server';
import db, { initDatabase } from '@/lib/database';
import { v4 as uuidv4 } from 'uuid';
import { Lead } from '@/lib/types';

initDatabase();

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, property_id, corretor_id, link_id } = await request.json();
    
    if (!name || !email || !phone || !property_id || !corretor_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const id = uuidv4();
    
    db.prepare(`
      INSERT INTO leads (id, name, email, phone, message, property_id, corretor_id, link_id, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `).run(id, name, email, phone, message || null, property_id, corretor_id, link_id || null);
    
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(id) as Lead;
    
    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const corretor_id = searchParams.get('corretor_id');
    
    let query = `
      SELECT 
        l.*,
        p.name as property_name,
        p.location as property_location,
        u.name as corretor_name
      FROM leads l
      JOIN properties p ON l.property_id = p.id
      JOIN users u ON l.corretor_id = u.id
    `;
    
    if (corretor_id) {
      query += ` WHERE l.corretor_id = '${corretor_id}'`;
    }
    
    query += ' ORDER BY l.created_at DESC';
    
    const leads = db.prepare(query).all();
    
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
