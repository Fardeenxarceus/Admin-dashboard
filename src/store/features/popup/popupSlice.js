import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: false,
  productDel: false,
  orderDel: false,
  adding: false,
  sEdit: false,
};

const popupSlice = createSlice({
  name: "productPopup",
  initialState,
  reducers: {
    openProductDeletePopup(state, action) {
      state.productDel = action.payload ?? true;
    },
    closeProductDeletePopup(state) {
      state.productDel = false;
    },
    openOrderDeletePopup(state, action) {
      state.orderDel = action.payload ?? true;
    },
    closeOrderDeletePopup(state) {
      state.orderDel = false;
    },

    openOrderPopup(state, action) {
      state.order = action.payload ?? true;
    },
    closeOrderPopup(state) {
      state.order = false;
    },
    openAddingPopup(state, action) {
      state.adding = action.payload ?? true;
    },
    closeAddingPopup(state) {
      state.adding = false;
    },
    openSingleEditPopup(state, action) {
      state.sEdit = action.payload ?? true;
    },
    closeSingleEditPopup(state) {
      state.sEdit = false;
    },
  },
});

export const {
  openOrderPopup,
  closeOrderPopup,
  closeAddingPopup,
  openAddingPopup,
  closeOrderDeletePopup,
  closeProductDeletePopup,
  openOrderDeletePopup,
  openProductDeletePopup,
  closeSingleEditPopup,
  openSingleEditPopup,
} = popupSlice.actions;
export default popupSlice.reducer;
