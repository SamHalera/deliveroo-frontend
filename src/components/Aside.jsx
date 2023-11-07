import Cart from "./Cart";

const Aside = ({
  itemsOnCart,
  handleDecrement,
  handleIncrement,
  counterCart,
}) => {
  return (
    <aside>
      <Cart
        itemsOnCart={itemsOnCart}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        counterCart={counterCart}
      />
    </aside>
  );
};
export default Aside;
