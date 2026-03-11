import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { editData, postData } from "../../store/features/product/productThunk";
import { closeSingleEditPopup } from "../../store/features/popup/popupSlice";

function ProductModal() {
  const { loading } = useSelector((state) => state.product);
  const popup = useSelector((state) => state.popup.sEdit);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    info: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      toast.error("Please fill all required fields");
      return;
    }

    if (popup?.id) {
      dispatch(editData({ id: popup.id, details: formData }));
    } else {
      dispatch(
        postData({
          ...formData,
          createdAt: new Date().toISOString(),
        }),
      );
    }

    // Reset form
    setFormData({
      name: "",
      price: "",
      image: "",
      info: "",
    });

    // Close modal
    dispatch(closeSingleEditPopup());
  };

  // Fill form when editing
  useEffect(() => {
    if (popup?.id) {
      setFormData({
        name: popup.name || "",
        price: popup.price || "",
        image: popup.image || "",
        info: popup.info || "",
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
          {popup?.id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
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
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleChange}
          />

          {/* Image */}
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
              onClick={() => dispatch(closeSingleEditPopup())}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : popup?.id
                  ? "Update Product"
                  : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
