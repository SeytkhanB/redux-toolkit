import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./components/Modal";
import Loading from "./components/Loading";

export default function App() {
  const { cartItems, isLoading, isError } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="error">
        <h3>Something went wrong</h3>
        <h4>Please try again</h4>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
