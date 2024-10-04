import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("fetchitems", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    return response?.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const dataSlicer = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    updateItem(state, action) {
      const { name, ...updatedData } = action.payload;
      const prodIndex = state.products.findIndex((item) => item.name === name);
      if (prodIndex !== -1) {
        state.products[prodIndex] = {
          ...state.products[prodIndex],  
          ...updatedData,              
        };
      }
    },
    deleteItem(state, action){
        const name = action.payload;
        state.products = state.products.filter((x) => x.name != name); 
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.products = action.payload;
    }),
      builder.addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { updateItem ,deleteItem } = dataSlicer.actions;
export default dataSlicer.reducer;
