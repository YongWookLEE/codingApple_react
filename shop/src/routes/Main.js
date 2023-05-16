import Item from "../component/Item";

const Main = (props) => {
  return (
    <>
      <div
        className="main-bg"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg.png)`,
        }}
      />
      <div className="container">
        <div className="row">
          {props.shoes.map((item, idx) => {
            return <Item item={item} idx={idx} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Main;
