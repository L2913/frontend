import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🛒 Shoe Store</h1>

      {/* PRODUCTS */}
      <h2>Products</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px'
      }}>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((p) => (
            <div key={p._id} style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '10px'
            }}>
              <img
                src={p.image}
                alt={p.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <h3>{p.name}</h3>
              <p>₱{p.price}</p>
              <button onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* CART */}
      <h2 style={{ marginTop: '40px' }}>
        Cart ({cart.length})
      </h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            {item.name} - ₱{item.price}
          </div>
        ))
      )}
    </div>
  );
}

export default App;