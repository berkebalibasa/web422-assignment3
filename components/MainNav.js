import Link from "next/link";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const token = readToken();
  const userName = token?.userName;

  function logout() {
    removeToken();
    router.push("/login");
  }
// Navbar with Bootstrap: brand on left, user dropdown on right when logged in
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} href="/">
          BookBrowser
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            {token && (
              <NavDropdown title={userName} id="user-nav-dropdown">

                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>

                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>              
              </NavDropdown>
            )}
            {!token && (
              <Nav.Link as={Link} href="/register">
                Register
              </Nav.Link>
            )}

          </Nav>
          {!token && (
            <Nav>
              <Nav.Link as={Link} href="/login">
                Login
              </Nav.Link>
            </Nav>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
