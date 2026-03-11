import { useDispatch, useSelector } from "react-redux";
import { closeProductDeletePopup } from "../../store/features/popup/popupSlice";
import { deleteData } from "../../store/features/product/productThunk";
import { useNavigate } from "react-router-dom";

function DeleteProductModal() {
  const popup = useSelector((state) => state.popup.productDel);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!popup) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete this product?</h3>

        <p className="py-4">This action cannot be undone.</p>

        <div className="modal-action">
          <button
            className="btn"
            onClick={() => dispatch(closeProductDeletePopup())}
          >
            Cancel
          </button>

          <button
            className="btn btn-error"
            onClick={() => {
              dispatch(deleteData(popup));
              dispatch(closeProductDeletePopup());
              navigate("/products");
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
