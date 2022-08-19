const router = require("express").Router()
const { newPlayer, updatePlayerInfo, deletePlayer } = require("../controllers/soccerControllers")


router.post("/add_player", newPlayer)
router.put("/update_player", updatePlayerInfo)
router.delete("/delete_player", deletePlayer)

module.exports = router