import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavItem, NavbarBrand } from "reactstrap";

export const Menu = () => {
    return (
        <div>
            <nav className="fkNav"></nav>
            <Navbar
                color="info"
                dark
                expand="md"
                fixed="top"
            >
                <Container className="d-flex justify-content-end">
                    <NavbarBrand>
                        <Link className="Navbar_brand" to="/">Services TiAcademy</Link>
                    </NavbarBrand>
                    <Nav
                        className="mx-auto flex-row"
                        navbar
                    >
                        <NavItem>
                            <Link className="btn btn-outline-light m-1" to="/lista/cliente/">Clientes</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="btn btn-outline-light m-1" to="/lista/servico/">Serviços</Link>
                        </NavItem><NavItem>
                            <Link className="btn btn-outline-light m-1" to="/lista/produto/">Produtos</Link>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}