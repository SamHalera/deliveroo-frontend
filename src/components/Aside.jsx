import Cart from "./Cart";
import CartMobile from "./CartMobile";

const Aside = ({
  itemsOnCart,
  handleDecrement,
  handleIncrement,
  counterCart,
  eachTotals,
  setEachTotals,
  total,
  setTotal,
  deliveryFee,
  subTotal,
}) => {
  return (
    <aside>
      <Cart
        itemsOnCart={itemsOnCart}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        counterCart={counterCart}
        eachTotals={eachTotals}
        setEachTotals={setEachTotals}
        total={total}
        setTotal={setTotal}
        deliveryFee={deliveryFee}
        subTotal={subTotal}
      />

      <CartMobile
        itemsOnCart={itemsOnCart}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        counterCart={counterCart}
        eachTotals={eachTotals}
        setEachTotals={setEachTotals}
        total={total}
        setTotal={setTotal}
        deliveryFee={deliveryFee}
        subTotal={subTotal}
      />
    </aside>
  );
};
export default Aside;
