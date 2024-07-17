import express from "express";
import { getRelationships, addRelationship, deleteRelationship,getFollowedUsers } from "../controllers/relationship.js";

const router = express.Router()

router.get("/", getRelationships)
router.get("/followed", getFollowedUsers) 
router.post("/", addRelationship)
router.delete("/", deleteRelationship)

 
export default router