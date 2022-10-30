import { clearCart } from "../Features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";
import { useDispatch } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            type="button"
          >
            confirm
          </button>
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
            className="btn clear-btn"
            type="button"
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
