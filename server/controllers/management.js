import User from "../models/User.js";

export let getAdmin = async (req, res) => {
  try {
    let admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
