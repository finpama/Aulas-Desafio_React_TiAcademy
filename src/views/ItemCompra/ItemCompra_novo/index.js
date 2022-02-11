import axios from "axios";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const NovoItemCompra = (props) => {

    const [id] = useState(props.match.params.id)

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [item, setItem] = useState({
        CompraId: id,
        ProdutoId: null,
        quantidade: null,
        valor: null
    });

    const valorInput = e => setItem({
        ...item, [e.target.name]: e.target.value
    });

    const NewItem = async e => {
        e.preventDefault()

        if (item.ProdutoId === null || item.quantidade === null) {
            setStatus({
                type: 'error',
                message: 'Insira dados'
            });
            return;
        }

        if (item.valor.includes(',')) {
            setStatus({
                type: 'error',
                message: 'Use ponto no lugar da vírgula no campo valor'
            });
            return;
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/item-compra/novo`, item, headers)
            .then(response => {
                if (response.data.logMessage === undefined) {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });

                } else {
                    if (response.data.logMessage.name === 'SequelizeUniqueConstraintError') {
                        setStatus({
                            type: 'error',
                            message: 'Compra Já existe, atualize o item já existente'
                        });
                    }
                    console.log(response.data.logMessage);
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
                    <h1>Compra: Novo Item</h1>
                </div>

                <hr className="m-3 mb-4" />

                <Form onSubmit={NewItem} inline>
                    <FormGroup floating>
                        <Input
                            id="ProdutoId"
                            name="ProdutoId"
                            placeholder="ProdutoId"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="ProdutoId">
                            Insira o ProdutoId
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
                            Valor R$0.00
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