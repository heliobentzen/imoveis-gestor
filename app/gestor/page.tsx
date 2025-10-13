'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  property_name: string;
  property_location: string;
  corretor_name: string;
  status: string;
  created_at: string;
}

interface LeadsByCorretor {
  [key: string]: {
    corretor_name: string;
    count: number;
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
  };
}

export default function GestorDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLeadsByCorretor = (): LeadsByCorretor => {
    const result: LeadsByCorretor = {};
    
    leads.forEach(lead => {
      const key = lead.corretor_name || 'Unknown';
      if (!result[key]) {
        result[key] = {
          corretor_name: key,
          count: 0,
          new: 0,
          contacted: 0,
          qualified: 0,
          converted: 0
        };
      }
      result[key].count++;
      if (lead.status === 'new') result[key].new++;
      if (lead.status === 'contacted') result[key].contacted++;
      if (lead.status === 'qualified') result[key].qualified++;
      if (lead.status === 'converted') result[key].converted++;
    });
    
    return result;
  };

  const getFilteredLeads = () => {
    if (filterStatus === 'all') return leads;
    return leads.filter(lead => lead.status === filterStatus);
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Telefone', 'Empreendimento', 'Corretor', 'Status', 'Data'];
    const rows = leads.map(lead => [
      lead.name,
      lead.email,
      lead.phone,
      lead.property_name,
      lead.corretor_name,
      lead.status,
      new Date(lead.created_at).toLocaleDateString('pt-BR')
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const leadsByCorretor = getLeadsByCorretor();
  const filteredLeads = getFilteredLeads();
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const convertedLeads = leads.filter(l => l.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">📊</div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-2xl font-bold">Imóveis Gestor</Link>
              <p className="text-sm text-indigo-100">Dashboard do Gestor</p>
            </div>
            <Link href="/" className="text-sm hover:text-indigo-200">← Voltar</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-3xl font-bold text-indigo-600">{totalLeads}</div>
            <div className="text-gray-600">Total de Leads</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">🆕</div>
            <div className="text-3xl font-bold text-blue-600">{newLeads}</div>
            <div className="text-gray-600">Novos Leads</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-3xl font-bold text-green-600">{convertedLeads}</div>
            <div className="text-gray-600">Convertidos</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-3xl font-bold text-purple-600">{conversionRate}%</div>
            <div className="text-gray-600">Taxa de Conversão</div>
          </div>
        </div>

        {/* Performance by Corretor */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Performance da Equipe</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-2 text-gray-700">Corretor</th>
                  <th className="pb-2 text-gray-700 text-center">Total</th>
                  <th className="pb-2 text-gray-700 text-center">Novos</th>
                  <th className="pb-2 text-gray-700 text-center">Contactados</th>
                  <th className="pb-2 text-gray-700 text-center">Qualificados</th>
                  <th className="pb-2 text-gray-700 text-center">Convertidos</th>
                  <th className="pb-2 text-gray-700 text-center">Taxa</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(leadsByCorretor).map((data, idx) => {
                  const rate = data.count > 0 ? ((data.converted / data.count) * 100).toFixed(1) : '0.0';
                  return (
                    <tr key={idx} className="border-b">
                      <td className="py-3 text-gray-900 font-semibold">{data.corretor_name}</td>
                      <td className="py-3 text-center font-bold text-indigo-600">{data.count}</td>
                      <td className="py-3 text-center text-gray-700">{data.new}</td>
                      <td className="py-3 text-center text-gray-700">{data.contacted}</td>
                      <td className="py-3 text-center text-gray-700">{data.qualified}</td>
                      <td className="py-3 text-center text-green-600 font-semibold">{data.converted}</td>
                      <td className="py-3 text-center text-purple-600 font-semibold">{rate}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Leads */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Todos os Leads</h2>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
              >
                <option value="all">Todos</option>
                <option value="new">Novos</option>
                <option value="contacted">Contactados</option>
                <option value="qualified">Qualificados</option>
                <option value="converted">Convertidos</option>
                <option value="lost">Perdidos</option>
              </select>
              <button
                onClick={exportToCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                📥 Exportar CSV
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-2 text-gray-700">Cliente</th>
                  <th className="pb-2 text-gray-700">Contato</th>
                  <th className="pb-2 text-gray-700">Empreendimento</th>
                  <th className="pb-2 text-gray-700">Corretor</th>
                  <th className="pb-2 text-gray-700">Status</th>
                  <th className="pb-2 text-gray-700">Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Nenhum lead encontrado
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">
                        <div className="font-semibold text-gray-900">{lead.name}</div>
                        {lead.message && (
                          <div className="text-xs text-gray-500 mt-1">{lead.message}</div>
                        )}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        <div>{lead.email}</div>
                        <div>{lead.phone}</div>
                      </td>
                      <td className="py-3 text-gray-900">
                        <div className="font-medium">{lead.property_name}</div>
                        <div className="text-xs text-gray-500">{lead.property_location}</div>
                      </td>
                      <td className="py-3 text-gray-900">{lead.corretor_name}</td>
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
                      <td className="py-3 text-sm text-gray-600">
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
