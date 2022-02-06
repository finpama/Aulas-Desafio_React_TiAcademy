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
                                <NavLink href="/lista/cliente">
                                    Lista Cliente
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/lista/servico">
                                    Lista Serviço
                                </NavLink>
                            </NavItem>
                        </Nav>
                </Container>
            </Navbar>
        </div>
    );
}