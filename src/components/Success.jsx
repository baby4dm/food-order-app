import { useEffect } from "react";

export default function Success({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  });

  return <h2>Thank you for your order!</h2>;
}
