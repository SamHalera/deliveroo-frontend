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
  const handleClickOnItem = (item, index) => {
    const cloneCounter = [...counterCart];
    const cloneItemsOnCart = [...itemsOnCart];
    if (!cloneItemsOnCart.includes(item)) {
      console.log("IF");
      cloneItemsOnCart.push(item);
      cloneCounter.push(1);
      setItemsOnCart(cloneItemsOnCart);
      setCounterCart(cloneCounter);
    } else {
      console.log("ELSE");
      console.log("index=>", index);
      cloneCounter[index] = cloneCounter[index] + 1;
      setCounterCart(cloneCounter);
    }
  };

  const handleIncrement = (item, index) => {
    const cloneCounter = [...counterCart];
    cloneCounter[index] = cloneCounter[index] + 1;
    setCounterCart(cloneCounter);
  };
  const handleDecrement = (item, index) => {
    const cloneCounter = [...counterCart];
    const cloneItemsOnCart = [...itemsOnCart];

    if (cloneCounter[index] === 1) {
      console.log("last index => ", item[index]);
      cloneItemsOnCart.splice(index, 1);
      cloneCounter.splice(index, 1);
      setItemsOnCart(cloneItemsOnCart);
      setCounterCart(cloneCounter);
    } else {
      cloneCounter[index] = cloneCounter[index] - 1;
      setCounterCart(cloneCounter);
    }
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
                      {category.meals.map((meal, index) => {
                        return (
                          //Display each meal
                          <article
                            onClick={() => {
                              handleClickOnItem(meal, index);
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

              {itemsOnCart.length <= 0 && <p>Votre panier est vide</p>}

              <div className="cart-items">
                {itemsOnCart.map((item, index) => {
                  return (
                    <div className="cart-inner" key={item.id}>
                      <div className="counter">
                        <span
                          onClick={() => {
                            handleDecrement(item, index);
                            console.log("item du panier", itemsOnCart[index]);
                            console.log("item du counter", counterCart[index]);
                          }}
                          className="icon-minus"
                        ></span>
                        <span>{counterCart[index]}</span>
                        <span
                          onClick={() => {
                            handleIncrement(item, index);
                          }}
                          className="icon-plus"
                        ></span>
                      </div>
                      <div className="title">
                        <p>{item.title}</p>
                      </div>
                      <div className="price">
                        <p>{item.price} €</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
