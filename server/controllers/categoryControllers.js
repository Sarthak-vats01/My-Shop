import productModel from "../models/product.js";

async function getFashion(req, res) {
  console.log("Starting getFashion");
  try {
    const products = await productModel.find({ productCategory: "Fashion" });

    if (!products || products.length === 0) {
      console.log("Sorry There are no products of this category");
      // return res.status(400).send("Products Unavailable");
    }

    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getFashion");
    res.status(400).json("Error in getFashion");
  }
}
async function getElectronics(req, res) {
  console.log("Fetching Electronic product");
  try {
    const products = await productModel.find({
      productCategory: "Electronics",
    });

    if (!products || products.length === 0) {
      console.log("Sorry There are no products of this category");
      //return res.status(400).send("Products Unavailable");
    }

    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getElectronics");
    res.status(400).json("Error in getElectronics");
  }
}
async function getFurniture(req, res) {
  try {
    const products = await productModel.find({ productCategory: "Furniture" });

    if (!products || products.length === 0) {
      console.log("Sorry There are no products of this category");
      //return res.status(400).send("Products Unavailable");
    }

    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getFurniture");
    res.status(400).json("Error in getFurniture");
  }
}

export { getFashion, getElectronics, getFurniture };
