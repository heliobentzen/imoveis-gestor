export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  role: 'corretor' | 'gestor';
  created_at?: string;
}

export interface Property {
  id: string;
  name: string;
  description?: string;
  location?: string;
  price_from?: number;
  price_to?: number;
  bedrooms?: string;
  area?: string;
  images?: string;
  features?: string;
  created_at?: string;
}

export interface PersonalizedLink {
  id: string;
  property_id: string;
  corretor_id: string;
  token: string;
  views: number;
  created_at?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  property_id: string;
  corretor_id: string;
  link_id?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  created_at?: string;
}

export interface PropertyWithImages extends Property {
  imageList: string[];
  featureList: string[];
}

export interface LinkWithDetails extends PersonalizedLink {
  property: Property;
  corretor: User;
}

export interface LeadWithDetails extends Lead {
  property: Property;
  corretor: User;
}
