const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['Categoryid', 'CategoryName'] }],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { ProductName, ProductDescription, UnitPrice, Quantity, Qty_Reorder, CategoryId, ImageURL } = req.body;
    if (!ProductName || !UnitPrice || !Quantity || !Qty_Reorder || !CategoryId) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const category = await Category.findByPk(CategoryId);
    if (!category) {
      return res.status(400).json({ error: "Invalid CategoryId" });
    }

    const newProduct = await Product.create({
      ProductName, ProductDescription, UnitPrice, Quantity, Qty_Reorder, ImageURL, CategoryId,
    });

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const { ProductName, ProductDescription, UnitPrice, Quantity, Qty_Reorder, CategoryId, ImageURL } = req.body;
    const category = await Category.findByPk(CategoryId);
    if (!category) return res.status(400).json({ error: "Invalid CategoryId" });

    Object.assign(product, {
      ProductName, ProductDescription, UnitPrice, Quantity, Qty_Reorder, ImageURL, CategoryId,
    });

    await product.save();
    res.json({ message: "Product updated successfully", data: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Product delete requested for ID:", id);

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
