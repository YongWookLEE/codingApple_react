import Item from "../component/Item";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {changeTest1, changeTest2} from "../store/testSlice"; 

let MoreBtn = styled.button`
  background: white;
  color: grey;
  border: none;
  font-size: 50px;
`;

const Main = (props) => {
  let [btnClick, setBtnClick] = useState(2);
  let [loading, setLoading] = useState(false);
  let test = useSelector((state) => state.test);
  let dispatch = useDispatch();

  return (
    <>
      {loading ? <Loading /> : null}
      <div
        className="main-bg"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg.png)`,
        }}
      />
      <div> {test.data1} || {test.data2} <button onClick={() => {
        dispatch(changeTest1());
      }}>버튼1</button><button onClick={() => {
        dispatch(changeTest2("persist Success"));
      }}>버튼2</button></div>
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
