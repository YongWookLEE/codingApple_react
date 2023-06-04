import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeCnt, deleteItem } from "../store/cartSlice";
import { changeNm } from "../store/userSlice";
import styled from "styled-components";
import { useState, memo, useMemo } from "react";

let Childe = memo((props) => {
  console.log("재렌더링 됨");
  return <div>자식 = {props.count}</div>;
}); // memo -> 꼭 필요할 때만 재렌더링

let 함수 = () => {
  return "반복문 10억번 돌리기";
};

const Cart = () => {
  let cart = useSelector((state) => state.cart);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  let [count, setCount] = useState(0);

  let result = useMemo(() => 함수(), [count]); // 컴포넌트 렌더링시 1회만 실행 후 실행되지 않음 / 뒤에 state가 변할때만 실행됨
  // useMemo는 렌더링 시 실행, useEffect HTML 렌더링이 끝난 후 실행, 실행 시점의 차이

  const ChangeBtn = styled.button`
    background: white;
    color: black;
    font-size: 18px;
    border: none;
    size: 10px;
  `;

  return (
    <div>
      <Childe count={count}></Childe>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </button>
      {user.name}의 장바구니
      <Table>
        <thead>
          <tr>
            <th>상품번호</th>
            <th>상품명</th>
            <th>수량</th>
            <th>수량 변경</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((d) => (
            <tr>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.count}</td>
              <td>
                <ChangeBtn
                  onClick={() => {
                    dispatch(changeCnt({ id: d.id, amt: 1 }));
                  }}
                >
                  +
                </ChangeBtn>
                <ChangeBtn
                  onClick={() => {
                    dispatch(changeCnt({ id: d.id, amt: -1 }));
                  }}
                >
                  -
                </ChangeBtn>
              </td>
              <td>
                <ChangeBtn
                  onClick={() => {
                    dispatch(deleteItem(d.id));
                  }}
                >
                  삭제하기
                </ChangeBtn>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
