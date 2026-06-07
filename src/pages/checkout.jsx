// Checkout.jsx - Kassasidan där användaren fyller i personliga uppgifter och lägger sin order
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout({ cart }) {
  const navigate = useNavigate()
  // Tillstånd för namn och adress som användaren fyller i
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  // Tillstånd för om ordern är bekräftad
  const [confirmed, setConfirmed] = useState(false)

  // Beräknar totalpriset för alla produkter i kundvagnen
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Hanterar orderläggning - validerar att namn och adress är ifyllda
  const handleOrder = () => {
    if (name.trim() === '' || address.trim() === '') {
      alert('Fyll i namn och adress!')
      return
    }
    // Sätter confirmed till true för att visa bekräftelsesidan
    setConfirmed(true)
  }

  // Visar orderbekräftelse när ordern är lagd
  if (confirmed) return (
    <div style={{ backgroundColor: '#ffcc00', minHeight: '100vh' }}>
      {/* Navbar */}
      <div style={{ background: 'linear-gradient(135deg, #cc0000, #ff0000)', padding: '1rem 2rem', borderBottom: '4px solid #ffcc00' }}>
        <h1 style={{ color: '#ffcc00', fontSize: '2rem', letterSpacing: '3px', fontWeight: '900' }}>SS SPORTS</h1>
        <p style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '2px' }}>JUST DO IT YOUR WAY</p>
      </div>
      {/* Bekräftelsekort */}
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '2rem', border: '3px solid #cc0000', marginTop: '2rem' }}>
          <h2 style={{ color: '#cc0000', fontSize: '2rem', letterSpacing: '2px', marginBottom: '1rem' }}>🎉 ORDER BEKRÄFTAD!</h2>
          {/* Visar användarens namn och adress */}
          <p style={{ color: '#000', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Tack <strong>{name}</strong>!</p>
          <p style={{ color: '#555', marginBottom: '1.5rem' }}>Din order skickas till <strong>{address}</strong>.</p>
          {/* Visar totalpriset */}
          <div style={{ backgroundColor: '#ffcc00', borderRadius: '4px', padding: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ color: '#cc0000', fontSize: '1.5rem', fontWeight: '900' }}>TOTALT: ${total.toFixed(2)}</p>
          </div>
          {/* Tillbaka till butiken */}
          <button
            onClick={() => navigate('/')}
            style={{ background: 'linear-gradient(135deg, #cc0000, #ff0000)', color: '#ffcc00', border: 'none', padding: '1rem 2rem', fontWeight: '900', letterSpacing: '2px', fontSize: '1rem', borderRadius: '4px', width: '100%' }}
          >
            TILLBAKA TILL BUTIKEN
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#ffcc00', minHeight: '100vh' }}>
      {/* Navbar */}
      <div style={{ background: 'linear-gradient(135deg, #cc0000, #ff0000)', padding: '1rem 2rem', borderBottom: '4px solid #ffcc00' }}>
        <h1 style={{ color: '#ffcc00', fontSize: '2rem', letterSpacing: '3px', fontWeight: '900' }}>SS SPORTS</h1>
        <p style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '2px' }}>JUST DO IT YOUR WAY</p>
      </div>

      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#cc0000', letterSpacing: '2px', marginBottom: '2rem' }}>KASSA</h2>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '2rem', border: '3px solid #cc0000' }}>
          {/* Namnfält */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', letterSpacing: '1px', fontSize: '0.9rem', color: '#cc0000', fontWeight: '900' }}>NAMN</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '2px solid #cc0000', borderRadius: '4px', color: '#000', backgroundColor: '#fff' }}
            />
          </div>
          {/* Adressfält */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', letterSpacing: '1px', fontSize: '0.9rem', color: '#cc0000', fontWeight: '900' }}>ADRESS</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '2px solid #cc0000', borderRadius: '4px', color: '#000', backgroundColor: '#fff' }}
            />
          </div>
          {/* Totalpris */}
          <div style={{ backgroundColor: '#ffcc00', borderRadius: '4px', padding: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#cc0000', letterSpacing: '1px', fontWeight: '900' }}>TOTALT: ${total.toFixed(2)}</h3>
          </div>
          {/* Navigationsknappar */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => navigate('/cart')}
              style={{ backgroundColor: '#fff', color: '#cc0000', border: '3px solid #cc0000', padding: '0.8rem 1.5rem', fontWeight: '900', letterSpacing: '1px', borderRadius: '4px' }}
            >
              ← TILLBAKA
            </button>
            {/* Orderknapp - simulerar en beställningsprocess */}
            <button
              onClick={handleOrder}
              style={{ background: 'linear-gradient(135deg, #cc0000, #ff0000)', color: '#ffcc00', border: 'none', padding: '0.8rem 1.5rem', fontWeight: '900', letterSpacing: '2px', flex: 1, fontSize: '1rem', borderRadius: '4px' }}
            >
              LÄGG DIN ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout