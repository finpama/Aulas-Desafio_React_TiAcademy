import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from "./views/Home";

import { NovoServico } from "./views/Servico/Servico_novo";

import { ListaCliente } from "./views/Cliente/Cliente_Listar";
import { ListaServico } from "./views/Servico/Servico_Listar";
import { ListaItensServico } from "./views/Servico/Servico_ItensServicos";

import { Menu } from './components/Menu';

function App() {
  return (
    <div>
      <Router>
      <Menu/>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/novo/servico" component={ NovoServico } />
          <Route path="/lista/cliente" component={ ListaCliente } />
          <Route path="/lista/servico" component={ ListaServico } />
          <Route path="/lista/itens-servico/:id" component={ ListaItensServico } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
