import { NextResponse } from 'next/server';
import db, { initDatabase } from '@/lib/database';
import { Property } from '@/lib/types';

initDatabase();

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  try {
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(params.id) as Property;
    
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}
