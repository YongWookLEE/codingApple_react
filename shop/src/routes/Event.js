import { Outlet } from "react-router-dom";

function Event() {
  return (
    <div>
      <h6>오늘의 이벤트</h6>
      <Outlet />
    </div>
  );
}

export default Event;
