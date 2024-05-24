import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Slider from "react-slick";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import imagee from "./img/icons8-shopping-cart-50.png";


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const toggleCart = (id, title) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[id]) {
        toast.info(`${title} removed from cart`);
        delete newCart[id];
      } else {
        toast.success(`${title} added to cart`);
        newCart[id] = { quantity: 1 };
      }
      return newCart;
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newQuantity > 0) {
        newCart[id] = { ...newCart[id], quantity: newQuantity };
      } 
      return newCart;
    });
  };

  const cartItemCount = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toUpperCase().includes(searchQuery.toUpperCase())
      )
    );
  }, [searchQuery, products]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const topFiveProducts = products.slice(0, 5);

  return (
    <Router>
      <nav className="Nav-bar">
        <div>
          <Link to="/cart">
            <img className="img" src={imagee} alt="cart" />
            {cartItemCount}
          </Link>
        </div>
        <div>
          <Link to="/">
            <h3 className="Home">Home</h3>
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </nav>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {topFiveProducts.map((product) => (
            <div key={product.id} className="slider-item">
              <img src={product.image} alt={product.title} className="slider-image" />
              <h3>{product.title}</h3>
            </div>
          ))}
        </Slider>
      </div>
      <Routes>
        <Route
          path="/cart"
          element={
            <Cart
              products={products}
              cart={cart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route
          path="/"
          element={
            <div className="App">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <Product
                    inCart={cart[product.id]}
                    onToggle={() => toggleCart(product.id, product.title)}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    category={product.category}
                    image={product.image}
                  />
                </div>
              ))}
            </div>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;