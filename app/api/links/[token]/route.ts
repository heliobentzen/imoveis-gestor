import { NextResponse } from 'next/server';
import db, { initDatabase } from '@/lib/database';
import { PersonalizedLink, Property, User } from '@/lib/types';

initDatabase();

export async function GET(
  request: Request,
  context: { params: Promise<{ token: string }> }
) {
  const params = await context.params;
  try {
    const link = db.prepare('SELECT * FROM personalized_links WHERE token = ?').get(params.token) as PersonalizedLink;
    
    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    // Increment view count
    db.prepare('UPDATE personalized_links SET views = views + 1 WHERE token = ?').run(params.token);
    
    // Get property and corretor details
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(link.property_id) as Property;
    const corretor = db.prepare('SELECT * FROM users WHERE id = ?').get(link.corretor_id) as User;
    
    return NextResponse.json({
      link: { ...link, views: link.views + 1 },
      property,
      corretor
    });
  } catch (error) {
    console.error('Error fetching link:', error);
    return NextResponse.json({ error: 'Failed to fetch link' }, { status: 500 });
  }
}
