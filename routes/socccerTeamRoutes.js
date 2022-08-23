const router = require("express").Router()
const { newPlayer,
    updatePlayerInfo,
    deletePlayer,
    updateTeamInfo,
    getPlayers,
    getSinglePlayer } = require("../controllers/soccerControllers")
const { staffAuth, idcheck } = require('../middlewares/auth')



// Player routes
router.post("/addplayer", staffAuth, idcheck, newPlayer)
router.put("/updateplayer/:player", staffAuth, idcheck, updatePlayerInfo)
router.delete("/deleteplayer/:player", staffAuth, idcheck, deletePlayer)
router.get("/getallplayers", getPlayers)
router.get("/getSingleplayer/:player", getSinglePlayer)

// Team routes
router.put("/updateTeam_info", staffAuth, idcheck, updateTeamInfo)

module.exports = router