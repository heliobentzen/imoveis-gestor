'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  name: string;
  description?: string;
  location?: string;
  price_from?: number;
  price_to?: number;
}

interface PersonalizedLink {
  id: string;
  token: string;
  property_id: string;
  property_name: string;
  property_location: string;
  views: number;
  created_at: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  property_name: string;
  status: string;
  created_at: string;
}

export default function CorretorDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [links, setLinks] = useState<PersonalizedLink[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  
  // For demo purposes, using corretor-1
  const corretorId = 'corretor-1';

  useEffect(() => {
    fetchProperties();
    fetchLinks();
    fetchLeads();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await fetch(`/api/links?corretor_id=${corretorId}`);
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch(`/api/leads?corretor_id=${corretorId}`);
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const generateLink = async () => {
    if (!selectedProperty) return;
    
    setGenerating(true);
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: selectedProperty,
          corretor_id: corretorId
        })
      });
      
      const data = await response.json();
      await fetchLinks();
      setSelectedProperty('');
    } catch (error) {
      console.error('Error generating link:', error);
    } finally {
      setGenerating(false);
    }
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/imovel/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const shareWhatsApp = (token: string, propertyName: string) => {
    const url = `${window.location.origin}/imovel/${token}`;
    const message = encodeURIComponent(`Olá! Confira este incrível empreendimento: ${propertyName}\n\n${url}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-2xl font-bold">Imóveis Gestor</Link>
              <p className="text-sm text-blue-100">Dashboard do Corretor</p>
            </div>
            <Link href="/" className="text-sm hover:text-blue-200">← Voltar</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">🔗</div>
            <div className="text-3xl font-bold text-blue-600">{links.length}</div>
            <div className="text-gray-600">Links Gerados</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">👁️</div>
            <div className="text-3xl font-bold text-green-600">
              {links.reduce((acc, link) => acc + link.views, 0)}
            </div>
            <div className="text-gray-600">Visualizações</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-3xl font-bold text-purple-600">{leads.length}</div>
            <div className="text-gray-600">Leads Capturados</div>
          </div>
        </div>

        {/* Generate Link Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Gerar Novo Link Personalizado</h2>
          <div className="flex gap-4">
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
            >
              <option value="">Selecione um empreendimento</option>
              {properties.map(prop => (
                <option key={prop.id} value={prop.id}>
                  {prop.name} - {prop.location}
                </option>
              ))}
            </select>
            <button
              onClick={generateLink}
              disabled={!selectedProperty || generating}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {generating ? 'Gerando...' : 'Gerar Link'}
            </button>
          </div>
        </div>

        {/* Links List */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Meus Links</h2>
          <div className="space-y-4">
            {links.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhum link gerado ainda. Crie seu primeiro link acima!
              </p>
            ) : (
              links.map(link => (
                <div key={link.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{link.property_name}</h3>
                      <p className="text-sm text-gray-600">{link.property_location}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Criado em {new Date(link.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">{link.views}</span> visualizações
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={`${typeof window !== 'undefined' ? window.location.origin : ''}/imovel/${link.token}`}
                      readOnly
                      className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 bg-gray-50"
                    />
                    <button
                      onClick={() => copyLink(link.token)}
                      className="bg-gray-600 text-white px-4 py-1 rounded text-sm hover:bg-gray-700 transition"
                    >
                      {copiedToken === link.token ? '✓ Copiado' : '📋 Copiar'}
                    </button>
                    <button
                      onClick={() => shareWhatsApp(link.token, link.property_name)}
                      className="bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700 transition"
                    >
                      💬 WhatsApp
                    </button>
                    <Link
                      href={`/imovel/${link.token}`}
                      target="_blank"
                      className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition"
                    >
                      🔗 Abrir
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Leads Recentes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-2 text-gray-700">Nome</th>
                  <th className="pb-2 text-gray-700">Contato</th>
                  <th className="pb-2 text-gray-700">Empreendimento</th>
                  <th className="pb-2 text-gray-700">Status</th>
                  <th className="pb-2 text-gray-700">Data</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      Nenhum lead capturado ainda
                    </td>
                  </tr>
                ) : (
                  leads.slice(0, 5).map(lead => (
                    <tr key={lead.id} className="border-b">
                      <td className="py-3 text-gray-900">{lead.name}</td>
                      <td className="py-3 text-gray-600 text-sm">
                        {lead.email}<br />
                        {lead.phone}
                      </td>
                      <td className="py-3 text-gray-900">{lead.property_name}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                          lead.status === 'qualified' ? 'bg-purple-100 text-purple-800' :
                          lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600 text-sm">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
