import { configureStore } from "@reduxjs/toolkit";
const initia_State = {
  products: [],
  valueOfCategory: [],
  valueOfSize: [],
  valueOfSearch: [],
  inputSearch: [],
  Addproducts: [],
  AddCartData: [],
};
//That is store
const store = configureStore({
  reducer: (state, action) => {
    console.log(state);
    const { type, payload } = action;
    //That is search of navbar
    switch (type) {
      case "let search":
        return {
          ...state,
          valueOfSearch: payload.searchValue,
        };
      //That is category value
      case "category":
        return {
          ...state,
          valueOfCategory: payload.categoryValue,
        };
      //That is size value
      case "size":
        return {
          ...state,
          valueOfSize: payload.sizeValue,
        };
      //That is pass value to addtocart to array of object
      case "let addtocart":
        return {
          ...state,
          products: [...state.products, ...payload.productsData],
        };
      //That is pass value to addtocart to array of object in navbar page
      case "let product":
        console.log(payload.data);

        return {
          ...state,
          Addproducts: [
            ...state.Addproducts.filter((item) => item.id !== payload.data.id),
            { ...payload.data },
          ],
        };
      //That is when we dont want sent data which mistakely selected
      case "let uncheckproduct":
        const { data } = payload;
        console.log(data);
        return {
          ...state,
          Addproducts: [
            ...state.Addproducts.filter((item) => item.id !== data.id),
          ],
        };
      //That is update specific object for specific quantity increase
      case "update_cart":
        const { cartProduct } = payload;
        console.log(cartProduct);
        return {
          ...state,
          products: cartProduct,
        };
      //That is for remove the cart
      case "remove_cart":
        const { removeProduct } = payload;
        return {
          ...state,
          products: [
            ...state.products.filter((item) => item !== removeProduct),
          ],
        };
      default:
        return initia_State;
    }
  },
});
export default store;
