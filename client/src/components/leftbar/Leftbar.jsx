import "./leftBar.scss";
import HouseIcon from '@mui/icons-material/House';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GroupIcon from '@mui/icons-material/Group';
import FlareRoundedIcon from '@mui/icons-material/FlareRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../../context/authContext";
// import { useContext } from "react";
// import React, { useState, useEffect } from "react";
import { useState, useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
const LeftBar = ({ isLeftBarOpen }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const profilePagePath = `/profile/${currentUser.id}`;
  const { toggle, darkMode } = useContext(DarkModeContext);
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };
  const [isOpen, setIsOpen] = useState(isLeftBarOpen);

  useEffect(() => {
    setIsOpen(!isLeftBarOpen);
  }, [isLeftBarOpen]);
  return (
    <div className={`leftBar ${isOpen ? "open" : "closed"}`}>
      <div className="container">
        {/* container 1 */}
        <div className="menu">
          <div className="user">
            <img
              src={"/upload/" + currentUser.profilePic}
              alt="not available"
            />
            <span>@{currentUser.name}</span>
          </div>
        </div>
        {/* container 2 */}
        <div className="menu">
          <div className="item">
            <Link
              to="/explore"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <GroupIcon style={{color:"skyblue"}} />
            </Link>
              <span style={{ fontSize:"20px" }}>Explore</span>
          </div>
        </div>
        {/* contianer break */}
        {/* <hr /> */}
        {/* container 2 */}
        <div className="menu">
          <span>Other shortcuts</span>
          <div className="right">
            <div className="item">
                <Link
                  to={profilePagePath}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <AccountCircleRoundedIcon />
                </Link>
              <span>Profile</span>
            </div>
            <div className="item">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="icon-link"
                >
                  <HouseIcon />
                </Link>
              <span>Home</span>
            </div>
            {/* depending on dark mode value toogle and change present icon */}
            <div className="item">
                {darkMode ? (
                  <FlareRoundedIcon onClick={toggle} style={{ cursor:"pointer" }} />
                ) : (
                  <DarkModeOutlinedIcon onClick={toggle} style={{ cursor:"pointer" }} />
                )}
              <span>Mode</span>
            </div>
          </div>
        </div>
        {/* container 3 */}
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <LogoutIcon onClick={handleLogout} style={{ cursor:"pointer",color:"skyblue" }}/>
            Logout
            {/* Call handleLogout function */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
