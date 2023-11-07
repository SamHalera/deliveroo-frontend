const Cart = ({
  itemsOnCart,
  handleDecrement,
  handleIncrement,
  counterCart,
}) => {
  return (
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
  );
};

export default Cart;
