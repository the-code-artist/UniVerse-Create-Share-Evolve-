import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK USER IF EXISTS
    
  const q = "SELECT * FROM users WHERE username = ?";
// we take username inpute from req.body which will have all the data from frontend
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    // if a valid data of some length is returned then return that user already exists elese it doesnt exist
    if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //Hash the password
    // generate a salat and  then generate hash value of it
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
// insert the user values from front end into databasek
    const q =
      "INSERT INTO users (`id`,`username`,`email`,`password`,`name`) VALUE (?)";
// instead of writing all the values individually..create a values array which will store all the value and pass it as parameter
    const values = [
      req.body.id,  
      req.body.username,
      req.body.email,
    //   store hashed password ...not frontend password
      hashedPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => { 
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};
// check if user is there or not and if there then check if correct password or not and then successfully login

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    //if user exists then check the passowrd...it has two parameteres..present entered parameter and data[0].password(actual user password)
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");
    //if correct password then create a token
    const token = jwt.sign({ id: data[0].id }, "secretkey");
    //send all data excpet password
    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
    // clear the cookie
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};
