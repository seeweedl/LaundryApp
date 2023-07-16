import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
    },
    reducers:{
        getProduct: (state, action) => {
            state.product.push({...action.payload})
        },
        incrementProduct: (state, action) => {
            const itemPresent = state.product.find((item)=> item.id === action.payload.id)
            itemPresent.quantity++
        },
        decrementProduct:(state, action)=>{
            const itemPresent = state.product.find((item) => item.id === action.payload.id)
            if(itemPresent.quantity == 1){
                itemPresent.quantity = 0
                const removeItem = state.product.filter((item) => item.id !== action.payload.id)
                state.cart = removeItem
            }else{
                itemPresent.quantity--
            }
        }
    }
});

export const {getProduct, incrementProduct, decrementProduct} = productSlice.actions

export default productSlice.reducer
