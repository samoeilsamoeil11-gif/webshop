// Cart.jsx - Visar kundvagnen med alla valda produkter och totalpris
import { useNavigate } from 'react-router-dom'
// Importerar useCart från Context för att komma åt cart och updateQuantity utan props
import { useCart } from '../CartContext'

function Cart() {
  const navigate = useNavigate()
  // Hämtar cart och updateQuantity från Context istället för props
  const { cart, updateQuantity } = useCart()

  // Beräknar totalpriset för alla produkter i kundvagnen
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Visar tomt kundvagnsmeddelande om inga produkter finns
  if (cart.length === 0) return (
    <div style={{ backgroundColor: '#ffcc00', minHeight: '100vh' }}>
      {/* Navbar */}
      <div style={{ background: 'linear-gradient(135deg, #cc0000, #ff0000)', padding: '1rem 2rem', borderBottom: '4px solid #ffcc00' }}>
        <h1 style={{ color: '#ffcc00', fontSize: '2rem', letterSpacing: '3px', fontWeight: '900' }}>SS SPORTS</h1>
        <p style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '2px' }}>JUST DO IT YOUR WAY</p>
      </div>
      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: '#cc0000', letterSpacing: '2px', marginBottom: '1rem' }}>KUNDVAGN</h2>
        <p style={{ color: '#000', marginBottom: '1.5rem' }}>Din kundvagn är tom.</p>
        <button
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#cc0000', color: '#ffcc00', border: 'none', padding: '0.8rem 1.5rem', fontWeight: '900', letterSpacing: '1px', borderRadius: '4px' }}
        >
          FORTSÄTT HANDLA
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#ffcc00', minHeight: '100vh' }}>
      {/* Navbar */}
      <div style={{ background: 'linear-gradient(135deg, #cc0000, #ff0000)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #ffcc00' }}>
        <div>
          <h1 style={{ color: '#ffcc00', fontSize: '2rem', letterSpacing: '3px', fontWeight: '900' }}>SS SPORTS</h1>
          <p style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '2px' }}>JUST DO IT YOUR WAY</p>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: '#cc0000', letterSpacing: '2px', marginBottom: '1.5rem' }}>KUNDVAGN</h2>

        {/* Lista över alla produkter i kundvagnen */}
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fff', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', border: '3px solid #cc0000' }}>
            <img src={item.thumbnail} alt={item.title} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '4px' }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '900', letterSpacing: '1px', marginBottom: '0.3rem', color: '#000', textTransform: 'uppercase' }}>{item.title}</p>
              <p style={{ color: '#cc0000', fontWeight: '900', fontSize: '1.1rem' }}>${item.price}</p>
            </div>
            {/* Kvantitetsinput - sätts till 0 för att ta bort produkten */}
            <input
              type="number"
              min="0"
              value={item.quantity}
              onChange={e => updateQuantity(item.id, Number(e.target.value))}
              style={{ width: '60px', padding: '0.4rem', fontSize: '1rem', textAlign: 'center', border: '2px solid #cc0000', borderRadius: '4px', color: '#000', backgroundColor: '#fff' }}
            />
          </div>
        ))}

        {/* Totalprisbanner */}
        <div style={{ backgroundColor: '#cc0000', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'right' }}>
          <h2 style={{ color: '#ffcc00', letterSpacing: '2px' }}>TOTALT: ${total.toFixed(2)}</h2>
        </div>

        {/* Navigationsknappar */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* Tillbaka till butiken */}
          <button
            onClick={() => navigate('/')}
            style={{ backgroundColor: '#fff', color: '#cc0000', border: '3px solid #cc0000', padding: '0.8rem 1.5rem', fontWeight: '900', letterSpacing: '1px', borderRadius: '4px' }}
          >
            FORTSÄTT HANDLA
          </button>
          {/* Gå till kassan */}
          <button
            onClick={() => navigate('/checkout')}
            style={{ background: 'linear-gradient(135deg, #cc0000, #ff0000)', color: '#ffcc00', border: 'none', padding: '0.8rem 1.5rem', fontWeight: '900', letterSpacing: '1px', borderRadius: '4px', flex: 1, fontSize: '1rem' }}
          >
            TILL KASSAN
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart