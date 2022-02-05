import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from "./views/Home";
import { ListarClientes } from "./views/Cliente/Cliente_Listar";
import { ListarServicos } from "./views/Servico/Servico_Listar";
import { ListarItensServicos } from "./views/Servico/Servico_ItensServicos";

import { Menu } from './components/Menu';

function App() {
  return (
    <div>
      <Router>
      <Menu/>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/listar/clientes" component={ ListarClientes } />
          <Route path="/listar/servicos" component={ ListarServicos } />
          <Route path="/listar/itens-servico/:id" component={ ListarItensServicos } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
