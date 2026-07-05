import { useContext } from "react";
import Button from "./UI/Button";
import { CartContext } from "../context/cart-context";

export default function Cart() {
  const cartContext = useContext(CartContext);
  return (
    <section className="cart">
      <h2>Your Cart</h2>
      <ul></ul>
      <div className="modal-actions">
        <Button textOnly>Close</Button>
        <Button textOnly>Go to Checkout</Button>
      </div>
      <p className="cart-total">12.99</p>
    </section>
  );
}
