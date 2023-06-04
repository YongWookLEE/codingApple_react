import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";

function WatchedList() {
  const watchedList = JSON.parse(localStorage.getItem("watched"));
  let navigate = useNavigate();
  return (
    <div className="watched">
      <ListGroup key="xl" horizontal="xl" className="my-2">
        {watchedList.map((i) => {
          return (
            <ListGroup.Item
              onClick={() => {
                navigate(`/detail/${i.id}`, { state: { ...i } });
                // 여기서 경로 정보에 state라는 배열을 추가해주는 느낌, navigate를 이용한 데이터 전달 방법 -> 뒤에 state를 추가하고 거기다 데이터를 넣어준다.
              }}
            >
              {i.title}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default WatchedList;
