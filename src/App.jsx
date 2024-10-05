import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Mycard from "./components/card";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import { fetchData } from "./reducers/data";
import { useDispatch, useSelector } from "react-redux";
import TableData from "./components/table";
import MyModal from "./components/modal";

function App() {
  const products = useSelector(state => state.cart.products);
  const dispatch = useDispatch();

  const amt =  products?.reduce((acc, item) => {
      if (typeof item.value === 'string') {
          const price = parseFloat(item.value.replace(/[^0-9.-]+/g, '')); // Remove non-numeric characters
          if (!isNaN(price)) {
              acc += price; 
          }
      }
      return acc;
  }, 0);
    


  const count = products?.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = true; 
      acc.count++;               
    }
    return acc;
  }, {count: 0 }).count;

  const outofStock = products?.reduce((acc ,item) => {
        if(item.quantity === 0){
          acc++;
        }
        return acc;
    }, 0);

    const categoryCount =products?.reduce((acc, item) => {
        if(!acc[item.category]){
          acc[item.category] = true;
          acc.count++;
        }
        return acc;
    },{count : 0}).count;

  useEffect(() => {
    dispatch(fetchData());
  },[])

  return (
    <>
      <div className="h-screen bg-black flex flex-col text-white">
        <Navbar />
        <div className="ml-5 flex flex-col gap-2">
          <h1 className="text-6xl">Inventory Stats</h1>
          <div className="flex gap-3">
            <Mycard icon = {<ShoppingCartIcon/>} title = "Total products" value = {count}/>
            <Mycard icon = {<MonetizationOnIcon/>} title = "Total Store Value" value = {amt}/>
            <Mycard icon = {<RemoveShoppingCartIcon/>} title = "Out of stock" value = {outofStock}/>
            <Mycard icon = {<CategoryIcon/>} title = "No of Category" value = {categoryCount}/>
          </div>
          <TableData/>
        </div>
      </div>
    </>
  );
}

export default App;
