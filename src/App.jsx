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
  const [eachTotals, setEachTotals] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(2.5);

  console.log("itemsOnCart =>", itemsOnCart);
  console.log("counterCart =>", counterCart);
  console.log("eachTotals =>", eachTotals);
  console.log("subTotal =>", subTotal);
  console.log("total =>", total);
  // console.log("2");

  //Deal with the add to cart item
  const handleClickOnItem = (item, index) => {
    const cloneCounter = [...counterCart];
    const cloneItemsOnCart = [...itemsOnCart];
    const cloneEachTotals = [...eachTotals];
    let sum = 0;
    if (!cloneItemsOnCart.includes(item)) {
      console.log("IF");
      console.log("index=>", index);
      cloneItemsOnCart.push(item);
      cloneCounter.push(1);
      cloneEachTotals.push(parseFloat(item.price));
      setItemsOnCart(cloneItemsOnCart);
      // setCounterCart(cloneCounter);
      // setEachTotals(cloneEachTotals);
    } else {
      const indexOfReference = cloneItemsOnCart.indexOf(item);
      console.log("ELSE");
      console.log("index inside else=>", cloneCounter);
      cloneCounter[indexOfReference] = cloneCounter[indexOfReference] + 1;
      cloneEachTotals[indexOfReference] =
        cloneEachTotals[indexOfReference] + parseFloat(item.price);

      console.log("index fin else=>", index);
    }

    // let sum = cloneEachTotals.reduce((acc, currentValue) => acc + currentValue);
    for (const element of cloneEachTotals) {
      sum += element;
    }
    console.log("subTotal fin handleClickOnItem =>", subTotal);
    setCounterCart(cloneCounter);
    setEachTotals(cloneEachTotals);
    setSubTotal(parseFloat(sum));
    setDeliveryFee(2.5);
    setTotal(subTotal + deliveryFee);
  };

  const handleIncrement = (item, index) => {
    const cloneCounter = [...counterCart];
    cloneCounter[index] = cloneCounter[index] + 1;
    const cloneEachTotals = [...eachTotals];
    cloneEachTotals[index] = cloneEachTotals[index] + parseFloat(item.price);
    let sum = cloneEachTotals.reduce((acc, currentValue) => acc + currentValue);
    setCounterCart(cloneCounter);
    setEachTotals(cloneEachTotals);
    setSubTotal(parseFloat(sum));
    setDeliveryFee(2.5);
    setTotal(subTotal + deliveryFee);
  };
  const handleDecrement = (item, index) => {
    const cloneCounter = [...counterCart];
    const cloneItemsOnCart = [...itemsOnCart];
    const cloneEachTotals = [...eachTotals];

    if (cloneCounter[index] === 1) {
      console.log("last index => ", item[index]);
      cloneItemsOnCart.splice(index, 1);
      cloneCounter.splice(index, 1);
      cloneEachTotals.splice(index, 1);
      setItemsOnCart(cloneItemsOnCart);
      // setCounterCart(cloneCounter);
    } else {
      cloneCounter[index] = cloneCounter[index] - 1;

      cloneEachTotals[index] = cloneEachTotals[index] - parseFloat(item.price);
    }
    setCounterCart(cloneCounter);
    let sum = cloneEachTotals.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
    setEachTotals(cloneEachTotals);
    setSubTotal(parseFloat(sum));
    setDeliveryFee(2.5);
    setTotal(subTotal + deliveryFee);
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

  useEffect(() => {
    const getCartTotal = () => {
      return setTotal(subTotal + deliveryFee);
    };

    getCartTotal();
  }, [subTotal]);
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
            eachTotals={eachTotals}
            setEachTotals={setEachTotals}
            total={total}
            setTotal={setTotal}
            subTotal={subTotal}
            deliveryFee={deliveryFee}
          />
        </div>
      </main>
    </>
  );
}

export default App;
