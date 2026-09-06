const products = [
  {id:1,name:"Lumen portable lamp",category:"Home",price:1299,old:1799,rating:4.8,reviews:124,image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",badge:"BESTSELLER"},
  {id:2,name:"Arc wireless headphones",category:"Tech",price:2499,old:3499,rating:4.7,reviews:89,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",badge:"20% OFF"},
  {id:3,name:"Moss everyday tote",category:"Fashion",price:899,old:1299,rating:4.9,reviews:210,image:"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80",badge:"TRENDING"},
  {id:4,name:"Studio ceramic set",category:"Home",price:1599,old:1999,rating:4.6,reviews:57,image:"https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Everyday smart watch",category:"Tech",price:3299,old:4999,rating:4.5,reviews:73,image:"https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Cloud knit overshirt",category:"Fashion",price:1899,old:2499,rating:4.8,reviews:101,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Flow yoga mat",category:"Fitness",price:799,old:1099,rating:4.7,reviews:156,image:"https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Brew pour-over maker",category:"Home",price:1199,old:1599,rating:4.9,reviews:88,image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80"},
  {id:9,name:"Minimal desk organizer",category:"Home",price:699,old:999,rating:4.6,reviews:64,image:"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80"},
  {id:10,name:"Pocket power bank",category:"Tech",price:1499,old:1999,rating:4.5,reviews:92,image:"https://images.unsplash.com/photo-1609592424435-6e8c7c2a1e5a?auto=format&fit=crop&w=700&q=80"},
  {id:11,name:"Canvas weekend sneakers",category:"Fashion",price:1799,old:2299,rating:4.7,reviews:118,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"},
  {id:12,name:"Insulated steel bottle",category:"Fitness",price:649,old:899,rating:4.8,reviews:201,image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80"},
  {id:13,name:"Soft cotton cushion",category:"Home",price:549,old:799,rating:4.6,reviews:76,image:"https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80"},
  {id:14,name:"Focus mechanical keyboard",category:"Tech",price:2899,old:3799,rating:4.8,reviews:48,image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80"},
  {id:15,name:"Cedar aroma diffuser",category:"Home",price:999,old:1399,rating:4.7,reviews:83,image:"https://images.unsplash.com/photo-1602874801006-e26f9c4f95f6?auto=format&fit=crop&w=700&q=80",badge:"NEW"},
  {id:16,name:"Daily cotton shirt",category:"Fashion",price:1099,old:1599,rating:4.6,reviews:145,image:"https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=80"},
  {id:17,name:"Resistance band kit",category:"Fitness",price:599,old:899,rating:4.8,reviews:132,image:"https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=700&q=80"},
  {id:18,name:"Compact Bluetooth speaker",category:"Tech",price:1799,old:2499,rating:4.7,reviews:109,image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80"},
  {id:19,name:"Linen table runner",category:"Home",price:749,old:999,rating:4.5,reviews:51,image:"https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80"},
  {id:20,name:"Travel gym duffel",category:"Fitness",price:1399,old:1899,rating:4.8,reviews:67,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"}
];
let cart=JSON.parse(localStorage.getItem("harborcart-cart")||"[]"), activeFilter="all";
const $=id=>document.getElementById(id), money=value=>`₹${value.toLocaleString("en-IN")}`;
function save(){localStorage.setItem("harborcart-cart",JSON.stringify(cart));}
function renderProducts(){
  const query=$("searchInput").value.trim().toLowerCase(), filter=activeFilter;
  const visible=products.filter(p=>(filter==="all"||p.category===filter)&&(!query||`${p.name} ${p.category}`.toLowerCase().includes(query)));
  $("productGrid").innerHTML=visible.length?visible.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.badge?`<span class="badge">${p.badge}</span>`:""}<button class="heart" data-wish="${p.id}">♡</button></div><div class="product-info"><small>${p.category}</small><h3>${p.name}</h3><div class="stars">★★★★★ <span>${p.rating} (${p.reviews})</span></div><div class="price"><strong>${money(p.price)}</strong><del>${money(p.old)}</del></div><button class="add-button" data-add="${p.id}">Add to cart</button></div></article>`).join(""):`<div class="empty-cart"><h3>No products found</h3><p>Try another search or category.</p></div>`;
}
function renderCart(){
  const count=cart.reduce((sum,item)=>sum+item.qty,0), subtotal=cart.reduce((sum,item)=>sum+item.qty*item.product.price,0);
  $("cartCount").textContent=count;$("drawerCount").textContent=`${count} item${count===1?"":"s"}`;$("cartSubtotal").textContent=money(subtotal);
  $("emptyCart").style.display=count?"none":"block";$("cartSummary").style.display=count?"block":"none";
  $("cartItems").innerHTML=cart.map(item=>`<div class="cart-row"><img src="${item.product.image}" alt="${item.product.name}"><div><small>${item.product.category}</small><h4>${item.product.name}</h4><div class="qty"><button data-minus="${item.product.id}">−</button><span>${item.qty}</span><button data-plus="${item.product.id}">+</button></div></div><strong>${money(item.product.price*item.qty)}</strong></div>`).join("");
}
function toast(message){$("toast").textContent=message;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2400)}
function add(id){const product=products.find(p=>p.id===id), existing=cart.find(i=>i.product.id===id);existing?existing.qty++:cart.push({product,qty:1});save();renderCart();toast(`${product.name} added to your cart`)}
function openCart(){ $("cartDrawer").classList.add("open");$("overlay").classList.add("show") }
function closeCart(){ $("cartDrawer").classList.remove("open");$("overlay").classList.remove("show") }
document.addEventListener("click",event=>{
  const addButton=event.target.closest("[data-add]"), category=event.target.closest("[data-category]"), filter=event.target.closest("[data-filter]"), plus=event.target.closest("[data-plus]"), minus=event.target.closest("[data-minus]");
  if(addButton)add(Number(addButton.dataset.add));
  if(category||filter){activeFilter=category?.dataset.category||filter.dataset.filter;document.querySelectorAll(".filter-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));renderProducts();document.getElementById("products").scrollIntoView({behavior:"smooth"})}
  if(plus||minus){const item=cart.find(i=>i.product.id===Number((plus||minus).dataset[plus?"plus":"minus"]));if(plus)item.qty++;else item.qty--;cart=cart.filter(i=>i.qty>0);save();renderCart()}
  if(event.target.closest("[data-wish]"))toast("Saved to your wishlist");
});
$("cartButton").onclick=openCart;$("closeCart").onclick=closeCart;$("overlay").onclick=closeCart;
$("searchButton").onclick=renderProducts;$("searchInput").oninput=renderProducts;
$("categorySelect").onchange=event=>{activeFilter=event.target.value;renderProducts()};
$("categoryMenu").onclick=()=>toast("Choose a category below to start shopping");
$("ordersButton").onclick=()=>toast("Your orders will appear here after checkout");
$("wishlistButton").onclick=()=>toast("Your wishlist is ready for your favorite finds");
$("plusButton").onclick=()=>toast("Tiwari's Cart Plus trial added to your account");
$("helpButton").onclick=()=>toast("Help center: our team will be with you shortly");
document.querySelectorAll("[data-scroll]").forEach(button=>button.onclick=()=>document.getElementById(button.dataset.scroll).scrollIntoView({behavior:"smooth"}));
$("checkoutButton").onclick=()=>{
  const total=cart.reduce((sum,item)=>sum+item.qty*item.product.price,0);
  if(!total)return toast("Your cart is empty");
  $("checkoutTotal").textContent=money(total);$("checkoutModal").showModal();
};
$("closeCheckout").onclick=()=>$("checkoutModal").close();
document.querySelectorAll(".payment-method").forEach(button=>button.onclick=()=>{
  document.querySelectorAll(".payment-method").forEach(item=>item.classList.remove("active"));button.classList.add("active");
  const field=$("paymentField"), type=button.dataset.payment;
  field.style.display=type==="cod"?"none":"block";
  if(type==="upi"){field.querySelector("input").placeholder="name@bank";field.firstChild.textContent="UPI ID"}
  if(type==="card"){field.querySelector("input").placeholder="4111 1111 1111 1111";field.firstChild.textContent="Card number"}
});
$("paymentForm").onsubmit=event=>{
  event.preventDefault();
  const selected=document.querySelector(".payment-method.active").dataset.payment,input=event.currentTarget.elements.payment;
  if(selected!=="cod"&&input.value.trim().length<4){input.focus();return toast("Enter valid payment details")}
  const orderId=`HC${Date.now().toString().slice(-8)}`;cart=[];save();renderCart();$("checkoutModal").close();closeCart();toast(`Order ${orderId} placed successfully`);
};
$("refreshCatalog").onclick=async()=>{
  const button=$("refreshCatalog");button.disabled=true;button.textContent="↻ Loading...";
  try{
    const response=await fetch("https://dummyjson.com/products?limit=14");
    if(!response.ok)throw new Error("Catalog request failed");
    const data=await response.json();
    data.products.forEach((remote,index)=>{if(products[index]){const live=Math.round(remote.price*83.5);products[index].price=live;products[index].old=Math.round(live*1.22)}});
    $("priceStatus").textContent=`Prices refreshed from live catalog · ${new Date().toLocaleTimeString("en-IN")}`;renderProducts();toast("Latest catalog prices loaded");
  }catch(error){$("priceStatus").textContent="Live catalog unavailable · showing saved INR prices";toast("Could not refresh catalog prices")}
  finally{button.disabled=false;button.textContent="↻ Refresh prices"}
};
renderProducts();renderCart();
