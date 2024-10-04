import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Mycard = ({icon = '' , title='' , value = 0}) => {
  return (
    <div className='bg-[#1f4014] md:w-[350px] w-[200px] max-w-[350px] h-[130px] text-white rounded-xl flex flex-col justify-center text-nowrap'>
      <div className='ml-3 flex items-center gap-4'>
        {icon}
        <span className='text-2xl'>{title}</span>
      </div>
      <span className='ml-14 text-3xl'>{value}</span>
    </div>
  )
}

export default Mycard
