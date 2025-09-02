const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { verifyToken, onlyAdmin } = require('../middleware/authMiddleware');


router.get('/', categoryController.getCategories);
router.post('/', verifyToken, onlyAdmin, categoryController.createCategory);
router.put('/:CategoryId', verifyToken, onlyAdmin, categoryController.updateCategory);
router.delete('/:CategoryId', verifyToken, onlyAdmin, categoryController.deleteCategory);


module.exports = router;
