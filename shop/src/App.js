import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import data from "./store/data";
import Main from "./routes/Main";
import Event from "./routes/Event";
import Header from "./component/Header";
import WatchedList from "./component/WatchedList";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

const Cart = lazy(() => import("./routes/Cart")); // 효율을 위해 느리게 실행 (lazy하게)
const ItemDetail = lazy(() => import("./routes/Detail"));

function App() {
  if (!localStorage.getItem("watched"))
    localStorage.setItem("watched", JSON.stringify([]));

  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <Header />
      <WatchedList />
      <Suspense fallback={<div>로당중</div>}>
        {" "}
        {/*Routes 이동 중 보여줌} */}
        <Routes>
          <Route
            path="/"
            element={<Main shoes={shoes} setShoes={setShoes} />}
          />
          <Route path="/detail/:id" element={<ItemDetail item={shoes} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />{" "}
            {/* Route 안에 Route는 상위 경로도 같이 써줘야함 example /event/two **/}
          </Route>
          <Route path="*" element={<div>404</div>} />{" "}
          {/*위에 정해준 경로 제외 다른 경로를 타는것 처리는 path에 *을 넣자 **/}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
