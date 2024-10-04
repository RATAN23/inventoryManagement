import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateItem } from '../reducers/data';

const MyModal = ({ item, handleClose =() =>{}}) => {
  
    const [category,setCategory] = useState(item.category)
    const [price , setPrice] = useState(item.price);
    const [value , setValue] = useState(item.value);
    const [quantity , setQuantity] = useState(item.quantity);
    const [errorPrice , setErrorPrice] = useState('');
    const [errorQty , setErrorQty] = useState('');
    const dispatch = useDispatch();
    // console.log(category , price);
   
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const calculateValue = (newPrice, newQuantity) => {
      const amt = parseFloat(newPrice.replace(/[^0-9.-]+/g, '')); // Clean up the price string and convert to number
      const qty = parseInt(newQuantity, 10); // Convert quantity to number
      if (!isNaN(amt) && !isNaN(qty)) {
        const newValue = `$${(amt * qty)}`; // Calculate the new value
        setValue(newValue); 
      } else {
        setValue(0);
      }
    };

    const handlePriceChange = (e) => {
      const newPrice = e.target.value;
      if(!Number.isInteger(Number(newPrice)) )
      {
        setErrorPrice("Enter a valid number");
        setPrice('');
        return;
      }
      setErrorPrice('');
      setPrice(e.target.value);
      calculateValue(newPrice, quantity); 
  }

  const handleQuantityChange = (e) => {
    const newQty = e.target.value;
    if(!Number.isInteger(Number(newQty)) )
    {
      setErrorQty("Enter a valid number");
      setQuantity(0);
      return;
    }
    setErrorQty('');
    setQuantity(Number(e.target.value));
    calculateValue(price, newQty); 
  }

  const handleDispatch = () => {
    const prodData = {...item , category , quantity , price , value};
    dispatch(updateItem(prodData));
    handleClose();
  }




  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/70'>
       <div className='w-[500px] h-[370px] bg-[#2C2C2C] border-black rounded-xl'>
         <div className='mt-10 flex'>
            <h1 className='ml-5 text-4xl'>Edit Product</h1>
            <button onClick= {handleClose} className='ml-auto mr-4 mb-2 bg-[#2C2C2C] w-7 text-2xl text-[#d4ff32]'>X</button>
         </div>
         <span className='ml-5 mt-4'>{item.name}</span>
         <div className='m-5 grid grid-cols-2 gap-3'>
            <div className=' flex flex-col'>
              <span>Category</span>
              <input type="text" className='rounded-lg text-gray-200 bg-[#1f1f1f] p-2'  placeholder={category === "" ? "Enter the category" : category} value={category} onChange={handleCategoryChange} ></input>
            </div>
            <div className='flex flex-col'>
            <span>Price</span>
              <input type="text" className='rounded-lg text-gray-200 bg-[#1f1f1f] p-2'  placeholder={price === "" ? "Enter the price" : price} value={price} onChange={(e) => { handlePriceChange(e)}} ></input>
              {
                errorPrice.length > 0 && (
                 <span className='text-red-700 text-sm'>Enter a valid number</span>
                )
              }
            </div>
            <div className='flex flex-col'>
            <span>Quantity</span>
              <input type="text" className='rounded-lg text-gray-200 bg-[#1f1f1f] p-2'  placeholder={quantity === "" ? "Enter the Quantity" : quantity} value={quantity} onChange={handleQuantityChange} ></input>
              {
                errorQty.length > 0 && (
                 <span className='text-red-700 text-sm'>Enter a valid number</span>
                )
              }
            </div>
            <div className='flex flex-col'>
            <span>Value</span>
              <input type="text" className='rounded-lg text-gray-200 bg-[#1f1f1f] p-2'  placeholder={value === "" ? "Enter the value" : quantity} value={value}  ></input>
            </div>
         </div>
         <div className='flex justify-end gap-2 p-4'>
            <button onClick= {handleClose}className='p-2 text-[#d4ff32] bg-[#555555] rounded-md'>Cancel</button>
            <button className='p-2  text-slate-400 bg-[#3d3d3d] rounded-md' onClick={() => handleDispatch()}  >Save</button>
         </div>
       </div>
    </div>
  )
}

export default MyModal
