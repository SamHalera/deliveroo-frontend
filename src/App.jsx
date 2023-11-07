import "./App.css";
import "./assets/responsive.css";
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
                  <section key={category.name} className="category">
                    <div className="category-name">
                      <h2>{category.name}</h2>
                    </div>

                    <div className="meals">
                      {category.meals.map((meal) => {
                        return (
                          <article key={meal.id} className="one-meal">
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
