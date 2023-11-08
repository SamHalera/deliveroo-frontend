import Meal from "./Meal";

const Category = ({ category, handleAddToCart }) => {
  // display a section for each category
  return (
    // display a section for each category
    <section className="category">
      <div className="category-name">
        <h2>{category.name}</h2>
      </div>

      {/* display a section for a group of category meals */}

      <div className="meals">
        {category.meals.map((meal, index) => {
          return (
            <Meal
              key={meal.id}
              meal={meal}
              handleAddToCart={handleAddToCart}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};
export default Category;
