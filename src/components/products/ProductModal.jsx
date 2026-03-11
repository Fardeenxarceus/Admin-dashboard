import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  editData,
  fetchSingleProduct,
  postData,
} from "../../store/features/product/productThunk";
import { closeAddingPopup } from "../../store/features/popup/popupSlice";

function ProductModal() {
  const { products, loading, error } = useSelector((state) => state.product);
  const popup = useSelector((state) => state.popup.adding);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    info: "",
  });

  // handling input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // handling form field
    if (!formData.name || !formData.price || !formData.image) {
      toast.error("Please fill all required fields");
      return;
    }

    // handling async tasks
    if (popup.id) {
      dispatch(editData({ id: popup.id, details: formData }));
    } else {
      dispatch(postData({ ...formData, createdAt: new Date().toISOString() }));
    }

    // emptying form field after submitting
    setFormData({
      name: "",
      price: "",
      image: "",
      info: "",
    });
    // closing modal
    dispatch(closeAddingPopup());
  };

  // for editing product card
  useEffect(() => {
    if (popup.id) {
      setFormData({
        ...formData,
        name: popup.name,
        price: popup.price,
        image: popup.image,
        info: popup.info,
      });
    } else {
      setFormData({
        name: "",
        price: "",
        image: "",
        info: "",
      });
    }
  }, [popup]);

  if (!popup) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {popup.id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Price */}
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleChange}
          />

          {/* Image URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="input input-bordered w-full"
            value={formData.image}
            onChange={handleChange}
          />

          {/* Info */}
          <textarea
            name="info"
            placeholder="Product Info"
            className="textarea textarea-bordered w-full"
            value={formData.info}
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => dispatch(closeAddingPopup())}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Adding..."
                : popup.id
                  ? "Edit Product"
                  : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
