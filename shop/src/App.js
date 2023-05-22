import './App.css';
import { useEffect, useState } from "react";
import data from "./store/data";
import Main from "./routes/Main";
import ItemDetail from "./routes/Detail";
import Event from "./routes/Event";
import Cart from "./routes/Cart";
import Header from './component/Header';
import WatchedList from "./component/WatchedList";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {

    if(!localStorage.getItem('watched')) localStorage.setItem('watched', JSON.stringify([]));


  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <Header/>
      <WatchedList/>
      <Routes>
        <Route path="/" element={<Main shoes={shoes} setShoes={setShoes} />} />
        <Route path="/detail/:id" element={<ItemDetail item={shoes} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
