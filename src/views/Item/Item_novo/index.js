import axios from "axios";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const NovoItem = (props) => {
    console.clear()

    const [id] = useState(props.match.params.id)

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [item, setItem] = useState({
        PedidoId: id,
        ServicoId: null,
        quantidade: null,
        valor: null
    });

    const valorInput = e => setItem({
        ...item, [e.target.name]: e.target.value
    });

    const NewItem = async e => {
        e.preventDefault()

        if (item.ServicoId === null || item.quantidade === null) {
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
                if (response.data.logMessage.name === 'SequelizeUniqueConstraintError') {
                    setStatus({
                        type: 'error',
                        message: 'Pedido Já existe, atualize o item já existente'
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                }
            })
            .catch(err => {
                console.error(err);
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com Servidor'
                });
            })
    }

    return (
        <div>
            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Pedido: Novo Item</h1>
                </div>

                <hr className="m-3 mb-4" />

                <Form onSubmit={NewItem} inline>
                    <FormGroup floating>
                        <Input
                            id="ServicoId"
                            name="ServicoId"
                            placeholder="ServicoId"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="ServicoId">
                            Insira o ServicoId
                        </Label>
                    </FormGroup>
                    {' '}
                    <FormGroup floating>
                        <Input
                            id="quantidade"
                            name="quantidade"
                            placeholder="quantidade"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="quantidade">
                            Quantidade
                        </Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input
                            id="valor"
                            name="valor"
                            placeholder="valor"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="valor">
                            Valor R$
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