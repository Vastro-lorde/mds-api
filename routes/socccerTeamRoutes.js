const router = require("express").Router()
const { newPlayer,
    updatePlayerInfo,
    deletePlayer,
    updateTeamInfo,
    getPlayers,
    getSinglePlayer } = require("../controllers/soccerControllers")
const { auth, idcheck } = require('../middlewares/auth')



// Player routes
router.post("/addplayer", auth, idcheck, newPlayer)
router.put("/updateplayer/:player", auth, idcheck, updatePlayerInfo)
router.delete("/deleteplayer/:player", auth, idcheck, deletePlayer)
router.get("/getallplayers", getPlayers)
router.get("/getSingleplayer/:player", getSinglePlayer)

// Team routes
router.put("/updateTeam_info", auth, idcheck, updateTeamInfo)

module.exports = router