// CartContext.jsx - Skapar ett Context för att dela kundvagnsdata mellan komponenter
import { createContext, useState, useContext } from 'react'

// Skapar själva Context-objektet
const CartContext = createContext()

// CartProvider är en wrapper-komponent som omsluter hela appen
// och gör cart-data tillgänglig för alla komponenter
export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Lägger till en produkt i kundvagnen eller ökar kvantiteten om den redan finns
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

  // Uppdaterar kvantiteten för en produkt, eller tar bort den om kvantiteten är 0
  const updateQuantity = (id, quantity) => {
    setCart(prev =>
      quantity === 0
        ? prev.filter(item => item.id !== id)
        : prev.map(item => item.id === id ? { ...item, quantity } : item)
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook för att enkelt komma åt Context i andra komponenter
export function useCart() {
  return useContext(CartContext)
}