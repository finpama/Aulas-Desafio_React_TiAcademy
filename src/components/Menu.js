import { Container, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, } from "reactstrap";

export const Menu = () => {
    console.clear()
    return (
        <div>
            <Navbar
                color="info"
                dark
                expand="md"
            >
                <Container>
                    <NavbarBrand href="/">
                        Services TiAcademy
                    </NavbarBrand>
                    <NavbarToggler onClick={function noRefCheck() { }} />
                    <Collapse navbar>
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            <NavItem>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}