import "./App.css";
import "./assets/responsive.css";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";
import Header from "./components/Header";
import SectionHead from "./components/SectionHead";
import Category from "./components/Category";
import Aside from "./components/Aside";

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
      console.log("index=>", index);
      cloneItemsOnCart.push(item);
      cloneCounter.push(1);
      setItemsOnCart(cloneItemsOnCart);
      setCounterCart(cloneCounter);
    } else {
      const indexOfCounter = cloneItemsOnCart.indexOf(item);
      console.log("ELSE");
      console.log("index inside else=>", cloneCounter);
      cloneCounter[indexOfCounter] = cloneCounter[indexOfCounter] + 1;
      setCounterCart(cloneCounter);
      console.log("index after else=>", index);
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
                  <Category
                    key={category.name}
                    category={category}
                    handleClickOnItem={handleClickOnItem}
                  />
                );
              } else {
                return null;
              }
            })}
          </section>
          <Aside
            itemsOnCart={itemsOnCart}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            counterCart={counterCart}
          />
        </div>
      </main>
    </>
  );
}

export default App;
