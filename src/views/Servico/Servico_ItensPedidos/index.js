import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListaItensServico = (props) => {
    console.clear()

    const [id] = useState(props.match.params.id)

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    
    useEffect(() => {
        const getItems = async () => {
            await axios.get(`${api}/servico/${id}/pedidos`)
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

        getItems();
    }, [id]);

    return (
        <div>
            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Informações dos Itens</h1>
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
                        </tr>
                    </thead>
                    <tbody>{
                        data.map(item => {
                            return (
                                <tr key={item.PedidoId}>
                                    <th>{item.PedidoId}</th>
                                    <th>{item.ServicoId}</th>
                                    <td>{item.quantidade}</td>
                                    <td>{item.valor === null ? 0 : item.valor}</td>
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