import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

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
