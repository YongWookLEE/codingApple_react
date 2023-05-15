/* eslint-disable */ // Terminal에 경고 메세지 제거
import { useState } from 'react';
import './App.css';

function App() {
  let post = '강남 우동 맛집';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [따봉, 따봉변경] = useState([0,0,0]);
  let [modal, setModal] = useState(false);

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>ReactBlog</h4>
      </div>
      {
        글제목.map((title, idx) => {
          return (
            <div className='list' key={idx}>
            <h4 onClick={() => {
              setModal(!modal)}}>{title}<span onClick={() => { 
                let copy = [...따봉]
                copy[idx] = copy[idx] +1
                따봉변경(copy)}}>👍</span> {따봉[idx]} </h4>
            <p>2월 17일 발행</p>
          </div>
          )
        })
      }

      {
        modal === true ? <Modal/> : null
      }

    </div>
  );
}

function Modal() {
  return(
    <div className='modal'>
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
  )
}

export default App;
