import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../api/ProductApi';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../api/CategoryApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminProductList.css';

const AdminProductList = () => {
  // State for Products and Categories
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // States for new product and editing product
  const [newProduct, setNewProduct] = useState({
    ProductName: '',
    ProductDescription: '',
    UnitPrice: '',
    Quantity: '',
    Qty_Reorder: '',
    CategoryId: '',
    ImageURL: '',
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  // States for categories
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  // State for Stripe receipts
  const [receipts, setReceipts] = useState([]);
  const [loadingReceipts, setLoadingReceipts] = useState(true);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch Stripe payment receipts from stored session IDs in localStorage
  const fetchReceipts = async () => {
  const sessionIds = JSON.parse(localStorage.getItem('session_ids') || '[]');
  const fetchedReceipts = [];

  if (sessionIds.length === 0) {
    setLoadingReceipts(false);
    return;
  }

  for (const sessionId of sessionIds) {
    try {
      const { data } = await axios.get(
        `http://localhost:5001/api/stripe/checkout-session?sessionId=${sessionId}`
      );
      fetchedReceipts.push(data);
    } catch (error) {
      console.error('Error fetching session', sessionId, error);
    }
  }

  setReceipts(fetchedReceipts);
  setLoadingReceipts(false);
};

  // Initial data fetch
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchReceipts();
  }, []);

  // Handlers for products
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        UnitPrice: parseFloat(newProduct.UnitPrice),
        Quantity: parseInt(newProduct.Quantity),
        Qty_Reorder: parseInt(newProduct.Qty_Reorder),
        CategoryId: parseInt(newProduct.CategoryId),
      };
      const res = await addProduct(payload);
      setProducts([...products, res.data.product]);
      toast.success('Product added!');
      setNewProduct({
        ProductName: '',
        ProductDescription: '',
        UnitPrice: '',
        Quantity: '',
        Qty_Reorder: '',
        CategoryId: '',
        ImageURL: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error adding product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      await deleteProduct(productId);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting product');
    }
  };

  const handleEditProductClick = (product) => {
    setEditProductId(product.ProductId);
    setEditedProduct({ ...product });
  };

  const handleUpdateProduct = async () => {
    try {
      const payload = {
        ...editedProduct,
        UnitPrice: parseFloat(editedProduct.UnitPrice),
        Quantity: parseInt(editedProduct.Quantity),
        Qty_Reorder: parseInt(editedProduct.Qty_Reorder),
        CategoryId: parseInt(editedProduct.CategoryId),
      };
      const res = await updateProduct(editProductId, payload);
      setProducts(
        products.map((p) =>
          p.ProductId === editProductId ? res.data.data : p
        )
      );
      toast.success('Product updated');
      setEditProductId(null);
      setEditedProduct({});
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error updating product');
    }
  };

  // Handlers for categories
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await createCategory({ CategoryName: newCategoryName });
      setCategories([...categories, res.data.data]);
      toast.success('Category added');
      setNewCategoryName('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error adding category');
    }
  };

  const handleEditCategory = (category) => {
    setEditCategoryId(category.Categoryid);
    setEditedCategoryName(category.CategoryName);
  };

  const handleUpdateCategory = async (id) => {
    try {
      const res = await updateCategory(id, { CategoryName: editedCategoryName });
      setCategories(
        categories.map((cat) =>
          cat.Categoryid === id ? res.data.data : cat
        )
      );
      toast.success('Category updated');
      setEditCategoryId(null);
      setEditedCategoryName('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error updating category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;

    try {
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat.Categoryid !== id));
      toast.success('Category deleted');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error deleting category');
    }
  };

  return (
    <div className="admin-container">
      <ToastContainer />
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* Receipts Section */}
      <section className="admin-section">
        <h1>Past Payment Receipts</h1>
        {loadingReceipts ? (
          <div>Loading receipts...</div>
        ) : (
          receipts.map(({ session, paymentIntent }, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #ccc',
                marginBottom: '1rem',
                padding: '1rem',
              }}
            >
              <p>
                <strong>Customer:</strong>{' '}
                {session.customer_details?.name || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                {session.customer_details?.email || 'N/A'}
              </p>
              <p>
                <strong>Payment Status:</strong> {paymentIntent.status}
              </p>
              <p>
                <strong>Total Paid:</strong> ₹
                {(paymentIntent.amount / 100).toFixed(2)}
              </p>
              <ul>
                {session.line_items?.data.map((item, i) => (
                  <li key={i}>
                    {item.quantity} x {item.description} - ₹
                    {(item.amount_total / 100).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>

      {/* CATEGORY SECTION */}
      <section className="admin-section">
        <h3>Add Category</h3>
        <form className="add-form" onSubmit={handleAddCategory}>
          <input
            type="text"
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>

        <h3>Manage Categories</h3>
        <ul className="list">
          {categories.map((cat) => (
            <li key={cat.Categoryid}>
              {editCategoryId === cat.Categoryid ? (
                <>
                  <input
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                  />
                  <button onClick={() => handleUpdateCategory(cat.Categoryid)}>
                    Save
                  </button>
                  <button onClick={() => setEditCategoryId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{cat.CategoryName}</span>
                  <button onClick={() => handleEditCategory(cat)}>Edit</button>
                  <button onClick={() => handleDeleteCategory(cat.Categoryid)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* PRODUCT SECTION */}
      <section className="admin-section">
        <h3>Add Product</h3>
        <form className="add-form" onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.ProductName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, ProductName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.ProductDescription}
            onChange={(e) =>
              setNewProduct({ ...newProduct, ProductDescription: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={newProduct.UnitPrice}
            onChange={(e) =>
              setNewProduct({ ...newProduct, UnitPrice: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.Quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, Quantity: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Qty Reorder"
            value={newProduct.Qty_Reorder}
            onChange={(e) =>
              setNewProduct({ ...newProduct, Qty_Reorder: e.target.value })
            }
            required
          />
          <select
            value={newProduct.CategoryId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, CategoryId: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.Categoryid} value={cat.Categoryid}>
                {cat.CategoryName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.ImageURL}
            onChange={(e) =>
              setNewProduct({ ...newProduct, ImageURL: e.target.value })
            }
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          />
          <button type="submit">Add Product</button>
        </form>
      </section>

      {/* PRODUCT LIST */}
      <section className="admin-section">
        <h3>Product List</h3>
        <ul className="list">
          {products.map((product) => (
            <li key={product.ProductId}>
              {editProductId === product.ProductId ? (
                <>
                  <input
                    value={editedProduct.ProductName}
                    onChange={(e) =>
                      setEditedProduct({ ...editedProduct, ProductName: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={editedProduct.UnitPrice}
                    onChange={(e) =>
                      setEditedProduct({ ...editedProduct, UnitPrice: e.target.value })
                    }
                  />
                  <select
                    value={editedProduct.CategoryId}
                    onChange={(e) =>
                      setEditedProduct({ ...editedProduct, CategoryId: e.target.value })
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat.Categoryid} value={cat.Categoryid}>
                        {cat.CategoryName}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleUpdateProduct}>Save</button>
                  <button onClick={() => setEditProductId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{product.ProductName}</span>
                  <span>₹{product.UnitPrice}</span>
                  <button onClick={() => handleEditProductClick(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.ProductId)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminProductList;
