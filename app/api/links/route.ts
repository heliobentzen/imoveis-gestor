import { NextResponse } from 'next/server';
import db, { initDatabase } from '@/lib/database';
import { v4 as uuidv4 } from 'uuid';
import { PersonalizedLink } from '@/lib/types';

initDatabase();

export async function POST(request: Request) {
  try {
    const { property_id, corretor_id } = await request.json();
    
    if (!property_id || !corretor_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const id = uuidv4();
    const token = uuidv4().substring(0, 8);
    
    db.prepare(`
      INSERT INTO personalized_links (id, property_id, corretor_id, token)
      VALUES (?, ?, ?, ?)
    `).run(id, property_id, corretor_id, token);
    
    const link = db.prepare('SELECT * FROM personalized_links WHERE id = ?').get(id) as PersonalizedLink;
    
    return NextResponse.json(link);
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const corretor_id = searchParams.get('corretor_id');
    
    let query = `
      SELECT 
        pl.*,
        p.name as property_name,
        p.location as property_location,
        u.name as corretor_name
      FROM personalized_links pl
      JOIN properties p ON pl.property_id = p.id
      JOIN users u ON pl.corretor_id = u.id
    `;
    
    if (corretor_id) {
      query += ` WHERE pl.corretor_id = '${corretor_id}'`;
    }
    
    query += ' ORDER BY pl.created_at DESC';
    
    const links = db.prepare(query).all();
    
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}
