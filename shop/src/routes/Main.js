import Item from "../component/Item";
import axios from "axios";
import { useState } from "react";

const Main = (props) => {
  let [btnClick, setBtnClick] = useState(2);
  let [loading, setLoading] = useState(false);
  return (
    <>
      {loading? <Loading/>:null}
      <div
        className="main-bg"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg.png)`,
        }}
      />
      <div className="container">
        <div className="row">
          {props.shoes.map((item, idx) => {
            return <Item item={item} idx={idx} />;
          })}
        </div>
      </div>
      {btnClick <= 3 ?(
        <button onClick={() => {
          setLoading(true)
          axios.get(`https://codingapple1.github.io/shop/data${btnClick}.json`)
          .then((result) => {
            setLoading(false)
            setBtnClick(++btnClick)
            let copy = [...props.shoes, ...result.data];
            props.setShoes(copy)
          }).catch(()=>{
            setLoading(false)
            console.log("실패함")
          })
      }}> 버튼 </button>) : null
    }
    </>
  );
};

export default Main;

function Loading(){
  return(
    <div>로딩중...</div>
  )
}