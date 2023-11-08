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
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [itemsOnCart, setItemsOnCart] = useState([]);

  //counterCart is an array of counter => a counter for each item of the cart
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

  //Deal with the add to cart item
  const handleAddToCart = (item, index) => {
    const cloneCounter = [...counterCart];
    const cloneItemsOnCart = [...itemsOnCart];
    const cloneEachTotals = [...eachTotals];
    let sum = 0;

    //If the item not exists inside the cart we simply add it on the list
    if (!cloneItemsOnCart.includes(item)) {
      console.log("IF");
      console.log("index=>", index);

      //add item to cart
      cloneItemsOnCart.push(item);

      //add a counter refered to the item inside the cart array
      cloneCounter.push(1);
      cloneEachTotals.push(parseFloat(item.price));
      setItemsOnCart(cloneItemsOnCart);
      // setCounterCart(cloneCounter);
      // setEachTotals(cloneEachTotals);
    }
    //If item alredady exists inside the cart we increment the counter and the subtotals and total
    else {
      //(item in cart and count must have the same index!!)
      const indexOfReference = cloneItemsOnCart.indexOf(item);
      console.log("ELSE");
      console.log("index inside else=>", cloneCounter);

      //increment the counter
      cloneCounter[indexOfReference] = cloneCounter[indexOfReference] + 1;

      //increment the total price depending on the quantity of a same item
      cloneEachTotals[indexOfReference] =
        cloneEachTotals[indexOfReference] + parseFloat(item.price);

      console.log("index fin else=>", index);
    }

    //Calculate the sum each item total price
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

  //Inside the Cart, when click on "plus" icon we increment the quantity of one item
  // Increment the value of the counter for a specific item
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

  //whenever subtotal change we update teh main total cart
  useEffect(() => {
    const getCartTotal = () => {
      return setTotal(subTotal + deliveryFee);
    };

    getCartTotal();
  }, [subTotal]);
  // console.log("render HERE!");

  ///////// RENDER //////////////////////////////////////////////////////////////////////////////
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
                    handleAddToCart={handleAddToCart}
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
