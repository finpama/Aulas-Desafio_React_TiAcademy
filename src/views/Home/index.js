import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>

                <div className="d-flex justify-content-between">
                    <h1>Home</h1>
                    <div className="mt-3">
                        <a className="btn btn-outline-primary btn-sm m-1" href="/listar-clientes">Listar Clientes</a>
                        <a className="btn btn-outline-primary btn-sm m-1" href="/listar-pedidos">Listar Pedidos</a>
                        <a className="btn btn-outline-primary btn-sm m-1" href="/listar-servicos">Listar Servicos</a>
                    </div>
                </div>
            </Container>
        </div>
    );
}