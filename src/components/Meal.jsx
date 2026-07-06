import { use } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { CartContext } from "../context/cart-context";

export default function Meal({ meal }) {
  const cartContext = use(CartContext);

  function handleAddToCart() {
    cartContext.addItem(meal);
  }
  return (
    <div className="meal-item">
      <article>
        <img src={"http://localhost:3000/" + meal.image} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <div className="meal-item-actions">
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </article>
    </div>
  );
}
