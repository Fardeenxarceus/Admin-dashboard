import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder,deleteOrder, editOrder, postOrder } from "./orderThunk";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      // FETCH
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Unable to fetch ❗");
      })

      // ADD order
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        toast.success("order placed successfully ✅");
      })
      .addCase(postOrder.rejected, () => {
        toast.error("Unable to add order ❗");
      })

      // EDIT order
      .addCase(editOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        toast.success("order edited successfully ✅");
      })
      .addCase(editOrder.rejected, () => {
        toast.error("Unable to edit ❗");
      })

      // DELETE order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (item) => item.id !== action.payload,
        );
        toast.success("order deleted successfully ✅");
      })
      .addCase(deleteOrder.rejected, () => {
        toast.error("Unable to delete ❗");
      });
  },
});

export default orderSlice.reducer;

export const {} = orderSlice.actions;
