const router = require("express").Router()
const { newPlayer, updatePlayerInfo, deletePlayer, updateTeamInfo } = require("../controllers/soccerControllers")


// Player routes
router.post("/api/add_player", newPlayer)
router.put("/api/update_player/:player", updatePlayerInfo)
router.delete("/api/delete_player/:player", deletePlayer)

// Team routes
router.put("/api/updateTeam_info", updateTeamInfo)
module.exports = router