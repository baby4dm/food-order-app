import { use } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../context/cart-context";

export default function Header() {
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
        <Button textOnly>Cart ({totalItems})</Button>
      </nav>
    </header>
  );
}
