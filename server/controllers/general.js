import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export let getUser = async (req, res) => {
  try {
    let { id } = req.params;
    let foundUser = await User.findById(id);
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export let getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    let currentMonth = "November";
    let currentYear = 2021;
    let currentDay = "2021-11-15";

    /* Recent Transactions */
    let transations = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Transactions */
    let overallStat = await OverallStat.find({ year: currentYear });

    let {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    let thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });
    let todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });
    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transations,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
