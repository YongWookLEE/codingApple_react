import { useParams } from "react-router-dom";

const ItemDetail = (props) => {
  let {id} = useParams();
  const target = props.item.find(e => e.id === parseInt(id));
  const plag = target.length === 0
  return (

    <div className="container">

    {
      plag ? <div>상품이 없습니다.</div> :

      <div className="row">
      <div className="col-md-6">
        <img
          src={process.env.PUBLIC_URL + `/img/shoes${(parseInt(target.id)+1)}.jpg`}
          width="100%"
        />
      </div>
      <div className="col-md-6">
        <h4 className="pt-5"> {target.title}</h4>
        <p>{target.content}</p>
        <p>{target.price} $</p>
        <button className="btn btn-danger">주문하기</button>
      </div>
    </div>
    }
      
    </div>
  );
};

// 오브젝트 자료형 filter로 떨궈주면 array 안에 0번째로 떨궈짐
// 쿼리 파람에 형변환은 어떻때 해줘야 하고 어떨때 안하는지??
// 강의에서는  filter나 find 써도 형변환 안해주던데 나는 안하면 오류남

export default ItemDetail;
