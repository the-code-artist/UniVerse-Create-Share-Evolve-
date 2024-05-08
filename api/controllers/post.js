import {db}from "../connect.js";
// import jwt to use cookie for getting our user info for getting our posts
import jwt from "jsonwebtoken";
import moment from "moment";
export const getPosts=(req,res)=>{
  const userId = req.query.userId;
  //get the user accesstoken and if not there then it means user didnt login
  const token=req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  //if there then validate token according to secret key and check if any error is there
  //we get user information object from auth.js of controller when we created token and we can access in it using dot operator
  jwt.verify(token, "secretkey", (err, userInfo) => {
  if (err) return res.status(403).json("Token is not valid!");
  // console.log("Decoded user information:", userInfo);
  // const q=`SELECT p.*, u.id AS userId, name, profilePic 
  // FROM posts AS p 
  // JOIN users AS u ON u.id = p.userId 
  // LEFT JOIN relationships AS r ON (p.userId = r.followedUserId OR p.userId = r.followerUserId)
  // WHERE r.followerUserId = ? OR r.followedUserId = ?
  // GROUP BY p.id
  // ORDER BY p.createdAt DESC `; 
  
  //   we need everything from posts table but only need id,name and profile pic from users
  // specifu u.id as user id as id also exists in posts table
  // on---return only based on join condition
  //also join relationships table so that we display only our posts and following posts
  // ? is fetched by our user id
  //followed=logged in user id and follower=logged in used subscribed posts
  // const q = 
  //   `SELECT p.*, u.id AS userId, u.name, u.profilePic
  //   FROM posts AS p
  //   JOIN users AS u ON u.id = p.userId
  //   LEFT JOIN relationships AS r ON (u.id = r.followedUserId OR u.id = r.followerUserId)
  //   WHERE p.userId = ? OR r.followedUserId = ?
  //   GROUP BY p.id
  //   ORDER BY p.createdAt DESC;
  //   `;
  const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;
    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

  // console.log(userId)
  // db.query(q,(err,data)=>{
  //   if(err)return res.status(500).json(err.message);
  //   return res.status(200).json(data);
  // })


      db.query(q, values, (err, data) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json(err.message);
        }
        return res.status(200).json(data);
      });
})
}
export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id, 
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
}; 
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
//id--post id and userid is users id and req.params contain post info
    const q =
      "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });
};





