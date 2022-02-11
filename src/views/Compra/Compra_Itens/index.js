import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListaItensCompra = (props) => {
    console.clear()

    const [id] = useState(props.match.params.id)

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItems = async () => {
        await axios.get(`${api}/compra/${id}/itens`)
            .then(response => {
                setData(response.data.itemCompra);
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
        const ProdutoId = tr.dataset.id;

        await axios.delete(`${api}/item-compra/${id}/${ProdutoId}/excluir`)
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
                    <h1>Itens da Compra</h1>
                    <Link className="btn btn-outline-success m-2" to={'/novo/item-compra/' + id}>Novo Item</Link>
                </div>
                {status.type === 'error' ?
                    <Alert color="danger">
                        {status.message}
                    </Alert> : ''
                }
                <Table striped>
                    <thead>
                        <tr>
                            <th>CompraId</th>
                            <th>ProdutoId</th>
                            <th>Quantidade</th>
                            <th>Valor R$</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>{
                        data.map(item => {
                            return (
                                <tr data-id={item.ProdutoId} key={item.ProdutoId}>
                                    <th>{item.CompraId}</th>
                                    <th>{item.ProdutoId}</th>
                                    <td>{item.quantidade}</td>
                                    <td>{item.valor === null ? 0 : item.valor}</td>
                                    <td>
                                        <Link className="m-1 txtDec btn-sm btn-success" to={`/atualizar/item-compra/${item.CompraId}/${item.ProdutoId}`}>Atualizar</Link>
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