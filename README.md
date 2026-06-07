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
- Funktionella komponenter med hooks (useState, useEffect)
- React Router för navigering mellan sidor
- fetch för API-anrop till DummyJSON
- debounce för prestandaoptimering
- try...catch för felhantering

## Installation och start
1. Klona projektet från GitHub
2. Installera beroenden: npm install
3. Starta projektet: npm run dev
4. Öppna http://localhost:5173/ i webbläsaren

## Hur debounce är implementerad
Debounce-funktionen är implementerad på sökfältet i produktlistan. När användaren skriver väntar applikationen 400ms innan sökningen körs. Detta förhindrar onödiga omrenderingar vid varje knapptryckning.

## Hur felhantering med try...catch fungerar
Alla API-anrop görs inuti useEffect med async/await och try...catch. Om ett nätverksfel uppstår fångas felet i catch-blocket och ett felmeddelande visas för användaren. Finally-blocket stänger alltid av laddningsindikatorn oavsett om anropet lyckades eller inte.