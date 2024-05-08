import express from "express";
import { getUser , updateUser} from "../controllers/user.js";
// import { getUser} from "../controllers/user.js";

const router = express.Router();

//check the api by sending
// router.get("/test", (req, res) => {
//   res.send("it is working!!");
// });
router.get("/find/:userId", getUser)
router.put("/", updateUser)

export default router;
