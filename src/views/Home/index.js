import { Container } from "reactstrap";
import cardImg from "./servicos.jpg"

export const Home = () => {
    return (
        <div>
            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Home</h1>
                </div>
                <div className="fd-colunn d-flex mt-3 justify-content-between">
                        <div>
                            <h3>Bem vindo ao Services TiAcademy</h3> <br />
                            <ul>
                                <li>Para Criar um novo Pedido ou Compra vá para os Cliente</li>
                                <li>Ou Consulte/Crie novos Serviços ou Produtos</li>
                            </ul>
                        </div>
                    <img className="cardImg w-50" src={cardImg} />
                </div>
            </Container>
        </div>
    );
}