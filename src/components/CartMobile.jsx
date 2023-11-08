import { useState } from "react";
const CartMobile = ({
  itemsOnCart,
  handleDecrement,
  handleIncrement,
  counterCart,
}) => {
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <div className="cart cart-mobile">
      <div className="cart-items">
        {itemsOnCart.map((item, index) => {
          return (
            <div className="cart-inner" key={item.id}>
              <div className="counter">
                <span
                  onClick={() => {
                    handleDecrement(item, index);
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
      <button className={`${itemsOnCart.length <= 0 && "disabled"}`}>
        {itemsOnCart.length <= 0 ? "Valider mon panier" : "Voir le panier"}
      </button>

      {/* <div className="cart-items">
        {itemsOnCart.map((item, index) => {
          return (
            <div className="cart-inner" key={item.id}>
              <div className="counter">
                <span
                  onClick={() => {
                    handleDecrement(item, index);
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
      </div> */}
    </div>
  );
};
export default CartMobile;
