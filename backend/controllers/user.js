const db = require("../database/models");
const { user } = db.sequelize.models;

//Get User details
const getUser = async (req, res) => {
  try {
    const theUser = await user.findOne({ where: { id: req.user_id } });
    if (req.user_id !== theUser.id) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      return res.status(200).json({ name: theUser.name, email: theUser.email });
    }
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

//Update Username
// const updateUsername

//Delete user Account
// const deleteUser

//Reset Password
//User clicks reset password, reset link sent to mail (jwt is encrypted and attched as a query param), link expires in 15mins
//User cannot click reset password until reset link expires
//After password reset, link expires

module.exports = {
  getUser,
};
