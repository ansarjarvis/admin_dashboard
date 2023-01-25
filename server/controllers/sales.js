import OverallStat from "../models/OverallStat.js";

export let getSales = async (req, res) => {
  try {
    let overallStats = await OverallStat.find({});
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
