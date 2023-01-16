import User from "../models/User.js";

export let getUser = async (req, res) => {
  try {
    let { id } = req.params;
    let foundUser = await User.findById(id);
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
