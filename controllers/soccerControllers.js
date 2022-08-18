const { SoccerPlayer, SoccerTeam } = require("../models/studentsSoccerTeamModel")


const newPlayer = (req, res) => {
    const newplayer = req.body.player

    const findPlayer = await SoccerPlayer.findOne(
        {player: newPlayer}
    )

    if (!findPlayer) {
        const createPlayer = {
            player: req.body.player,
            picture: req.body.picture,
            age: req.body.age,
            shirtNumber: req.body.shirtNumber,
            position: req.body.position,
            isCaptain: req.body.isCaptain,
            availability: req.captain.availability
        }

        return await SoccerPlayer.create(createPlayer)
        .then(result => {
            return res.status(200).json(
                {
                    message: "New player was added successfully",
                    data: result
                }
            )
        })
        .catch(error => {
            return res.status(400).json(
                {
                    message: "ERROR! Could not register new player",
                    data: error
               })
            })
    } else {
        return res.json(
            {
                message: "ERROR! Could not register new player"
            }
        )
    }
}