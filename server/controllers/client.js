import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export let getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    let productsWithStats = await Promise.all(
      products.map(async (product) => {
        let stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export let getcustomers = async (req, res) => {
  try {
    let customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export let getTransactions = async (req, res) => {
  try {
    let { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    let generateSort = () => {
      let sortParsed = JSON.parse(sort);
      let sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    let sortFormatted = Boolean(sort) ? generateSort() : {};

    let transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    let total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
