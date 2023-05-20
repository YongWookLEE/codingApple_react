import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeCnt, deleteItem } from "../store/cartSlice";
import { changeNm } from "../store/userSlice";
import styled from "styled-components";


const Cart = () => {
  let cart = useSelector((state) => state.cart)
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
 
  const ChangeBtn = styled.button`
  background: white;
  color: black;
  font-size: 18px;
  border: none;
  size: 10px;
  `

  console.log(user.age)
  return (
    <div>
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
                    dispatch(changeCnt({id:d.id, amt:1}));
                  }}
                >
                  +
                </ChangeBtn>
                <ChangeBtn onClick={() => {
                  dispatch(changeCnt({id:d.id, amt:-1}))
                }}>
                  -
                </ChangeBtn>
              </td>
              <td>
              <ChangeBtn onClick={() =>{
                dispatch(deleteItem(d.id))
              }}>
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
