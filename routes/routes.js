import express from "express";
import { Register, Login, Logout } from "../controllers/controller_auth.js";
import { getUsers, getUserById } from "../controllers/controller_user.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/controller_refreshtoken.js";
import { getAllEvents, getEventById } from "../controllers/controller_event.js";
import { getRatings, getRatingById, postRating, deleteRating, getRatingsByEventId, getRatingsByUserId } from "../controllers/controller_rating.js";
import { getUserLikes, postUserLike, deleteUserLike } from "../controllers/controller_user_like.js";
import { getRecResults } from "../controllers/controller_recommendation_result.js";

const router = express.Router();

// Authentication Routes
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.post('/logout', Logout);

// User Routes
router.get('/users', getUsers);
router.get('/users/:id', getUserById);

// Events Routes
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);

// Ratings Routes
router.get("/ratings", getRatings);
router.get("/ratings/:id", getRatingById);
router.get("/events/:event_id/ratings", getRatingsByEventId);
router.get("/users/:user_id/ratings", getRatingsByUserId);
router.post("/ratings", verifyToken, postRating);
router.delete("/ratings/:id", verifyToken, deleteRating);

// User Likes Routes
router.get("/users/:user_id/likes", getUserLikes);
router.post("/users/:user_id/likes", verifyToken, postUserLike);
router.delete("/users/:user_id/likes/:event_id", verifyToken, deleteUserLike);

// Recommendation Results Routes
router.get("/users/:user_id/recommendation-results", getRecResults);

export default router;
