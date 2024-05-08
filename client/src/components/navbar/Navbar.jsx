import "./navbar.scss";
//import icons from material ui
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from '@mui/icons-material/Menu';
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
//other importing
import { Link } from "react-router-dom";
import { useState,useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
// import React, { useState } from 'react';
// import LeftBar from "../leftbar/Leftbar";
const Navbar = ({ toggleLeftBar })=> {
  // use both toggle and darkmode from darkmodecontext
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser,logout } = useContext(AuthContext);
  const profilePagePath = `/profile/${currentUser.id}`;
  // State for dropdown menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isLeftBarOpen, setIsLeftBarOpen] = useState(true);

  // const toggleLeftBar = () => {
  //   setIsLeftBarOpen(!isLeftBarOpen);
  // };

  // Function to toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };
  return (
    <div className="navbar">
      {/* left section */}
      <div className="left">
      {/* <button className="toggle-left-bar-btn" onClick={toggleLeftBar}> */}
        <MenuIcon onClick={toggleLeftBar}></MenuIcon>
      {/* </button> */}
      {/* <LeftBar isLeftBarOpen={isLeftBarOpen} /> */}
        {/* <Link to="/" style={{ textDecoration: "none" }}> */}
        <span>lamasocial</span>
        {/* </Link> */}
        {/* <GridViewOutlinedIcon /> */}
        {/* search space...create  an icon and then input section which is of type text and default placeholder is search.... */}
        {/* <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>
      {/* right side section */}
      <div className="right">
        <Link to={profilePagePath} style={{ textDecoration: "none",color:"inherit" }}>
          <PersonOutlinedIcon />
        </Link>
        {/* <EmailOutlinedIcon /> */}
        {/* <NotificationsOutlinedIcon /> */}
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
          className="icon-link"
        >
          <HomeOutlinedIcon />
        </Link>
        {/* depending on dark mode value toogle and change present icon */}
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <div className="user" onClick={toggleDropdown}>
          <img
            // src={"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"}
            src={"/upload/" + currentUser.profilePic}
            alt="check"
          />
          <span>{currentUser.name}</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button> {/* Call handleLogout function */}
              <button>Update Profile Pic</button> {/* Add functionality to update profile pic */}
            </div>
          )}
          {/* <span>Pavan</span> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
