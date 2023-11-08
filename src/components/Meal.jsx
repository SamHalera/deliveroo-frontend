const Meal = ({ meal, handleAddToCart, index }) => {
  return (
    <article
      onClick={() => {
        handleAddToCart(meal, index);
      }}
      key={meal.id}
      className="one-meal"
    >
      <div className="meal-infos">
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <div className="price-popular">
          <span>{meal.price}</span>

          {meal.popular && (
            <span className="popular">
              <i className="icon-STAR_FILL"></i> Populaire
            </span>
          )}
        </div>
      </div>
      {meal.picture && (
        <div className="meal-picture">
          <img src={meal.picture} alt="" />
        </div>
      )}
    </article>
  );
};
export default Meal;
