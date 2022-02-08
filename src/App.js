import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from "./views/Home";

import { NovoCliente } from './views/Cliente/Cliente_Novo';
import { NovoServico } from "./views/Servico/Servico_Novo";
import { NovoItem } from "./views/Item/Item_novo";

import { ListaCliente } from "./views/Cliente/Cliente_Listar";
import { ListaPedidosCliente } from "./views/Cliente/Cliente_Pedidos";
import { ListaServico } from "./views/Servico/Servico_Listar";
import { ListaItensServico } from "./views/Servico/Servico_ItensPedidos";

import { AttCliente } from './views/Cliente/Cliente_Atualizar';
import { AttServico } from './views/Servico/Servico_Atualizar';

import { Menu } from './components/Menu';

function App() {
  return (
    <div>
      <Router>
      <Menu/>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/novo/servico" component={ NovoServico } />
          <Route path="/novo/cliente" component={ NovoCliente } />
          <Route path="/novo/item" component={ NovoItem } />
          <Route path="/lista/cliente" component={ ListaCliente } />
          <Route path="/lista/servico" component={ ListaServico } />
          <Route path="/lista/pedidos-cliente/:id" component={ ListaPedidosCliente } />
          <Route path="/lista/itens-servico/:id" component={ ListaItensServico } />
          <Route path="/atualizar/cliente/:id" component={ AttCliente } />
          <Route path="/atualizar/servico/:id" component={ AttServico } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
