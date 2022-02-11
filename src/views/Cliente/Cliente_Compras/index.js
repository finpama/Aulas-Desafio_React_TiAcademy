import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";
import { newDateOnly } from "../../../components/Tools";

import { api } from "../../../config";

export const ListaComprasCliente = (props) => {
    console.clear()

    const [id] = useState(props.match.params.id)

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras =  useCallback(async () => {
        await axios.get(`${api}/cliente/${id}/compras`)
            .then(response => {
                setData(response.data.compras);
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
        getCompras();
    }, [id, getCompras]);

    const delCompra = async (e) => {
        const tr = e.target.parentNode.parentNode;
        const CompraId = tr.dataset.id;

        await axios.delete(`${api}/compra/${CompraId}/excluir`)
            .then(() => {
                setStatus({
                    type: 'deletion',
                    message: 'Compra excluido com sucesso'
                });
                getCompras();
            })
            .catch(err => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com o Servidor'
                })
                console.error(err);
            });
    }

    const novoCompra = async () => {

        const headers = {
            "Content-Type": "application/json"
        }

        const body = {
            "ClienteId": id,
            "data": new Date()
        }

        await axios.post(`${api}/compra/novo`, body, headers)
            .then(() => {
                setStatus({
                    type: 'deletion',
                    message: 'Compra excluido com sucesso'
                });
                getCompras();
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
                    <h1>Compras do Cliente</h1>
                    <Button onClick={novoCompra} color="outline-success" className="m-2">Nova Compra</Button>
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
                        data.map(compra => {
                            return (
                                <tr data-id={compra.id} key={compra.id}>
                                    <th>{compra.id}</th>
                                    <td>{compra.ClienteId}</td>
                                    <td>{compra.data}</td>
                                    <td>
                                        <Link className="m-1 px-3 txtDec btn-sm btn-primary" to={`/lista/compra/${compra.id}/itens`}>Itens</Link>
                                        <Button onClick={delCompra} className="m-1 btn-sm btn-danger">Excluir</Button>
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