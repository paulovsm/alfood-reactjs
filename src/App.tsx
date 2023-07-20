import { Routes, Route } from 'react-router-dom';
import CadastroPrato from './paginas/Administracao/CadastroPratos';
import CadastroRestaurante from './paginas/Administracao/CadastroRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Administracao/Pratos';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/cadastro" element={<CadastroRestaurante />} />
        <Route path="restaurantes/cadastro/:id" element={<CadastroRestaurante />} />

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/cadastro" element={<CadastroPrato />} />
        <Route path="pratos/cadastro/:id" element={<CadastroPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
