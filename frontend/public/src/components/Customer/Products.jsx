import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/ProductApi';
import { getCategories } from '../../api/CategoryApi';
import { toast } from 'react-toastify';
import './Products.css';

const ProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const handleCategoryChange = (e) => {
    const selected = typeof e === 'string' ? e : e.target.value;
    setSelectedCategory(selected);

    if (selected === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => String(product.CategoryId) === selected
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.ProductName} added to cart!`);
    // setTimeout(() => navigate('/cart'), 1000);
  };

  return (
    <div className="products-page">
      <h1 className='heading1'>Shop Our Products</h1>

      <div className="products-container">
        <div className="sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            <li
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => handleCategoryChange('all')}
            >
              All Categories
            </li>
            {categories.map((cat) => (
              <li
                key={cat.Categoryid}
                className={selectedCategory === String(cat.Categoryid) ? 'active' : ''}
                onClick={() => handleCategoryChange(String(cat.Categoryid))}
              >
                {cat.CategoryName} <span className="plus-sign">+</span>
              </li>
            ))}
          </ul>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">No products available</div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.ProductId} className="product-card">
                <img
                  className="product-image"
                  src={product.ImageURL || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={product.ProductName}
                />
                <div className="product-details">
                  <h3>{product.ProductName}</h3>
                  <p className="price">₹{product.UnitPrice}</p>
                  <p>{product.ProductDescription}</p>
                  <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                    Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
