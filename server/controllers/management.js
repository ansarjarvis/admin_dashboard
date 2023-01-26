import User from "../models/User.js";
import AffiliateStat from "../models/AffiliateStat.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export let getAdmin = async (req, res) => {
  try {
    let admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export let getPerformance = async (req, res) => {
  try {
    let { id } = req.params;
    let userWithStats = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      {
        $unwind: "$affiliateStats",
      },
    ]);
    let salesTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    let filteredSalesTransactions = salesTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSalesTransactions });
  } catch (error) {
    res.status(404).json({ messagej: error.message });
  }
};
