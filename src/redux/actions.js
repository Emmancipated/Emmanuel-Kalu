import { createAction } from "@reduxjs/toolkit";

//All the actions are created here.
export const AddProduct = createAction('product/addProduct');
export const RemoveProduct = createAction('product/removeProduct');
export const AddQuantity = createAction('product/addQuantity');
export const RemoveQuantity = createAction('product/removeQuantity');
export const LeftImage = createAction('product/slideLeft');
export const RightImage = createAction('product/slideRight');
export const SelectCurrency = createAction('currency/selectCurrency');
export const TrackCategory = createAction('category/selectCategory');
