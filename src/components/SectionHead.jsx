const SectionHead = ({ restaurant }) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="title">
          <h1>{restaurant.name}</h1>
          <p className="description">{restaurant.description} </p>
        </div>
        <div className="title-picture">
          <img className="" src={restaurant.picture} alt="" />
        </div>
      </div>
    </section>
  );
};
export default SectionHead;
