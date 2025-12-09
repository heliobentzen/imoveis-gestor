export default function LandingPageCard() {
  const modelos = [
    {
      id: 1,
      nome: "Modelo Clean",
      img: "/images/modelo-clean.png",
    },
    {
      id: 2,
      nome: "Modelo Moderno",
      img: "/images/modelo-moderno.png",
    },
    {
      id: 3,
      nome: "Modelo Luxo",
      img: "/images/modelo-luxo.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {modelos.map((modelo) => (
        <div
          key={modelo.id}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col
"
        >
          {/* IMAGEM */}
          <div className="bg-gray-100 h-40 w-full rounded-md mb-3 flex items-center justify-center overflow-hidden">
            <img
              src={modelo.img}
              alt={modelo.nome}
              className="w-full object-cover"
            />
          </div>

          {/* NOME */}
          <p className="text-center font-medium mb-3">{modelo.nome}</p>

          {/* RODAPÉ */}
          <div className="flex justify-between items-center mt-auto">
            {/* RADIO BUTTON */}
            <div className="flex items-center justify-center w-8 h-8 border border-gray-400 rounded-full">
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
            </div>

            {/* BOTÃO */}
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
              Gerar link
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

