import { use } from "react";
import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../context/cart-context";

export default function Modal({ children, ref, cssClasses = "" }) {
  const dialog = useRef();
  const cartContext = use(CartContext);
  useImperativeHandle(ref, () => {
    return {
      openModal() {
        dialog.current.showModal();
      },

      closeModal() {
        dialog.current.close();
      },
    };
  });
  return createPortal(
    <dialog
      ref={dialog}
      className={"modal" + " " + cssClasses}
      onClose={() => cartContext.setCheckouted(false)}
    >
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
