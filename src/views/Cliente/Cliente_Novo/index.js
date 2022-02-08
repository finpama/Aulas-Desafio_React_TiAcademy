import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const NovoCliente = () => {

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [cliente, setCliente] = useState({
        nome: '',
        nascimento: ''
    });

    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    });

    const NewCliente = async e => {
        e.preventDefault()

        if (cliente.name === '' || cliente.nascimento === '') {
            setStatus({
                type: 'error',
                message: 'Insira dados'
            });
            return;
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/cliente/novo`, cliente, headers)
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
            <Link className="voltar btn-sm btn-primary mx-3 my-2"  to="/lista/cliente/">Voltar</Link>

            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Novo Cliente</h1>
                </div>

                <hr className="m-3 mb-4" />

                <Form onSubmit={NewCliente} inline>
                    <FormGroup floating>
                        <Input
                            id="nome"
                            name="nome"
                            placeholder="nome"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="nome">
                            Nome do Serviço
                        </Label>
                    </FormGroup>
                    {' '}
                    <FormGroup floating>
                        <Input
                            id="nascimento"
                            name="nascimento"
                            placeholder="nascimento"
                            type="text"
                            onChange={valorInput}
                        />
                        <Label for="nascimento">
                            Data de Nascimento
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