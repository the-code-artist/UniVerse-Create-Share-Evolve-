import "./explore.scss";
import axios from "axios";
import { useState,useEffect } from "react";
import Table from "./Table";
const RightBar = () => {
  // const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/explore-list`);
      setData(res.data);
    };
    fetchData()
  });
  return (
    <div className="rightBar">
      {<Table data={data} />}
    </div>
  );
};

export default RightBar;