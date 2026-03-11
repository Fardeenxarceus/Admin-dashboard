import { useDispatch, useSelector } from "react-redux";
import {
  closeOrderDeletePopup,
} from "../../store/features/popup/popupSlice";
import { deleteOrder } from "../../store/features/order/orderThunk";

function DeleteOrderModal() {
  const popup = useSelector((state) => state.popup.orderDel);
  const dispatch = useDispatch();
  if (!popup) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete this Order?</h3>

        <p className="py-4">This action cannot be undone.</p>

        <div className="modal-action">
          <button
            className="btn"
            onClick={() => dispatch(closeOrderDeletePopup())}
          >
            Cancel
          </button>

          <button
            className="btn btn-error"
            onClick={() => {
              dispatch(deleteOrder(popup));
              dispatch(closeOrderDeletePopup());
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteOrderModal;
