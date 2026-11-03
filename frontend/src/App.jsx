import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import RecuperarSenha from "./Pages/RecuperarSenha";
import Home from "./Pages/Home";
import CalculoPF from "./Pages/CalculoPF";
import CalculoPJ from "./Pages/CalculoPJ";
import Simulador from "./Pages/Simulador";
import Comparativo from "./Pages/Comparativo";
import Historico from "./Pages/Historico";
import FAQ from "./Pages/FAQ";
import Sobre from "./Pages/Sobre";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/sobre" element={<Sobre />} />

        {/* Rotas Logadas */}
        <Route path="/Home" element={<Home />} />
        <Route path="/calculo-pf" element={<CalculoPF />} />
        <Route path="/calculo-pj" element={<CalculoPJ />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/comparativo" element={<Comparativo />} />
        <Route path="/historico" element={<Historico />} />

        {/* Página não encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
