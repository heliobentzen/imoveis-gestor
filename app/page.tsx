import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Imóveis Gestor
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Sistema completo de gestão de empreendimentos imobiliários
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-6xl mb-4">🏢</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Corretores</h2>
              <p className="text-gray-600 mb-6">
                Gere links personalizados com sua assinatura e compartilhe empreendimentos facilmente
              </p>
              <Link 
                href="/corretor"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Acessar Dashboard
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Gestores</h2>
              <p className="text-gray-600 mb-6">
                Acompanhe leads, performance da equipe e gere relatórios completos
              </p>
              <Link 
                href="/gestor"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Acessar Relatórios
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Principais Funcionalidades</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-3xl mb-2">🔗</div>
                <h4 className="font-semibold text-gray-900 mb-2">Links Personalizados</h4>
                <p className="text-gray-600 text-sm">
                  Cada corretor gera links únicos com sua assinatura
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 mb-2">WhatsApp Integration</h4>
                <p className="text-gray-600 text-sm">
                  Compartilhe facilmente via WhatsApp
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-900 mb-2">Relatórios Detalhados</h4>
                <p className="text-gray-600 text-sm">
                  Acompanhe performance e conversões
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎨</div>
                <h4 className="font-semibold text-gray-900 mb-2">Landing Pages</h4>
                <p className="text-gray-600 text-sm">
                  Landing pages profissionais para cada imóvel
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">📝</div>
                <h4 className="font-semibold text-gray-900 mb-2">Cadastro de Leads</h4>
                <p className="text-gray-600 text-sm">
                  Formulários integrados de captação
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">💻</div>
                <h4 className="font-semibold text-gray-900 mb-2">100% Responsivo</h4>
                <p className="text-gray-600 text-sm">
                  Funciona em desktop, tablet e celular
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
