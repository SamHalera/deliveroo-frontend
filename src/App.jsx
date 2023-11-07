import "./App.css";
import "./assets/responsive.css";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";
import Header from "./components/Header";
import SectionHead from "./components/SectionHead";

function App() {
  // console.log("1");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [itemsOnCart, setItemsOnCart] = useState([]);
  const [counterCart, setCounterCart] = useState([]);

  console.log("itemsOnCart =>", itemsOnCart);
  console.log("counterCart =>", counterCart);
  // console.log("2");

  //Deal with the add to cart item
  const handleClickOnItem = (item) => {
    const cloneItemsOnCart = [...itemsOnCart];
    const cloneCounter = [...counterCart];

    cloneItemsOnCart.push(item);
    cloneCounter.push(1);
    setItemsOnCart(cloneItemsOnCart);
    setCounterCart(cloneCounter);
  };

  useEffect(() => {
    // console.log("useEffect HERE");
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error.message });
      }
    };

    fetchData();
  }, []);

  // console.log("render HERE!");
  return isLoading ? (
    <p>Loading ....</p>
  ) : (
    <>
      <Header logo={logo} />

      <SectionHead restaurant={data.restaurant} />

      <main>
        <div className="container">
          {/* Section off all categories */}
          <section className="all-categories">
            {data.categories.map((category) => {
              if (category.meals.length > 0) {
                return (
                  // display a section for each category
                  <section key={category.name} className="category">
                    <div className="category-name">
                      <h2>{category.name}</h2>
                    </div>

                    {/* display a section for a group of category meals */}
                    <div className="meals">
                      {category.meals.map((meal) => {
                        return (
                          //Display each meal
                          <article
                            onClick={() => {
                              handleClickOnItem(meal);
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
                      })}
                    </div>
                  </section>
                );
              } else {
                return null;
              }
            })}
          </section>
          <aside>
            <div className="cart">
              <button disabled>Valider mon panier</button>

              <p>Votre panier est vide</p>

              {itemsOnCart.length > 0 && (
                <div className="cart-items">
                  {itemsOnCart.map((item) => {
                    return (
                      <div className="cart-inner" key={item.id}>
                        <div key={item.id} className="counter">
                          <span key={item.id}>-</span>
                          <span key={item.id}>0</span>
                          <span key={item.id}>+</span>
                        </div>
                        <div key={item.id} className="item">
                          <p key={item.id}>{item.title}</p>
                          <p key={item.id}>{item.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
