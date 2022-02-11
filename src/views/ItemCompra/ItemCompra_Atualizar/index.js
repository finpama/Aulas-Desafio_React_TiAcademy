import axios from "axios";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const AttItemCompra = (props) => {

    const [CompraId] = useState(props.match.params.CompraId)
    const [ProdutoId] = useState(props.match.params.ProdutoId)

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [item, setItem] = useState({
        id: null,
        quantidade: '',
        valor: ''
    });

    const valorInput = e => setItem({
        ...item, [e.target.name]: e.target.value
    });

    const NewItem = async e => {
        e.preventDefault()

        if (item.quantidade === '' || item.valor === '') {
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

        await axios.put(`${api}/atualizar/item/compra/${CompraId}/produto/${ProdutoId}`, item, headers)
            .then(response => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else{
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
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
            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Atualizar Item Compra</h1>
                </div>

                <hr className="m-3 mb-4" />

                <Form onSubmit={NewItem} inline>
                    <FormGroup floating>
                        <Input
                            id="quantidade"
                            name="quantidade"
                            placeholder="quantidade"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="quantidade">
                            Nova Quantidade
                        </Label>
                    </FormGroup><FormGroup floating>
                        <Input
                            id="valor"
                            name="valor"
                            placeholder="valor"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="valor">
                            Novo Valor
                        </Label>
                    </FormGroup>
                    {' '}
                    <Button color="primary">
                        Atualizar
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