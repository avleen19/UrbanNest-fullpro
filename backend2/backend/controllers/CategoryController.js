const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { CategoryName } = req.body;

    if (!CategoryName) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const newCategory = await Category.create({ CategoryName });

    res.status(201).json({ message: 'Category created successfully', data: newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { CategoryId } = req.params;
    console.log('Received request to delete category with CategoryId:', CategoryId);  

    const category = await Category.findByPk(CategoryId);
    if (!category) {
      console.log('Category not found in database');
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    console.log('Category successfully deleted');
    return res.json({ message: 'Category deleted successfully' });

  } catch (error) {
    console.error('Error while deleting category:', error);
    return res.status(500).json({ error});
  }
};

exports.updateCategory = async (req, res) => {
  const { CategoryId } = req.params;
  const { CategoryName } = req.body;

  try {
    const category = await Category.findByPk(CategoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.CategoryName = CategoryName || category.CategoryName;
    await category.save();

    res.json({ message: 'Category updated successfully', data: category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

