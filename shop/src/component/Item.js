import { useNavigate } from "react-router-dom";

const Item = (props) => {
  let navigate = useNavigate();
  return (
    <div
      className="col-md-4"
      key={props.idx}
      onClick={() => {
        navigate("/detail");
      }}
    >
      <img
        src={process.env.PUBLIC_URL + `/img/shoes${props.idx + 1}.jpg`}
        width="80%"
      />
      <h4>{props.item.title}</h4>
      <p>{props.item.content}</p>
      <p>{props.item.price} $</p>
    </div>
  );
};

export default Item;
