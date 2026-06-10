# SS Sports – Webshop i React

En fungerande webshop byggd med React och Vite som en del av kursen React & Avancerad Javascript på Företagsuniversitetet.

## Projektbeskrivning
SS Sports är en e-handelsplattform där användare kan bläddra bland produkter, lägga till dem i en kundvagn och slutföra en order. Produkterna hämtas från DummyJSON API.

## Funktioner
- Produktlista med sökfunktion – hämtar och visar alla produkter från DummyJSON API
- Produktsida – visar detaljerad information om en produkt med namn, pris, beskrivning och bild
- Kundvagn – översikt över valda produkter med möjlighet att justera kvantitet och se totalpris
- Kassa – användaren fyller i namn och adress och lägger sin order, en bekräftelse visas

## Tekniker som används
- React med Vite (create vite@latest)
- Funktionella komponenter med hooks (useState, useEffect, useRef, useContext)
- React Router för navigering mellan sidor
- Context API för att dela kundvagnsdata mellan komponenter
- fetch för API-anrop till DummyJSON
- Egen debounce-funktion med setTimeout för prestandaoptimering
- try...catch för felhantering

## Projektstruktur
src/
├── pages/
│   ├── ProductList.jsx   – Startsidan med produktlista och sökfunktion
│   ├── ProductPage.jsx   – Produktsida med detaljerad info
│   ├── Cart.jsx          – Kundvagnssida
│   └── Checkout.jsx      – Kassasida med orderbekräftelse
├── CartContext.jsx        – Context för kundvagnsdata
├── App.jsx               – Huvudkomponent med routing
├── main.jsx              – Startpunkt för applikationen
└── index.css             – Global styling

## Installation och start
1. Klona projektet från GitHub
2. Installera beroenden: npm install
3. Starta projektet: npm run dev
4. Öppna http://localhost:5173/ i webbläsaren

## Hur debounce är implementerad
En egen debounce-funktion är implementerad med setTimeout och useRef i ProductList.jsx. När användaren skriver i sökfältet rensas föregående timeout och en ny sätts på 400ms. Sökningen körs alltså först när användaren slutat skriva i 400ms. Detta förhindrar onödiga omrenderingar vid varje knapptryckning.

## Hur felhantering med try...catch fungerar
Alla API-anrop görs inuti useEffect med async/await och try...catch. Om ett nätverksfel uppstår fångas felet i catch-blocket och ett felmeddelande visas för användaren. Finally-blocket stänger alltid av laddningsindikatorn oavsett om anropet lyckades eller inte.

## Hur Context används
CartContext.jsx skapar ett Context som lagrar kundvagnen och tillhörande funktioner. CartProvider omsluter hela appen i App.jsx så att alla komponenter kan komma åt cart, addToCart och updateQuantity via useCart-hooken utan att behöva skicka props mellan komponenter.