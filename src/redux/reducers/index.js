import { createReducer } from "@reduxjs/toolkit";
import { 
    AddProduct,
    RemoveProduct,
    AddQuantity,
    RemoveQuantity,
    SelectCurrency, 
    LeftImage,
    RightImage,
    TrackCategory,
 } from "../actions";

//The initial state of the app
const initialState = {
    products: {
        items: [],
        currentCategory: "",
        currency: [],
        // totalCount: null
    }
}

//The product reducer
export const ProductReducer = createReducer(initialState.products.items, (builder) => {
    builder
    .addCase(AddProduct, (state, action) => {
        //search the state for the state id of the product addded to cart
        const items = state.find((product) => product.id === action.payload)
        if (items) {
            items.value++; //if found, increase its quantity
        } else {
            state.push(action.payload); //if not, add the the item to state
        }
    })
    .addCase(RemoveProduct, (state, action) => {
    //returns the items in state except the clicked item
    return state.filter(product => product.id !== action.payload)
    })                  
    .addCase(AddQuantity, (state, action) => {
        const itemId = state.find((itemId)=> itemId.id === action.payload)
        if(itemId) {
            itemId.value++;// find the selected items and increase the quantity
        } 
    }) 
    .addCase(RemoveQuantity, (state, action) => {
        const itemId = state.find((itemId)=> itemId.id === action.payload)
        if(itemId && itemId.value > 1) { // checks if the value of the selected item is more than one,
            itemId.value--; //if yes, decrease the quantity by one, else return a list of -
        } else { // items in state except the selected item
                return state.filter(product => product.id !== action.payload)   
        }  
    })
    .addCase(LeftImage, (state, action) => {//finds the selected itema and updates their image index
        const itemId = state.find((itemId)=> itemId.id === action.payload[0])
        itemId.imageSlide = action.payload[1]
    })
    .addCase(RightImage, (state, action) => {
        const itemId = state.find((itemId)=> itemId.id === action.payload[0])
        itemId.imageSlide = action.payload[1]
    })
})

export const CategoryTracker = createReducer(initialState.products.currentCategory, (builder) => {
    builder
    .addCase(TrackCategory, (state, action) => {
        return state = action.payload;
    })
})

export const CurrencyReducer = createReducer(initialState.products.currency, (builder) => {
    builder
    .addCase(SelectCurrency, (state, action) => {
        return state = action.payload;
    })
})
