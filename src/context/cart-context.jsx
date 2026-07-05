import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  setCheckouted: (value) => {},
  isCheckouted: false,
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

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    isCheckouted: cart.isCheckouted,
    setCheckouted,
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
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
