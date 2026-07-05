import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, ref, cssClasses }) {
  const dialog = useRef();
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
    <dialog ref={dialog} className={"modal" + " " + cssClasses}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
