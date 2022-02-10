import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListaItensPedido = (props) => {
    console.clear()

    const [id] = useState(props.match.params.id)

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItems = async () => {
        await axios.get(`${api}/pedido/${id}/items-pedidos`)
            .then(response => {
                setData(response.data.itemPedido);
            })
            .catch(err => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com o Servidor'
                })
                console.log(err);
            });
    }

    useEffect(() => {
        getItems();
    }, [id]);

    const delItem = async (e) => {
        const tr = e.target.parentNode.parentNode;
        const Id = tr.dataset.id;

        await axios.delete(`${api}/item/${Id}/excluir`)
            .then(() => {
                setStatus({
                    type: 'deletion',
                    message: 'Item excluido com sucesso'
                });
                getItems();
            })
            .catch(err => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com o Servidor'
                })
                console.log(err);
            });
    }

    return (
        <div>
            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Itens do Pedido</h1>
                    <Link className="btn btn-outline-success m-2" to={'/novo/item-pedido/' + id}>Novo Item</Link>
                </div>
                {status.type === 'error' ?
                    <Alert color="danger">
                        {status.message}
                    </Alert> : ''
                }
                <Table striped>
                    <thead>
                        <tr>
                            <th>PedidoId</th>
                            <th>ServiçoId</th>
                            <th>Quantidade</th>
                            <th>Valor R$</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>{
                        data.map(item => {
                            return (
                                <tr data-id={item.ServicoId} key={item.ServicoId}>
                                    <th>{item.PedidoId}</th>
                                    <th>{item.ServicoId}</th>
                                    <td>{item.quantidade}</td>
                                    <td>{item.valor === null ? 0 : item.valor}</td>
                                    <td>
                                        <Link className="m-1 txtDec btn-sm btn-success" to={`/atualizar/item-pedido/${item.PedidoId}/${item.ServicoId}`}>Atualizar</Link>
                                        <Button onClick={delItem} className="m-1 btn-sm btn-danger">Excluir</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}