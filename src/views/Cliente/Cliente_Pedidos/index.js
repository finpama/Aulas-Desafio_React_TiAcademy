import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListaPedidosCliente = (props) => {
    console.clear()

    const [id] = useState(props.match.params.id)

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    
    useEffect(() => {
        const getPedidos = async () => {
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
        }

        getPedidos();
    }, [id]);

    return (
        <div>
            <Link className="voltar btn-sm btn-primary mx-3 my-2"  to="/lista/cliente">Voltar</Link>

            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Pedidos do Cliente</h1>
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
                        </tr>
                    </thead>
                    <tbody>{
                        data.map(pedido => {
                            return (
                                <tr key={pedido.id}>
                                    <th>{pedido.id}</th>
                                    <td>{pedido.ClienteId}</td>
                                    <td>{pedido.dataPedido}</td>
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