// ProductPage.jsx - Visar detaljerad information om en specifik produkt
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ProductPage({ addToCart }) {
  // Hämtar produktens ID från URL:en
  const { id } = useParams()
  const navigate = useNavigate()
  // Tillstånd för produktdata
  const [product, setProduct] = useState(null)
  // Tillstånd för laddningsindikator
  const [loading, setLoading] = useState(true)
  // Tillstånd för felmeddelande
  const [error, setError] = useState(null)
  // Tillstånd för vald kvantitet
  const [quantity, setQuantity] = useState(1)

  // useEffect körs när komponenten laddas eller när ID ändras
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Hämtar en specifik produkt baserat på ID från DummyJSON API
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        // Fångar nätverksfel och visar felmeddelande för användaren
        setError('Kunde inte hämta produkten.')
      } finally {
        // Stänger av laddningsindikatorn oavsett om det gick bra eller fel
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  // Visar laddningsmeddelande medan produkten hämtas
  if (loading) return <p style={{ padding: '2rem', backgroundColor: '#ffcc00', minHeight: '100vh' }}>Laddar...</p>

  // Visar felmeddelande om något gick fel vid API-anropet
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>

  return (
    <div style={{ backgroundColor: '#ffcc00', minHeight: '100vh' }}>
      {/* Navbar med logotyp och kundvagnsknapp */}
      <div style={{ background: 'linear-gradient(135deg, #cc0000, #ff0000)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #ffcc00' }}>
        <div>
          <h1 style={{ color: '#ffcc00', fontSize: '2rem', letterSpacing: '3px', fontWeight: '900' }}>SS SPORTS</h1>
          <p style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '2px' }}>JUST DO IT YOUR WAY</p>
        </div>
        <button
          onClick={() => navigate('/cart')}
          style={{ backgroundColor: '#ffcc00', color: '#cc0000', border: 'none', padding: '0.7rem 1.4rem', fontWeight: '900', fontSize: '1rem', letterSpacing: '1px', borderRadius: '4px' }}
        >
          🛒 KUNDVAGN
        </button>
      </div>

      <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
        {/* Tillbaka-knapp navigerar till produktlistan */}
        <button
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#cc0000', color: '#ffcc00', border: 'none', padding: '0.6rem 1.2rem', marginBottom: '1.5rem', fontWeight: '900', letterSpacing: '1px', borderRadius: '4px' }}
        >
          ← TILLBAKA
        </button>

        {/* Produktkort med all detaljerad information */}
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', border: '3px solid #cc0000' }}>
          <img src={product.thumbnail} alt={product.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
          <div style={{ padding: '1.5rem' }}>
            {/* Produktnamn */}
            <h2 style={{ color: '#cc0000', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{product.title}</h2>
            {/* Produktbeskrivning */}
            <p style={{ color: '#555', marginBottom: '1rem', lineHeight: '1.6' }}>{product.description}</p>
            {/* Produktpris */}
            <p style={{ color: '#cc0000', fontSize: '2rem', fontWeight: '900', marginBottom: '1.5rem' }}>${product.price}</p>

            {/* Kvantitetsväljare */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: '900', letterSpacing: '1px', color: '#000' }}>ANTAL:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                style={{ width: '70px', padding: '0.5rem', fontSize: '1rem', textAlign: 'center', border: '2px solid #cc0000', borderRadius: '4px', color: '#000', backgroundColor: '#fff' }}
              />
            </div>

            {/* Knapp för att lägga till i kundvagnen och navigera dit */}
            <button
              onClick={() => { addToCart(product, quantity); navigate('/cart') }}
              style={{ background: 'linear-gradient(135deg, #cc0000, #ff0000)', color: '#ffcc00', border: 'none', padding: '1rem 2rem', fontWeight: '900', fontSize: '1rem', letterSpacing: '2px', width: '100%', borderRadius: '4px' }}
            >
              LÄGG TILL I KUNDVAGN 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage