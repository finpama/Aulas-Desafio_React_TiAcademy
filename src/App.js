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

import { ListaComprasCliente } from './views/Cliente/Cliente_Compras';

import { ListaItensCompra } from './views/Compra/Compra_Itens';
import { NovoItemCompra } from './views/ItemCompra/ItemCompra_novo';
import { AttItemCompra } from './views/ItemCompra/ItemCompra_Atualizar';

import { ListaItensProduto } from './views/Produtos/Produto_ItensCompras';
import { ListaProduto } from './views/Produtos/Produto_Listar';
import { NovoProduto } from './views/Produtos/Produto_Novo';
import { AttProduto } from "./views/Produtos/Produto_Atualizar";

function App() {
  return (
    <div>
      <Router>
      <Menu/>
        <Switch>
          <Route exact path="/" component={ Home } />

          <Route path="/lista/cliente" component={ ListaCliente } />
          <Route path="/novo/cliente" component={ NovoCliente } />
          <Route path="/atualizar/cliente/:id" component={ AttCliente } />
          <Route path="/lista/pedidos-cliente/:id" component={ ListaPedidosCliente } />

          <Route path="/lista/itenspedidos-pedido/:id" component={ ListaItensPedido } />
          <Route path="/novo/item-pedido/:id" component={ NovoItem } />
          <Route path="/atualizar/item-pedido/:PedidoId/:ServicoId" component={ AttItemPedido } />

          <Route path="/lista/servico" component={ ListaServico } />
          <Route path="/novo/servico" component={ NovoServico } />
          <Route path="/atualizar/servico/:id" component={ AttServico } />
          <Route path="/lista/itempedido-servico/:id" component={ ListaItensServico } />



          <Route path="/lista/compras-cliente/:id" component={ ListaComprasCliente } />

          <Route path="/lista/compra/:id/itens" component={ ListaItensCompra } />
          <Route path="/novo/item-compra/:id" component={ NovoItemCompra } />
          <Route path="/atualizar/item-compra/:CompraId/:ProdutoId" component={ AttItemCompra } />

          <Route path="/lista/produto" component={ ListaProduto } />
          <Route path="/novo/produto" component={ NovoProduto } />
          <Route path="/atualizar/produto/:id" component={ AttProduto } />
          <Route path="/lista/item-compra/produto/:id" component={ ListaItensProduto } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
