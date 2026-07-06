import { use, useState } from "react";
import Input from "./Input";
import Button from "./UI/Button";
import ErrorMessage from "./Error";
import Success from "./Success";
import { CartContext } from "../context/cart-context";
import { currencyFormatter } from "../util/formatting";
import { useActionState } from "react";

function validateData(data) {
  const errors = [];

  if (data.name.trim().length === 0) {
    errors.push("Name should not be empty");
  }
  if (data.email.trim().length === 0 || !data.email.includes("@")) {
    errors.push(`Email should not be empty and includes "@"`);
  }

  if (data.street.trim().length === 0) {
    errors.push("Street should not be empty");
  }
  if (!/^\d{5}$/.test(data["postal-code"])) {
    errors.push("Postal code must contain exactly 5 digits");
  }
  if (data.city.trim().length === 0) {
    errors.push("City should not be empty");
  }

  return {
    name: data.name,
    email: data.email,
    street: data.street,
    postalCode: data["postal-code"],
    city: data.city,
    errors,
  };
}

export default function Checkout({ onClose }) {
  const cartContext = use(CartContext);
  const totalPrice = cartContext.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  const [isSubmited, setIsSubmited] = useState(false);

  async function handleSubmitOrder(prevState, formData) {
    const customer = {
      name: formData.get("fullName"),
      email: formData.get("email"),
      street: formData.get("street"),
      "postal-code": formData.get("postalCode"),
      city: formData.get("city"),
    };

    const validateInfo = validateData(customer);

    if (validateInfo.errors.length > 0) {
      return validateInfo;
    }

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: {
            items: cartContext.items,
            customer,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Error occured while sending data, please try again");
      }
      setIsSubmited(true);
    } catch (err) {
      console.log(err.message);
      return { ...validateInfo, requestError: err.message };
    }

    return { errors: null };
  }

  const [formState, formAction, isPending] = useActionState(handleSubmitOrder, {
    errors: null,
  });
  if (isSubmited) {
    return (
      <Success
        onClose={() => {
          setIsSubmited(false);
          cartContext.submitContext();
          onClose();
        }}
      />
    );
  }
  return (
    <section>
      <h2>Checkout</h2>
      <p>Total price: {currencyFormatter.format(totalPrice)}</p>
      <form action={formAction}>
        <Input
          name="fullName"
          label="Full Name"
          defaultValue={formState?.name}
        />
        <Input
          name="email"
          label="E-Mail Address"
          defaultValue={formState?.email}
        />
        <Input name="street" label="Street" defaultValue={formState?.street} />
        <div className="control-row">
          <Input
            name="postalCode"
            label="PostalCode"
            defaultValue={formState?.postalCode}
          />
          <Input name="city" label="City" defaultValue={formState?.city} />
        </div>

        {formState.errors && (
          <ul>
            {formState.errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        {formState.requestError && (
          <ErrorMessage
            title="Error occured"
            description={formState.requestError}
          />
        )}
        <div className="modal-actions">
          <Button
            textOnly
            type="button"
            onClick={() => cartContext.setCheckouted(false)}
          >
            Cancel
          </Button>
          <Button disabled={isPending}>
            {isPending ? "Submiting..." : "Submit Order"}
          </Button>
        </div>
      </form>
    </section>
  );
}
