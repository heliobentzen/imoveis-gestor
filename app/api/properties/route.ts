import { NextResponse } from 'next/server';
import db, { initDatabase } from '@/lib/database';
import { Property } from '@/lib/types';

// Initialize database on first request
initDatabase();

export async function GET() {
  try {
    const properties = db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all() as Property[];
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}
