import { Container, NavLink, Nav, Navbar, NavItem, NavbarBrand } from "reactstrap";

export const Menu = () => {
    return (
        <div>
            <Navbar
                color="info"
                dark
                expand="md"
            >
                <Container className="d-flex justify-content-end">
                    <NavbarBrand href="/">
                        Services TiAcademy
                    </NavbarBrand>
                        <Nav
                            className="mx-auto"
                            navbar
                        >
                            <NavItem>
                                <NavLink href="/listar-clientes">
                                    Listar Clientes
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/listar-pedidos">
                                    Listar Pedidos
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/listar-servicos">
                                    Listar Serviços
                                </NavLink>
                            </NavItem>
                        </Nav>
                </Container>
            </Navbar>
        </div>
    );
}