import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  setCheckouted: (value) => {},
  isCheckouted: false,
  submitContext: () => {},
});

function cartReducer(state, action) {
  let updatedItems = [...state.items];
  if (action.type === "ADD_ITEM") {
    let existingItemIndex = state.items.findIndex(
      (i) => i.id === action.item.id,
    );

    if (existingItemIndex > -1) {
      let item = state.items[existingItemIndex];
      item = { ...item, quantity: item.quantity + 1 };
      updatedItems[existingItemIndex] = item;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    let existingItemIndex = state.items.findIndex((i) => i.id === action.id);
    let item = state.items[existingItemIndex];
    if (item.quantity > 1) {
      item = { ...item, quantity: item.quantity - 1 };
      updatedItems[existingItemIndex] = item;
    } else {
      updatedItems = updatedItems.filter((i) => i.id !== item.id);
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "CHECKOUT") {
    return { ...state, isCheckouted: action.value };
  }

  if (action.type === "SUBMIT") {
    return {
      items: [],
      isCheckouted: false,
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: JSON.parse(localStorage.getItem("items")) ?? [],
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cart.items));
  }, [cart.items]);

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    isCheckouted: cart.isCheckouted,
    setCheckouted,
    submitContext,
  };

  function setCheckouted(value) {
    dispatchCartAction({ type: "CHECKOUT", value });
  }

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function submitContext() {
    dispatchCartAction({ type: "SUBMIT" });
  }
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
