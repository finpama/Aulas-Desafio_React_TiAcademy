import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListaProduto = () => {
    console.clear()

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + '/produto/lista')
            .then(response => {
                setData(response.data.produtos);
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
        getProdutos();
    }, []);

    const delProdutos = async (e) => {
        const tr = e.target.parentNode.parentNode;
        const ProdutosId = tr.dataset.id;

        await axios.delete(`${api}/produto/${ProdutosId}/excluir`)
            .then(() => {
                setStatus({
                    type: 'deletion',
                    message: 'Produto excluido com sucesso'
                });
                getProdutos();
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
                    <h1>Informações dos Produtos</h1>
                    <Link className="btn btn-outline-success m-2" to={'/novo/produto/'}>Novo Produto</Link>
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
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>{
                        data.map(prod => {
                            return (
                                <tr data-id={prod.id} key={prod.id}>
                                    <th>{prod.id}</th>
                                    <td>{prod.nome}</td>
                                    <td>{prod.descricao}</td>
                                    <td className="text-center">
                                        <Link className="m-1 txtDec btn-sm btn-primary" to={'/lista/item-compra/produto/' + prod.id}>Compras</Link>
                                        <Link className="m-1 txtDec btn-sm btn-success" to={'/atualizar/produto/' + prod.id}>Atualizar</Link>
                                        <Button onClick={delProdutos} className="m-1 btn-sm btn-danger">Excluir</Button>
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