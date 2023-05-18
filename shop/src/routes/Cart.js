import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeCnt } from "../store/cartSlice";
import { changeNm } from "../store/userSlice";


const Cart = () => {
  let cart = useSelector((state) => state.cart)
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
 

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
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((d) => (
            <tr>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeCnt(d.id));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
