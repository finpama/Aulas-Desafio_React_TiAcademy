import axios from "axios";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const AttProduto = (props) => {

    const [id] = useState(props.match.params.id)

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [produto, setProduto] = useState({
        id: null,
        nome: '',
        descricao: ''
    });

    const valorInput = e => setProduto({
        ...produto, [e.target.name]: e.target.value
    });

    const NewProduto = async e => {
        e.preventDefault()

        if (produto.name === '' || produto.descricao === '') {
            setStatus({
                type: 'error',
                message: 'Insira dados'
            });
            return;
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.put(`${api}/atualizar/produto/${id}`, produto, headers)
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
                    <h1>Atualizar Produto</h1>
                </div>

                <hr className="m-3 mb-4" />

                <Form onSubmit={NewProduto} inline>
                    <FormGroup floating>
                        <Input
                            id="nome"
                            name="nome"
                            placeholder="nome"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="nome">
                            Novo Nome
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
                            Nova Descrição
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