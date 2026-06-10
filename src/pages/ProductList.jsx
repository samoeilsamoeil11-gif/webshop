// ProductList.jsx - Startsidan som visar alla produkter från DummyJSON API
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function ProductList() {
  // Tillstånd för produktlistan
  const [products, setProducts] = useState([])
  // Tillstånd för laddningsindikator
  const [loading, setLoading] = useState(true)
  // Tillstånd för felmeddelande
  const [error, setError] = useState(null)
  // Tillstånd för söktext
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  // useRef används för att spara timeout-referensen mellan renderingar
  const debounceTimeout = useRef(null)

  // useEffect körs när komponenten laddas första gången
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Hämtar alla produkter från DummyJSON API
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        setProducts(data.products)
      } catch (err) {
        // Fångar nätverksfel och visar felmeddelande för användaren
        setError('Något gick fel, försök igen.')
      } finally {
        // Stänger av laddningsindikatorn oavsett om det gick bra eller fel
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Egen debounce-funktion med setTimeout
  // Rensar föregående timeout och sätter en ny på 400ms
  // Detta förhindrar onödiga omrenderingar vid varje knapptryckning
  const handleSearch = (value) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = setTimeout(() => {
      setSearch(value)
    }, 400)
  }

  // Filtrerar produkter baserat på söktext
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  // Visar laddningsmeddelande medan produkter hämtas
  if (loading) return <p style={{ padding: '2rem', color: '#cc0000', backgroundColor: '#ffcc00', minHeight: '100vh' }}>Laddar produkter...</p>

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
          KUNDVAGN
        </button>
      </div>

      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #ff0000, #cc0000)', padding: '2rem', textAlign: 'center', borderBottom: '4px solid #ffcc00' }}>
        <h2 style={{ color: '#ffcc00', fontSize: '1.5rem', letterSpacing: '4px', marginBottom: '0.3rem' }}>NYA KOLLEKTIONER</h2>
        <p style={{ color: '#fff', letterSpacing: '2px', fontSize: '0.9rem' }}>GRATIS FRAKT PA ALLA ORDRAR OVER $50</p>
      </div>

      <div style={{ padding: '2rem' }}>
        {/* Sökfält med egen debounce */}
        <input
          type="text"
          placeholder="SÖK PRODUKT..."
          onChange={e => handleSearch(e.target.value)}
          style={{ padding: '0.8rem 1rem', marginBottom: '2rem', width: '100%', maxWidth: '400px', fontSize: '1rem', letterSpacing: '1px', border: '3px solid #cc0000', borderRadius: '4px', backgroundColor: '#fff', color: '#000', display: 'block', margin: '0 auto 2rem auto' }}
        />

        {/* Produktgrid - visar filtrerade produkter */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {filtered.map(product => (
            // Varje produktkort är klickbart och navigerar till produktsidan
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ backgroundColor: '#fff', border: '3px solid #fff', borderRadius: '8px', cursor: 'pointer', overflow: 'hidden', transition: 'border 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.border = '3px solid #cc0000'}
              onMouseLeave={e => e.currentTarget.style.border = '3px solid #fff'}
            >
              <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '0.8rem', borderTop: '3px solid #ffcc00' }}>
                <p style={{ fontWeight: '900', fontSize: '0.9rem', letterSpacing: '1px', marginBottom: '0.3rem', color: '#000' }}>{product.title}</p>
                <p style={{ color: '#cc0000', fontWeight: '900', fontSize: '1.1rem' }}>${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductList