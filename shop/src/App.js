import "./App.css";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import data from "./data";
import Main from "./routes/Main";
import ItemDetail from "./routes/Detail";
import Event from "./routes/Event";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#Cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Main shoes={shoes} />} />
        <Route path="/detail/:id" element={<ItemDetail item={shoes} />} />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
