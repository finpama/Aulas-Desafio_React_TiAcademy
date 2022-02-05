import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from "./views/Home";
import { ListarClientes } from "./views/Cliente/Cliente_Listar";
import { ListarPedidos } from "./views/Pedido/Pedido_Listar";
import { ListarServicos } from "./views/Servico/Servico_Listar";

import { Menu } from './components/Menu';

function App() {
  return (
    <div>
      <Router>
      <Menu/>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/listar-clientes" component={ ListarClientes } />
          <Route path="/listar-pedidos" component={ ListarPedidos } />
          <Route path="/listar-servicos" component={ ListarServicos } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
