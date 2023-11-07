import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";
import Header from "./components/Header";
import SectionHead from "./components/SectionHead";

function App() {
  console.log("1");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  console.log("2");

  useEffect(() => {
    console.log("useEffect HERE");
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000");

      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  console.log("render HERE!");
  return isLoading ? (
    <p>Loading ....</p>
  ) : (
    <>
      <Header logo={logo} />

      <SectionHead restaurant={data.restaurant} />
      {console.log(data.restaurant)}

      <main>
        <div className="container">
          <section className="all-categories">
            {data.categories.map((category) => {
              if (category.meals.length > 0) {
                return (
                  <div key={category.name} className="category">
                    <div className="category-name">
                      <h2>{category.name}</h2>
                    </div>

                    <div className="meals">
                      {category.meals.map((meal) => {
                        return (
                          <div key={meal.title} className="one-meal">
                            <div className="meal-infos">
                              <h3>{meal.title}</h3>
                              <p>{meal.description.substring(0, 62)}</p>
                              <div className="price">
                                <span>{meal.price}</span>

                                {meal.popular && (
                                  <span className="popular">
                                    <i className="icon-STAR_FILL"></i> populaire
                                  </span>
                                )}
                              </div>
                            </div>
                            {meal.picture && (
                              <div className="meal-picture">
                                <img src={meal.picture} alt="" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </section>
          <aside>
            <div className="cart">
              <button disabled>Valider mon panier</button>
              <div className="cart-items">
                <p>Votre panier est vide</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
