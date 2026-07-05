import { use } from "react";
import Input from "./Input";
import Button from "./UI/Button";
import { CartContext } from "../context/cart-context";

export default function Checkout() {
  const cartContext = use(CartContext);
  return (
    <section>
      <h2>Checkout</h2>
      <p></p>
      <form>
        <Input name="fullName" label="Full Name" />
        <Input name="email" label="E-Mail Address" />
        <Input name="street" label="Street" />
        <div className="control-row">
          <Input name="postalCode" label="PostalCode" />
          <Input name="city" label="City" />
        </div>
        <div className="modal-actions">
          <Button
            textOnly
            type="button"
            onClick={() => cartContext.setCheckouted(false)}
          >
            Cancel
          </Button>
          <Button>Submit Order</Button>
        </div>
      </form>
    </section>
  );
}
