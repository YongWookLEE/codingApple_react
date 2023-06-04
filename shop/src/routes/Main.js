import Item from "../component/Item";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { changeTest1, changeTest2 } from "../store/testSlice";

let MoreBtn = styled.button`
  background: white;
  color: grey;
  border: none;
  font-size: 50px;
`; //styled-component에서 사용되는 문법, 버튼 그리는법

const Main = (props) => {
  let [btnClick, setBtnClick] = useState(2);
  let [loading, setLoading] = useState(false);
  let test = useSelector((state) => state.test); //리덕스에 있는 state 가져오는법
  let dispatch = useDispatch(); // 리덕스에서 export한 함수를 실행하기 위해서는 dispatch로 감싸서 실행해야한다.

  return (
    <>
      {loading ? <Loading /> : null}
      <div
        className="main-bg"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg.png)`,
        }}
      />
      <div>
        {" "}
        {test.data1} || {test.data2}{" "}
        <button
          onClick={() => {
            dispatch(changeTest1()); // 리덕스에서 export한 state 변경 함수와 그걸 사용하게 해주는 dispatch()
          }}
        >
          버튼1
        </button>
        <button
          onClick={() => {
            dispatch(changeTest2("persist Success"));
          }}
        >
          버튼2
        </button>
      </div>
      <div className="container">
        <div className="row">
          {props.shoes.map((item, idx) => {
            return <Item item={item} idx={idx} />;
          })}
        </div>
      </div>
      {btnClick <= 3 ? (
        <MoreBtn
          onClick={() => {
            setLoading(true);
            axios
              .get(`https://codingapple1.github.io/shop/data${btnClick}.json`)
              .then((result) => {
                setLoading(false);
                setBtnClick(++btnClick);
                let copy = [...props.shoes, ...result.data];
                props.setShoes(copy);
              })
              .catch(() => {
                setLoading(false);
                console.log("실패함");
              });
          }}
        >
          +
        </MoreBtn>
      ) : null}
    </>
  );
};

export default Main;

function Loading() {
  return <div>로딩중...</div>;
}
