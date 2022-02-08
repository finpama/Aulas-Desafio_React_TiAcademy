import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const NovoItem = () => {

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [item, setItem] = useState({
        PedidoId: undefined,
        ServicoId: undefined,
        quantidade: undefined,
        valor: undefined
    });

    const valorInput = e => setItem({
        ...item, [e.target.name]: e.target.value
    });

    const NewItem = async e => {
        e.preventDefault()

        if (item.name === undefined || item.descricao === undefined) {
            setStatus({
                type: 'error',
                message: 'Insira dados'
            });
            return;
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/item/novo`, item, headers)
            .then(response => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                    // history.push('/lista/item/');
                }
            })
            .catch(err => {
                console.log(err);
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com Servidor'
                });
            })
    }

    return (
        <div>
            <Link className="voltar btn-sm btn-primary mx-3 my-2" to="/lista/item/">Voltar</Link>

            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Novo Item</h1>
                </div>

                <hr className="m-3 mb-4" />

                <Form onSubmit={NewItem} inline>
                    <FormGroup floating>
                        <Input
                            id="nome"
                            name="nome"
                            placeholder="nome"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="nome">
                            Nome do Item
                        </Label>
                    </FormGroup>
                    {' '}
                    <FormGroup floating>
                        <Input
                            id="descricao"
                            name="descricao"
                            placeholder="descricao"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="descricao">
                            Descrição
                        </Label>
                    </FormGroup>
                    {' '}
                    <Button color="primary">
                        Criar
                    </Button>
                    {status.type === 'error' ?
                        <Alert className="my-3" color="danger">
                            {status.message}
                        </Alert> :
                        ""
                    }
                    {status.type === 'success' ?
                        <Alert className="my-3" color="success">
                            {status.message}
                        </Alert> :
                        ""
                    }
                </Form>
            </Container>
        </div>
    );
}