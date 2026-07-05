import { useContext } from "react";
import Button from "./UI/Button";
import { CartContext } from "../context/cart-context";
import CartItem from "./CartItem";
import { currencyFormatter } from "../util/formatting";

export default function Cart({ onClose }) {
  const cartContext = useContext(CartContext);
  const totalPrice = cartContext.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);
  const cartIsEmpty = cartContext.items.length < 1;
  return (
    <section className="cart">
      <h2>Your Cart</h2>
      {cartIsEmpty && <p>Please add some items to the Cart</p>}
      <ul>
        {cartContext.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      {!cartIsEmpty && (
        <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      )}
      <div className="modal-actions">
        <Button textOnly onClick={onClose}>
          Close
        </Button>
        {!cartIsEmpty && (
          <Button onClick={() => cartContext.setCheckouted(true)}>
            Go to Checkout
          </Button>
        )}
      </div>
    </section>
  );
}
