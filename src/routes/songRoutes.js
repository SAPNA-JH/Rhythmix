const express = require("express");
const {getAllSongs, recommendSongs, searchSongs, playSong} = require("../controller/songsController");
const verifyToken = require("../middleware/authMiddleware");


const router = express.Router();

router.get("/", getAllSongs);
router.get("/recommend", recommendSongs)
router.get("/search", searchSongs)
router.post("/play/:id",verifyToken, playSong);


module.exports = router;
