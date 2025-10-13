'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface Property {
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
}

interface Corretor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function PropertyLandingPage() {
  const params = useParams();
  const token = params.token as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [corretor, setCorretor] = useState<Corretor | null>(null);
  const [linkId, setLinkId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    fetchLinkData();
  }, [token]);

  const fetchLinkData = async () => {
    try {
      const response = await fetch(`/api/links/${token}`);
      if (!response.ok) throw new Error('Link not found');
      
      const data = await response.json();
      setProperty(data.property);
      setCorretor(data.corretor);
      setLinkId(data.link.id);
    } catch (error) {
      console.error('Error fetching link:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          property_id: property?.id,
          corretor_id: corretor?.id,
          link_id: linkId
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const shareWhatsApp = () => {
    if (!corretor || !property) return;
    const message = encodeURIComponent(
      `Olá, ${corretor.name}! Vi o ${property.name} e tenho interesse em saber mais.`
    );
    const phone = corretor.phone?.replace(/\D/g, '');
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">🏠</div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!property || !corretor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Link não encontrado</h1>
          <p className="text-gray-600">Este link pode ter expirado ou não existe.</p>
        </div>
      </div>
    );
  }

  const images = property.images ? JSON.parse(property.images) : [];
  const features = property.features ? JSON.parse(property.features) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Property Image */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{property.name}</h1>
            <p className="text-xl mb-2 text-blue-100">📍 {property.location}</p>
            {property.price_from && property.price_to && (
              <p className="text-2xl font-bold">
                {formatPrice(property.price_from)} a {formatPrice(property.price_to)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Gallery Placeholder */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-3 gap-4">
                  {images.length > 0 ? (
                    images.map((img: string, idx: number) => (
                      <div key={idx} className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">🏠</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center col-span-3">
                        <span className="text-6xl">🏢</span>
                      </div>
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">🌳</span>
                      </div>
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">🏊</span>
                      </div>
                      <div className="aspect-video bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">🎾</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Sobre o Empreendimento</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{property.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {property.bedrooms && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🛏️</span>
                      <div>
                        <p className="text-sm text-gray-600">Quartos</p>
                        <p className="font-semibold text-gray-900">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📏</span>
                      <div>
                        <p className="text-sm text-gray-600">Área</p>
                        <p className="font-semibold text-gray-900">{property.area}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Diferenciais</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Corretor Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-3xl">
                    👤
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{corretor.name}</h3>
                  <p className="text-sm text-gray-600">Corretor de Imóveis</p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                      <input
                        {...register('name', { required: 'Nome é obrigatório' })}
                        type="text"
                        placeholder="Seu nome"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                      <input
                        {...register('email', { 
                          required: 'Email é obrigatório',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        type="email"
                        placeholder="Seu e-mail"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    
                    <div>
                      <input
                        {...register('phone', { required: 'Telefone é obrigatório' })}
                        type="tel"
                        placeholder="Seu telefone"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    
                    <div>
                      <textarea
                        {...register('message')}
                        placeholder="Mensagem (opcional)"
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition"
                    >
                      {submitting ? 'Enviando...' : 'Tenho Interesse'}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-5xl mb-3">✅</div>
                    <h4 className="font-bold text-green-600 mb-2">Recebemos seu interesse!</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {corretor.name} entrará em contato em breve.
                    </p>
                  </div>
                )}

                {corretor.phone && (
                  <button
                    onClick={shareWhatsApp}
                    className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    💬 WhatsApp
                  </button>
                )}

                <div className="mt-4 pt-4 border-t text-center text-sm text-gray-600">
                  <p>📧 {corretor.email}</p>
                  {corretor.phone && <p>📱 {corretor.phone}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Imóveis Gestor. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
