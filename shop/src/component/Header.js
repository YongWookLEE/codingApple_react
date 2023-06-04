import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "react-query";

const Header = (props) => {
  let navigate = useNavigate();

  let result = useQuery(
    "name",
    () => {
      return axios
        .get("https://codingapple1.github.io/userdata.json")
        .then((result) => {
          return result.data;
        });
    },
    { staleTime: 2000 } // 폴링 주기, useQuery를 쓰면 자동으로 폴링 해준다  -> 리액트 쿼리 생각보다 쓸만하다.
  );

  // result.error  react-query 실패시
  // result.data   react-query 성공 시 데이터 받아오기
  // result.isLoading react-query 로딩중인지 아닌지 (boolean 값)
  // react-query는 실패시 재요청 해줌
  //

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          ShoeShop
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link
            onClick={() => {
              navigate("/cart");
            }}
          >
            Cart
          </Nav.Link>
        </Nav>

        <Nav className="ms-auto">
          {result.isLoading ? "로딩중" : result.data.name}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
