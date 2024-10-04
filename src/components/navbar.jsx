import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../reducers/admin";
import Switch from "@mui/material/Switch";

const Navbar = () => {
  const isAdmin = useSelector((state) => state.admin.value);
  const dispatch = useDispatch();

  return (
    <div className="flex ml-auto m-5 text-white">
      <div className="justify-center items-center">
        <span>admin</span>
        <Switch onChange={() => dispatch(toggle())}
          sx={{
            '& .MuiSwitch-switchBase': {
              color: 'gray', // Thumb color when unchecked
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#25680F', // Thumb color when checked
            },
            '& .MuiSwitch-track': {
              backgroundColor: 'gray', // Track color when unchecked
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#25680F', // Track color when checked
            },
          }}
        />
        <span>user</span>
      </div>
    </div>
  );
};

export default Navbar;
