import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
// import styled from 'styled-components';

const ItemDetail = (props) => {
  let timeoutId;
  let { id } = useParams(); // 쿼리 스트링 파람으로 가져온다
  const target = props.item.find((e) => e.id === parseInt(id));
  const plag = target.length === 0;
  let [saleState, setSaleState] = useState(true);
  let [tabState, setTabState] = useState(0);
  let [fade, setFade] = useState("");

  // mount, update 시 코드 실행해준다
  // html 렌더링 후에 동작한다.
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
              <button className="btn btn-danger">주문하기</button>
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
