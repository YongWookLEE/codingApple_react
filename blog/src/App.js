/* eslint-disable */ // Terminal에 경고 메세지 제거
import { useState } from "react";
import "./App.css";

function App() {
  let post = "강남 우동 맛집";
  let [글제목, 글제목변경] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "파이썬 독학",
  ]);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [idx, setIdx] = useState(0);
  let [입력값, 입력값변경] = useState("");

  let handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let copy = [...글제목];
      copy.push(e.target.value);

      글제목변경(copy);

      e.target.value = "";
    }
  };

  let deleteOne = (idx) => {
    // let copy = 글제목.filter((f) => f !== title);
    let copy = [...글제목];
    copy.splice(idx, 1);
    글제목변경(copy);
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      {글제목.map((title, idx) => {
        return (
          <div className="list" key={idx}>
            <h4
              onClick={() => {
                setIdx(idx);
                setModal(!modal);
              }}
            >
              {title}{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[idx] = copy[idx] + 1;
                  따봉변경(copy);
                }}
              >
                👍
              </span>{" "}
              {따봉[idx]}{" "}
            </h4>
            <p>2월 17일 발행</p>
            <button
              style={{ marginBottom: "10px" }}
              onClick={() => {
                deleteOne(idx);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

      <input onKeyDown={handleKeyPress}></input>
      {modal === true ? <Modal color="grey" title={글제목} idx={idx} /> : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{props.title[props.idx]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
