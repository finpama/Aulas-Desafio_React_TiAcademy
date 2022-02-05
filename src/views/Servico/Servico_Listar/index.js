import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarServicos = () => {
    console.clear()

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        await axios.get(api + '/servico/lista')
            .then(response => {
                setData(response.data.servicos);
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
        getServicos();
    }, []);

    return (
        <div>
            <Container className="mt-3">
                <div>
                    <h1>Informações dos Serviços</h1>
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
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>{
                        data.map(item => {
                            return (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <td>{item.nome}</td>
                                    <td>{item.descricao}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-outline-primary" to={'/listar/itens-servico/' + item.id}>Pedidos</Link>
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