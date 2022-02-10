import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from "./views/Home";

import { NovoCliente } from './views/Cliente/Cliente_Novo';
import { NovoServico } from "./views/Servico/Servico_Novo";
import { NovoItem } from "./views/Item/Item_novo";

import { ListaCliente } from "./views/Cliente/Cliente_Listar";
import { ListaPedidosCliente } from "./views/Cliente/Cliente_Pedidos";
import { ListaItensPedido } from './views/Pedido/Pedido_Items';
import { ListaItensServico } from "./views/Servico/Servico_ItensPedidos";
import { ListaServico } from "./views/Servico/Servico_Listar";

import { AttCliente } from './views/Cliente/Cliente_Atualizar';
import { AttItemPedido } from './views/Item/Item_Atualizar';
import { AttServico } from './views/Servico/Servico_Atualizar';

import { Menu } from './components/Menu';

function App() {
  return (
    <div>
      <Router>
      <Menu/>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/novo/cliente" component={ NovoCliente } />
          <Route path="/novo/item-pedido/:id" component={ NovoItem } />
          <Route path="/novo/servico" component={ NovoServico } />
          <Route path="/lista/cliente" component={ ListaCliente } />
          <Route path="/lista/pedidos-cliente/:id" component={ ListaPedidosCliente } />
          <Route path="/lista/itenspedidos-pedido/:id" component={ ListaItensPedido } />
          <Route path="/lista/itempedido-servico/:id" component={ ListaItensServico } />
          <Route path="/lista/servico" component={ ListaServico } />
          <Route path="/atualizar/cliente/:id" component={ AttCliente } />
          <Route path="/atualizar/item-pedido/:PedidoId/:ServicoId" component={ AttItemPedido } />
          <Route path="/atualizar/servico/:id" component={ AttServico } />

          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
