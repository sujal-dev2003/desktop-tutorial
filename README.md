# Tiwari's Cart ecommerce storefront

Tiwari's Cart is an original, responsive ecommerce storefront inspired by familiar marketplace patterns. It includes:

- Product search and category filters
- Responsive product cards with ratings, sale badges, and product images
- Add-to-cart actions with quantity controls
- Persistent cart storage using browser `localStorage`
- Cart drawer with subtotal and checkout action
- Checkout modal with UPI, card, and cash-on-delivery selection
- Demo order validation and confirmation flow
- Live catalog price refresh through DummyJSON with INR conversion and fallback prices
- Wishlist, customer service, Plus membership, and account interaction feedback
- Expanded product catalog with 20 products
- Internal backlinks between categories, offers, support, best sellers, about, and home

## Run locally

Open `index.html` in a browser. Keep `index.html`, `styles.css`, and `app.js` together in the same folder.

Product images are loaded from Unsplash, so an internet connection is needed for product photography. Use **Refresh prices** to request current catalog data; if the public API is unavailable, saved INR prices remain available. The payment screen is a working demo flow and does not charge a real card or UPI account. Connect a provider such as Razorpay or Stripe on a server before accepting real payments.
