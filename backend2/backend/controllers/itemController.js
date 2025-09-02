const Item = require('../models/items');
const Category = require('../models/Category'); 
const Product = require('../models/Product');  

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll({
            include: [
                {
                    model: Category, 
                    attributes: ['CategoryId', 'CategoryName']
                },
                {
                    model: Product, 
                    attributes: ['ProductId', 'ProductName', 'UnitPrice']
                }
            ]
        });
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);  
        res.status(500).json({ error: error.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                    attributes: ['CategoryId', 'CategoryName']
                },
                {
                    model: Product, 
                    attributes: ['ProductId', 'ProductName', 'UnitPrice']
                }
            ]
        });
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createItem = async (req, res) => {
    try {
        const { CategoryId, ProductId, ItemName, Description, UnitPrice, Quantity, Qty_Reorder, ImageURL } = req.body;
        
        console.log("ProductId:", ProductId);
        
        const category = await Category.findByPk(CategoryId);
        const product = await Product.findByPk(ProductId);

        if (!category) {
            return res.status(400).json({ message: 'Invalid CategoryId' });
        }

        if (!product) {
            return res.status(400).json({ message: 'Invalid ProductId' });
        }
        const newItem = await Item.create({
            ItemName,
            Description,
            UnitPrice,
            Quantity,
            Qty_Reorder,
            ImageURL,
            CategoryId,
            ProductId
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error:", error); 
        res.status(400).json({ error: error.message });
    }
};


exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        const { CategoryId, ProductId, ItemName, Description, UnitPrice, Quantity, Qty_Reorder, ImageURL } = req.body;

        // Validate Category and Product
        const category = await Category.findByPk(CategoryId);
        const product = await Product.findByPk(ProductId);

        if (!category) {
            return res.status(400).json({ message: 'Invalid CategoryId' });
        }

        if (!product) {
            return res.status(400).json({ message: 'Invalid ProductId' });
        }

        await item.update({
            ItemName,
            Description,
            UnitPrice,
            Quantity,
            Qty_Reorder,
            ImageURL,
            CategoryId,
            ProductId
        });

        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.destroy();
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
