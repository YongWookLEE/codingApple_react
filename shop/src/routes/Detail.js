import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { addItem } from "../store/cartSlice";
import { useDispatch } from "react-redux";
// import styled from 'styled-components';

const ItemDetail = (props) => {
  let timeoutId;
  let { id } = useParams(); //  path parameter 정보를 담고있는 객체.
  let [saleState, setSaleState] = useState(true);
  let [tabState, setTabState] = useState(0);
  let [fade, setFade] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate(); // 다른 페이지로 이동 시켜준다.
  let { state } = useLocation(); // 경로 정보를 담고있는 객체이다. 쿼리 파라미터 정보
  //useLocation으로 받은 정보에 원래는 경로 자체에 대한 정보가 담긴다, url이라던가, search(?뒤에 붙는거) 이라던가
  // 근데 {state} 구조분해할당으로 state에 해당하는것만 쏙 받아와서 실행이 됐던것이다. WatchedList에서 state의 이름으로 따로 담아줘서 이게 온 것이고,
  // 쿼리스트링(?뒤에 붙는것)은 search 프로퍼티 안에 오게 된다.

  console.log(state);
  const target =
    state === null ? props.item.find((e) => e.id === parseInt(id)) : state;
  const plag = target.length === 0;

  const goToCart = () => {
    navigate("/cart");
  };

  // mount, update 시 코드 실행해준다, html 렌더링 후에 동작한다.
  useEffect(() => {
    setFade("end");
    // 어려운 연산 // 서버에서 데이터 가져오는 작업 // 타이머 등등 사용
    timeoutId = setTimeout(() => {
      setSaleState(false);
    }, 2000);

    //clean up function / useEffect가 실행되기 전에 return이 실행됨 / 마운트시 실행X, 언마운트시 실행
    return () => {
      setFade("");
      clearTimeout(timeoutId);
    };
  }, []); // ,하고 뒤에 [state]면 해당 state 업데이트시, 마운트시에만 함수실행
  // 빈 []면 마운트시에만 함수 실행

  return (
    <div className={"container start " + fade}>
      {plag ? (
        <div>상품이 없습니다.</div>
      ) : (
        <>
          {saleState ? (
            <div className="alert alert-warning">2초이내 구매시 할인</div>
          ) : null}

          <div className="row">
            <div className="col-md-6">
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/img/shoes${parseInt(target.id) + 1}.jpg`
                }
                width="100%"
              />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5"> {target.title}</h4>
              <p>{target.content}</p>
              <p>{target.price} $</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch(addItem(target));
                  goToCart();
                }}
              >
                주문하기
              </button>
            </div>
          </div>
          <Nav fill variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
              <Nav.Link
                eventKey="link-0"
                onClick={() => {
                  setTabState(0);
                }}
              >
                상품 설명
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                onClick={() => {
                  setTabState(1);
                }}
              >
                후기
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2" disabled>
                임시 메뉴
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3" disabled>
                임시 메뉴
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {}
          <TabContent state={tabState} item={target} />
        </>
      )}
    </div>
  );
};

// 이런식으로도 가능하다.
function TabContent({ state, item }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      setFade("");
    };
  }, [state]);

  return (
    <div className={"start " + fade}>
      {[<InnerItemDetail item={item} />, <InnerReview />][state]}
    </div>
  );
}

function InnerItemDetail({ item }) {
  return (
    <>
      <div>{item.title}</div>
      <div>{item.content}</div>
      <div>{item.price}</div>
    </>
  );
}

function InnerReview() {
  return <div>등록된 리뷰가 없습니다.</div>;
}
// 오브젝트 자료형 filter로 떨궈주면 array 안에 0번째로 떨궈짐
// 쿼리 파람에 형변환은 어떨때 해줘야 하고 어떨때 안하는지??
// 강의에서는  filter나 find 써도 형변환 안해주던데 나는 안하면 오류남

export default ItemDetail;

/*
Path Parameter
<Route path='/product/:id' element={<ProductDetail />} />
"/users/:id"

Query Parameter
"/search?keyword=something"

Path Parameter 와 Query Parameter 랑 차이점이 뭘까?
1. 물음표
2. id는 하나의 정보만 있는데 쿼리 파라미터는 여러 정보 

1. Path Parameter(한가지 정보만) - 예를 들어 리스트에서 상세페이지 이동할때!!!!!!
2. Query Parameter(정보가 많을때) - 페이지네이션, 필터링!!!!!!!

useNavigate // url을 변경하는 함수
useLocation // 현재 페이지의 경로 정보를 담고 있는 객체를 반환,  useLocation의 search 프로퍼티는 Query Parameter 에 대한 정보를 담고 있다.
**/
