import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListaCliente = () => {
    console.clear()

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCliente = async () => {
        await axios.get(api + '/cliente/lista')
            .then(response => {
                setData(response.data.clientes);
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
        getCliente();
    }, []);

    const delServico = async (e) => {
        const tr = e.target.parentNode.parentNode;
        const ServicoId = tr.dataset.id;

        await axios.delete(`${api}/cliente/${ServicoId}/excluir`)
            .then(() => {
                setStatus({
                    type: 'deletion',
                    message: 'Serviço excluido com sucesso'
                });
                getCliente();
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
            <Link className="voltar btn-sm btn-primary mx-3 my-2" to="/">Voltar</Link>

            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Clientes</h1>
                    <Link className="btn btn-outline-success m-2" to={'/novo/cliente/'}>Novo Cliente</Link>
                </div>
                {status.type !== '' ?
                    <Alert color="danger">
                        {status.message}
                    </Alert> : ''
                }
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Nascimento</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>{
                        data.map(serv => {
                            return (
                                <tr data-id={serv.id} key={serv.id}>
                                    <th>{serv.id}</th>
                                    <td>{serv.nome}</td>
                                    <td>{serv.nascimento}</td>
                                    <td className="text-center">
                                        <Link className="m-1 txtDec btn-sm btn-primary" to={'/lista/pedidos-cliente/' + serv.id}>Pedidos</Link>
                                        <Link className="m-1 txtDec btn-sm btn-success" to={'/atualizar/cliente/' + serv.id}>Atualizar</Link>
                                        <Button onClick={delServico} className="m-1 btn-sm btn-danger">Excluir</Button>
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