import express from "express";
const app = express();
// import objject from all the routes and also put the extension at the end of path
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import multer from "multer";
import cors from "cors";
import cookieParser from "cookie-parser";
// import { Users } from "./users.js";
import {db} from "./connect.js";

//middlewares
//to give access to client and server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  // to continue our operrations use next()
  next();
});
// to send or recieve json objects from front end to backend
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
//end point and single file upload and send file name as we are going to store file name in db
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});
//search component
app.get("/", (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.json([]);
  }

  const searchTerm = `%${q.toLowerCase()}%`;

  const query = `
    SELECT * FROM users 
    WHERE name LIKE ? 
    LIMIT 10
  `;

  db.query(query, [searchTerm], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//right side users
//search component
app.get("/users-list", (req, res) => {
  const query = `
    SELECT * FROM users 
    LIMIT 8
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.get("/explore-list", (req, res) => {
  const query = `
    SELECT name,profilePic,id FROM users 
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// basic endpoint for api
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen(8800, () => {
  console.log("API working!");
});
