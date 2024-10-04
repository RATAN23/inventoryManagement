import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import MyModal from './modal';
import { deleteItem } from '../reducers/data';

export const tableHeaders = ['Name', 'Category', 'Price', 'Quantity', 'Value', 'ACTION'];

const TableData = () => {
    const isAdmin = useSelector(state => state.admin.value);
    const data = useSelector(state => state.cart.products);
    const dispatch = useDispatch();
    const [modalData, setModalData] = useState([]);
    const [isModelOpen, setModalOpen] = useState(false);
    const [editable, setEditable] = useState({}); 

    const openModal = (val, index) => {
        setModalData({ ...val, index });
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const handleDeleteItem = (name) => {
        dispatch(deleteItem(name));
    }

    const handleVisibility = (val) => {
        setEditable(prev => ({
            ...prev,
            [val.name]: !prev[val.name] 
        }));
    }

    const handleEditItem = (val) => {
        if (editable[val.name]) {
            openModal(val);
        }
    }
    
    return (
        <div className='mt-3 mr-3'>
            <table className='table-auto border-black border-collapse'>
                <thead className='bg-gray-300'>
                    <tr>
                        {
                            tableHeaders.map((x, index) => (
                                <th className="border-black border-b-2 px-20 py-5 text-left bg-[#090d07] text-[#43812e]" key={index}>{x}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((x, index) => (
                            <tr key={index} className='border-white/20 border-b-2  bg-slate-800 text-white'>
                                <td className='px-20 py-5 text-left'>{x.name}</td>
                                <td className='px-20 py-2 text-left'>{x.category}</td>
                                <td className='px-20 py-2 text-left'>{x.price}</td>
                                <td className='px-20 py-2 text-left'>{x.quantity}</td>
                                <td className='px-20 py-2 text-left'>{x.value}</td>
                                <td className='px-20 py-2 text-left'>
                                    <div className='flex space-x-2'>
                                        <EditIcon 
                                            color={!isAdmin || !editable[x.name] ? "disabled" : "success"} 
                                            onClick={() => {
                                                isAdmin && editable[x.name] ? handleEditItem(x) : '';
                                            }} 
                                        />
                                        <VisibilityIcon 
                                            color={!isAdmin ? "disabled" : editable[x.name] ? "inherit" : "error"} 
                                            onClick={() => {
                                                isAdmin && handleVisibility(x);
                                            }} 
                                        />
                                        <DeleteIcon 
                                            color={!isAdmin || !editable[x.name] ? "disabled" : "error"}  
                                            onClick={() => {
                                                isAdmin && editable[x.name] ? handleDeleteItem(x.name) : '';
                                            }} 
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {isModelOpen && (
                <MyModal
                    item={modalData}
                    handleClose={closeModal}
                />
            )}
        </div>
    )
}

export default TableData;
