// basic api testing
// import express from "express";
// const app = express();
// app.listen(5000, () => {
//   console.log("api running successfully!!!");
// });
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

//middlewares
//to give access to client and server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  // to continue our operrations use next()
  next();
});
// to send or recieve json objects from front end to backend
app.use(express.json());
// use cors({origin:"link"}) and also cookieParser();
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
