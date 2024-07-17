import "./navbar.scss";
//import icons from material ui]
import MenuIcon from '@mui/icons-material/Menu';
//other importing
import Share from "../../components/share/Share"
import { useState,useContext,useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Table from "./Table";
import axios from "axios";
const Navbar = ({ toggleLeftBar })=> {
  // use both toggle and darkmode from darkmodecontext
  const { currentUser } = useContext(AuthContext);
  const [share, setOpenShare] = useState(false);
  //search component
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 0) fetchData();
  }, [query]);
  return (
    <div className="navbar">
      {/* left section */}
      <div className="left">
        <MenuIcon onClick={toggleLeftBar}></MenuIcon>
      </div>
      {/* right side section */}
      <div className="center">
        <div className="searchbar">
          <input
              className="search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
          {query && <Table data={data} />}
        </div>
      </div>
      <div className="right">
      <button onClick={() => setOpenShare(true)}>
        Create
        </button>
        
        <div className="user">
          <img
            // src={"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"}
            src={"/upload/" + currentUser.profilePic}
            alt="check"
          />
          <span>{currentUser.name}</span>
          {/* {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
              <button>Update Profile Pic</button>
            </div>
          )} */}
          {/* <span>Pavan</span> */}
        </div>
      </div>
      {share && <Share setOpenShare={setOpenShare}/>}
    </div>
  );
};

export default Navbar;
