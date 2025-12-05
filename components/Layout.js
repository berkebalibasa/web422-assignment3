import MainNav from "./MainNav";
import { Container } from "react-bootstrap";

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <Container style={{ marginTop: "80px" }}>
        {props.children}
      </Container>
    </>
  );
}
