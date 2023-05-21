import { useNavigate } from "react-router-dom";

const Item = (props) => {
  let navigate = useNavigate();
  return (
    <div
      className="col-md-4"
      key={props.idx}
      onClick={() => {
        let list = JSON.parse(localStorage.getItem('watched'));
        if(!list.find(i => i.id === props.item.id)){
          if(list.length >= 5){
            list.shift()
            list.push(props.item);
          }else{
            list.push(props.item);
          }
        } 
        localStorage.setItem('watched', JSON.stringify(list));

        navigate(`/detail/${props.item.id}`);
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
