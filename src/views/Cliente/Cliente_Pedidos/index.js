import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListaPedidosCliente = (props) => {
    console.clear()

    const [id] = useState(props.match.params.id)

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos =  useCallback(async () => {
        await axios.get(`${api}/cliente/${id}/pedidos`)
            .then(response => {
                setData(response.data.pedido);
                return;
            })
            .catch(err => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com o Servidor'
                })
                console.error(err);
            });
    },[id])

    useEffect(() => {
        getPedidos();
    }, [id, getPedidos]);

    const delPedido = async (e) => {
        const tr = e.target.parentNode.parentNode;
        const PedidoId = tr.dataset.id;

        await axios.delete(`${api}/pedido/${PedidoId}/excluir`)
            .then(() => {
                setStatus({
                    type: 'deletion',
                    message: 'Pedido excluido com sucesso'
                });
                getPedidos();
            })
            .catch(err => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com o Servidor'
                })
                console.error(err);
            });
    }

    const novoPedido = async () => {

        const newDateOnly = () => {
            const nowDate = new Date();

            const addZero = (param) => {
                const sParam = param.toString()
                let res = '';
    
                if (sParam[1] === undefined) {
                    res = '0' + sParam
                }
    
                return res;
            }

            const date = nowDate.getFullYear() + '-' + addZero((nowDate.getMonth() + 1)) + '-' + addZero(nowDate.getDate());

            return date;
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const body = {
            "ClienteId": id,
            "dataPedido": newDateOnly()
        }

        await axios.post(`${api}/pedido/novo`, body, headers)
            .then(() => {
                setStatus({
                    type: 'deletion',
                    message: 'Pedido excluido com sucesso'
                });
                getPedidos();
            })
            .catch(err => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com o Servidor'
                })
                console.error(err);
            });
    }

    return (
        <div>
            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Pedidos do Cliente</h1>
                    <Button onClick={novoPedido} color="outline-success" className="m-2">Novo Pedido</Button>
                </div>
                {status.type === 'error' ?
                    <Alert color="danger">
                        {status.message}
                    </Alert> : ''
                }
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>ClienteId</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>{
                        data.map(pedido => {
                            return (
                                <tr data-id={pedido.id} key={pedido.id}>
                                    <th>{pedido.id}</th>
                                    <td>{pedido.ClienteId}</td>
                                    <td>{pedido.dataPedido}</td>
                                    <td>
                                        <Link className="m-1 px-3 txtDec btn-sm btn-primary" to={'/lista/itenspedidos-pedido/' + pedido.id}>Itens</Link>
                                        <Button onClick={delPedido} className="m-1 btn-sm btn-danger">Excluir</Button>
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