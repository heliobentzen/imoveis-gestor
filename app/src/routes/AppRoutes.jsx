import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DetalhesEmpreendimento from "../pages/DetalhesEmpreendimento";
import CadastrarEmpreendimento from "../pages/CadastrarEmpreendimento";
import MeusEmpreendimentos from "../pages/MeusEmpreendimentos";
import EditarEmpreendimento from "../pages/EditarEmpreendimento";
import ModelosDeLandingPages from "../pages/ModelosDeLandingPages";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/meus-empreendimentos" />} />

        <Route path="/meus-empreendimentos" element={<MeusEmpreendimentos />} />
        <Route path="/detalhes-empreendimento" element={<DetalhesEmpreendimento />}/>
        <Route path="/editar-empreendimento/:id" element={<EditarEmpreendimento />} />
        <Route path="/cadastrar-empreendimento" element={<CadastrarEmpreendimento />}/>
        <Route path="/modelos-de-landing-pages" element={<ModelosDeLandingPages />}/>
      </Routes>
    </BrowserRouter>
  );
}


