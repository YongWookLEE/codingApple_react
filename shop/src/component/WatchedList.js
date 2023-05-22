import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';

function WatchedList() {
    const watchedList = JSON.parse(localStorage.getItem('watched'));
    let navigate = useNavigate();
  return (
    <div className='watched'>  
      <ListGroup key='xl' horizontal='xl' className="my-2">
          {
              watchedList.map((i)=> {
              return <ListGroup.Item onClick={() => {
                  navigate(`/detail/${i.id}`,{state: {...i}} )
              }
              }>{i.title}</ListGroup.Item>})
          }
      </ListGroup>
    </div>
  );
}

export default WatchedList;