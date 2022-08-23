const { SoccerPlayer, SoccerTeam } = require("../models/studentsSoccerTeamModel")


const newPlayer = async (req, res) => {
  const newplayer = req.body.player
  const findPlayer = await SoccerPlayer.findOne(
    { player: newPlayer }
  )

  if (!findPlayer) {
    return await SoccerPlayer.create(req.body)
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


const updatePlayerInfo = async (req, res) => {
  const teamPlayer = req.params.player
  const findPlayer = await SoccerPlayer.findOne(
    { player: teamPlayer }
  )

  if (findPlayer) {
    const updatedFields = req.body

    return await SoccerPlayer.updateOne({ player: teamPlayer }, updatedFields)
      .then(result => {
        return res.status(200).json({
          message: "Updated successfully!",
          data: result
        })
      })
      .catch(err => {
        return res.status(400).json({
          message: "Error!",
          data: err
        })
      })
  } else {
    res.json({
      message: "An error occured!"
    })
  }
}


const deletePlayer = async (req, res) => {
  const teamPlayer = req.params.player
  const findPlayer = await SoccerPlayer.findOne(
    { player: newPlayer }
  )

  if (findPlayer) {
    return await SoccerPlayer.deleteOne({ player: teamPlayer })
      .then(result => {
        return res.status(200).json({
          message: "Player deleted successfully!",
          data: result
        })
      })
      .catch(err => {
        return res.status(400).json({
          message: "Error!",
          data: err
        })
      })
  } else {
    res.json({
      message: "An error occured!"
    })
  }
}


const getPlayers = async (req, res) => {
  return await SoccerPlayer.find({})
    .then(result => {
      return res.status(200).json({
        message: "Successful",
        data: result
      })
    })
    .catch(err => {
      return res.status(400).json({
        message: "Error!",
        data: err
      })
    })
}


const getSinglePlayer = async (req, res) => {
  return await SoccerPlayer.findOne({ player: req.params.player })
    .then(result => {
      return res.status(200).json({
        message: "Successful",
        data: result
      })
    })
    .catch(err => {
      return res.status(400).json({
        message: "Error!",
        data: err
      })
    })
}


const updateTeamInfo = async (req, res, next) => {
  const updatedFields = req.body
  
  const up = await SoccerTeam.updateOne({ teamName: req.body.teamName }, updatedFields)
    .then(result => {
      return res.status(200).json({
        message: "Updated successfully!",
        data: result
      })
    })
    .catch(err => {
      return res.status(400).json({
        message: "Error!",
        data: err
      })
    })
  
  return up
}

module.exports = {
  newPlayer,
  updatePlayerInfo,
  deletePlayer,
  updateTeamInfo,
  getPlayers,
  getSinglePlayer
}