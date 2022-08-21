const router = require("express").Router()
const { newPlayer,
    updatePlayerInfo,
    deletePlayer,
    updateTeamInfo,
    getPlayers,
    getSinglePlayer } = require("../controllers/soccerControllers")
const { auth, idcheck } = require('../middlewares/auth')



// Player routes
router.post("/api/add_player", auth, idcheck, newPlayer)
router.put("/api/update_player/:player", auth, idcheck, updatePlayerInfo)
router.delete("/api/delete_player/:player", auth, idcheck, deletePlayer)
router.get("/api/getAll_players", getPlayers)
router.get("/api/getSingle_player/:player", getSinglePlayer)

// Team routes
router.put("/api/updateTeam_info", auth, idcheck, updateTeamInfo)

module.exports = router