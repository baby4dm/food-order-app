import { use, useRef } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../context/cart-context";
import Modal from "./Modal";

export default function Header() {
  const cartRef = useRef();
  const cartContext = use(CartContext);
  const totalItems = cartContext.items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Food" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button
          onClick={() => {
            cartRef.current.openModal();
          }}
          textOnly
        >
          Cart ({totalItems})
        </Button>
      </nav>
      <Modal ref={cartRef}>
        <h2>Cart is empty</h2>
      </Modal>
    </header>
  );
}
