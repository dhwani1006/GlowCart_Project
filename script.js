// ================= PRODUCTS =================
const products = [
  {id:1,name:"Cleanser",price:299,img:"assets/Cleanser.png",section:"essentials"},
  {id:2,name:"Moisturizer",price:499,img:"assets/Moisturizer.png",section:"essentials"},
  {id:3,name:"Sunscreen",price:399,img:"assets/Sunscreen.png",section:"essentials"},
  {id:4,name:"Face Wash",price:199,img:"assets/FaceWash.png",section:"essentials"},
  {id:5,name:"Toner",price:349,img:"assets/Toner.png",section:"essentials"},

  {id:6,name:"Serum",price:799,img:"assets/Serum.png",section:"treatment"},
  {id:7,name:"Night Cream",price:699,img:"assets/NightCream.png",section:"treatment"},
  {id:8,name:"Gel",price:459,img:"assets/Gel.png",section:"treatment"},
  {id:9,name:"Face Cream",price:599,img:"assets/FaceCream.png",section:"treatment"},
  {id:10,name:"Mask",price:499,img:"assets/Mask.png",section:"treatment"},

  {id:11,name:"Vitamin C Serum",price:899,img:"assets/VitaminCSerum.png",section:"advanced"},
  {id:12,name:"Retinol Cream",price:999,img:"assets/RetinolCream.png",section:"advanced"},
  {id:13,name:"Peptide Serum",price:1099,img:"assets/PeptideSerum.png",section:"advanced"},
  {id:14,name:"Brightening Kit",price:1299,img:"assets/BrighteningKit.png",section:"advanced"},
  {id:15,name:"Anti-Aging Gel",price:899,img:"assets/AntiAgingGel.png",section:"advanced"}
];

// ================= STATE =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= SECTIONS =================
const sections = {
  essentials: document.getElementById("essentials"),
  treatment: document.getElementById("treatment"),
  advanced: document.getElementById("advanced")
};

// ================= RENDER PRODUCTS =================
function renderProducts() {
  Object.values(sections).forEach(sec => sec.innerHTML = "");

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button>Add to Cart</button>
    `;

    div.querySelector("button").addEventListener("click", () => addToCart(p.id));

    sections[p.section].appendChild(div);
  });
}

// ================= ADD TO CART =================
function addToCart(id) {
  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({...product, qty: 1});
  }

  updateCart();
  document.getElementById("cart").classList.add("active");
}

// ================= UPDATE CART =================
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  const cartItems = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");
  const count = document.getElementById("cartCount");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p style="text-align:center; margin-top:20px;">
        Your cart is empty. Start shopping 🛍️
      </p>
    `;
    totalEl.innerText = 0;
    count.innerText = 0;
    return;
  }

  let total = 0;
  let totalItems = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;

    total += itemTotal;
    totalItems += item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      
      <div class="cart-info">
        <p>${item.name}</p>
        <small class="item-total">₹${itemTotal}</small>
        
        <div class="qty-controls">
          <button class="minus">-</button>
          <span>${item.qty}</span>
          <button class="plus">+</button>
        </div>
      </div>

      <button class="remove-btn">Remove</button>
    `;

    div.querySelector(".minus").addEventListener("click", () => changeQty(item.id, -1));
    div.querySelector(".plus").addEventListener("click", () => changeQty(item.id, 1));
    div.querySelector(".remove-btn").addEventListener("click", () => removeItem(item.id));

    cartItems.appendChild(div);
  });

  totalEl.innerText = total;
  count.innerText = totalItems;
}

// ================= CHANGE QTY =================
function changeQty(id, value) {
  const item = cart.find(i => i.id === id);
  if (!item) return;


  item.qty += value;

  if (item.qty <= 0) {
    removeItem(id);
  } else {
    updateCart();
  }
}

// ================= REMOVE ITEM =================
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// ================= CART TOGGLE =================
document.getElementById("cartIcon").addEventListener("click", () => {
  document.getElementById("cart").classList.add("active");
});

document.getElementById("closeCart").addEventListener("click", () => {
  document.getElementById("cart").classList.remove("active");
});

// ================= INIT =================
renderProducts();
updateCart();