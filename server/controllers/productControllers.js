import productModel from "../models/product.js";
import userModel from "../models/user.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function addProduct(req, res) {
  console.log(`addProduct initiated`);
  try {
    const sellerId = req.params.id;
    const {
      productName,
      productCategory,
      mrp,
      discount,
      discountedPrice,
      color,
      count,
    } = req.body;

    if (!productName || !productCategory || !mrp || !count) {
      console.log(`Missing product details for user ${sellerId}`);
      return res.status(400).send("Missing product details");
    }

    const user = await userModel.findById(sellerId);

    if (!user) {
      console.log(`user not found for id ${sellerId}`);
      return res
        .status(400)
        .send(`Unable to find user's name for id ${sellerId}`);
    }

    if (!req.file) {
      console.log("Image is required");
      return res.status(400).send("Image is required");
    }

    const image = req.file.buffer;
    const imageType = req.file.mimetype;

    const newProduct = new productModel({
      sellerId: sellerId,
      sellerName: user.name,
      productName: productName,
      productCategory: productCategory,
      mrp: mrp,
      discount: discount,
      discountedPrice: discountedPrice,
      color: color,
      count: count,
      image: image,
      imageType: imageType,
    });

    const result = await newProduct.save();

    console.log(`Product added - ${result}`);
    res.status(200).json(result);
  } catch (error) {
    console.log(`Interal error in addProduct`);
    res.status(400).send(`Internal error in addProduct ${error}`);
  }
}

async function getProducts(req, res) {
  console.log("getproducts initiated");
  try {
    const products = await productModel.find();

    if (!products || products.length === 0) {
      console.log("Currently zero products are listed under this account");
      return res.status(400).send(`No products listed by this seller`);
    }

    res.status(200).send(products);
  } catch (error) {
    console.log(`Interal error in getProduct`);
    res.status(400).send(`Internal error in getProduct ${error}`);
  }
}

async function getProductById(req, res) {
  console.log("getproductbyId initiated");

  try {
    const productId = req.body.productId;
    console.log(productId, typeof productId);

    const product = await productModel.findById(productId);
    if (!product || product.length === 0) {
      console.log(
        `Currently zero products are listed with this id ${productId}`
      );
      return res.status(400).send(`No products listed by seller under this id`);
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(`Internal error in getProductById`);
    res.status(400).send(`Internal error in GetProductById`);
  }
}

async function updateProductDetails(req, res) {
  console.log("updating product details . . .");
  try {
    // const sellerId = req.params.id;
    const {
      productId,
      productName,
      productCategory,
      mrp,
      discount,
      discountedPrice,
      color,
      count,
    } = req.body;

    console.log(req.body);

    const existingProduct = await productModel.findById(productId);

    if (!existingProduct) {
      console.log(" product do not exist ");
      return res.status(400).send("product do not exist");
    }

    existingProduct.productName = productName || existingProduct.productName;
    existingProduct.productCategory =
      productCategory || existingProduct.productCategory;
    existingProduct.mrp = mrp || existingProduct.mrp;
    existingProduct.discount = discount || existingProduct.discount;
    existingProduct.discountedPrice =
      discountedPrice || existingProduct.discountedPrice;
    existingProduct.color = color || existingProduct.color;
    existingProduct.count = count || existingProduct.count;

    if (req.file) {
      existingProduct.image = req.file.buffer;
      existingProduct.imageType = req.file.mimetype;
    }

    const result = await existingProduct.save();

    console.log(`Product details updated ${result}`);
    res.status(200).json(result);
  } catch (error) {
    console.log(`Internal error in updatingproductdetails function ${error}`);
    res
      .status(400)
      .send("Internal error in updatingproductdetails function", error);
  }
}

async function deleteProduct(req, res) {
  try {
    const { productId } = req.body;

    const existingProduct = await productModel.findByIdAndDelete(productId);

    if (!existingProduct) {
      console.log("Product does not exist");
      return res.status(400).send("product does not exist");
    }

    console.log("Product Removed");
    res.status(200).send(`Product ${productId} is removed .`);
  } catch (error) {
    console.log("deleteProduct Internal Error", error);
    res.status(400).send(`Internal Error in deleteProduct ${error}`);
  }
}

export {
  addProduct,
  updateProductDetails,
  deleteProduct,
  getProducts,
  getProductById,
};
