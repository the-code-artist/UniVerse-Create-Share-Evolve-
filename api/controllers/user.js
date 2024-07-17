import { db } from "../connect.js";
import jwt from "jsonwebtoken";
//export the funtion
export const getUser = (req, res) => {
  const q = "SELECT * FROM users WHERE id=?";
  const userId = req.params.userId;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    // take all data into from data[0] into info except password and send it to front end
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { name, city, website, coverPic, profilePic } = req.body;
    let updateFields = [];
    let values = [];

    if (name) {
      updateFields.push("`name`=?");
      values.push(name);
    }
    if (city) {
      updateFields.push("`city`=?");
      values.push(city);
    }
    if (website) {
      updateFields.push("`website`=?");
      values.push(website);
    }
    if (coverPic) {
      updateFields.push("`coverPic`=?");
      values.push(coverPic);
    }
    if (profilePic) {
      updateFields.push("`profilePic`=?");
      values.push(profilePic);
    }

    // Add user id to the values array for the WHERE clause
    values.push(userInfo.id);

    // Construct the SQL query
    const q = `UPDATE users SET ${updateFields.join(', ')} WHERE id=?`;
    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json(err.message);
      }
    
      // console.log("Query result:", data); // Check the structure of the data object
      const updatedUser = { ...userInfo, ...req.body }; // Assuming userInfo contains existing user details
      return res.json(updatedUser);
    });
  });
};
