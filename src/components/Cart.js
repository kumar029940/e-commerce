import React from 'react';
import '../Cart.css';

function Cart({ products, cart, updateQuantity }) {
  const cartItems = products.filter(product => cart[product.id]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * cart[item.id].quantity;
    }, 0).toFixed(2);
  };

  
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>
                <div className="cart-item-buttons"> 
                  <button
                    className="cart-button increase"
                    onClick={() => updateQuantity(item.id, cart[item.id].quantity + 1)}
                  >
                    +1
                  </button>
                  <button
                    className="cart-button decrease"
                    onClick={() => updateQuantity(item.id, cart[item.id].quantity - 1)}
                    disabled={cart[item.id].quantity === 1}
                  >
                    -1
                  </button>
                </div>
                <p>Quantity: {cart[item.id].quantity}</p>
              </div>
            </div>
          ))}
          <h3>Total Price: ${calculateTotalPrice()}</h3>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
