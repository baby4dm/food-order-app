import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./context/cart-context";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
