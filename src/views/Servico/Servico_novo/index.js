import axios from "axios";
import { useState } from "react";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const NovoServico = () => {

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const [servico, setServico] = useState({
        nome: '',
        descricao: ''
    });

    const valorInput = e => setServico({
        ...servico, [e.target.name]: e.target.value
    });

    const NewServico = async e => {
        e.preventDefault()

        if (servico.name === '' || servico.descricao === '') {
            setStatus({
                type: 'error',
                message: 'Insira dados'
            });
            return;
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/servico/novo`, servico, headers)
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
                    // history.push('/lista/servico/');
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
                    <h1>Novo Serviço</h1>
                </div>

                <hr className="m-3 mb-4" />

                <Form onSubmit={NewServico} inline>
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