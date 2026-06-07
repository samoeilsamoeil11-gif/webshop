import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { useState } from 'react'

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setCart(prev =>
      quantity === 0
        ? prev.filter(item => item.id !== id)
        : prev.map(item => item.id === id ? { ...item, quantity } : item)
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App