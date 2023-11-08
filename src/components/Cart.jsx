const Cart = ({
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
    <div className="cart">
      <button
        onClick={() => {
          if (itemsOnCart.length > 0) {
            alert("Félicitations vous avez validé le panier!! 😎😎😎");
          } else {
            alert(
              "Veuillez commander un repas avant de valider la panier!! 😉😉😉"
            );
          }
        }}
        className={`${itemsOnCart.length <= 0 && "disabled"}`}
      >
        Valider mon panier
      </button>

      {itemsOnCart.length <= 0 && <p>Votre panier est vide</p>}
      {/* cart-items border-bottom */}
      <div
        className={`cart-items ${itemsOnCart.length > 0 && "border-bottom"}`}
      >
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
                <p>{parseFloat(eachTotals[index]).toFixed(2)} €</p>
              </div>
            </div>
          );
        })}
      </div>
      {itemsOnCart.length > 0 && (
        <div className="totals-section">
          <div className="subtotal">
            <div>
              <span>Sous-total</span>
              <span>{subTotal.toFixed(2)} €</span>
            </div>
            <div>
              <span>Frais de livraison</span>
              <span>{deliveryFee.toFixed(2)} €</span>
            </div>
          </div>
          <div className="total">
            <span>Total</span>
            <span>{total.toFixed(2)} €</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
