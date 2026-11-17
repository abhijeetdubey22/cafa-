// ==========================================
// RESPONSIVE APP LOGIC: Mobile + Laptop
// ==========================================

let targetPhone = "919307911043";
let currentCategory = "all";
let currentTheme = "beach"; // 'beach' or 'urban'
let orderType = "dinein"; // 'dinein', 'takeaway', 'delivery'
let isPhoneSimulated = false;
let cart = {}; // { itemId: quantity }

// Themes Configuration with About Stories
const THEMES = {
  beach: {
    logo: "🌴",
    name: "The Palms Beach Cafe",
    sub: "Rajodi Beach, Virar West",
    title: "Artisanal Pizzas & Fresh Coastal Catch",
    desc: "Experience golden sunsets, luxury beach cabanas, live mocktail coolers & authentic wood-fired pizzas right on Rajodi Beach, Virar.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    themeAttr: "beach",
    icon: "🌴",
    aboutTitle: "Crafted with Coastal Soul & Pure Passion",
    aboutStory: "Born along the scenic shoreline of Rajodi Beach in Virar West, we set out with a simple mission: to combine authentic Neapolitan slow-fermented wood-fired pizzas with the freshest daily catch from local coastal fishermen. Every sauce is simmered from scratch, every dough is fermented for 48 hours, and every sunset cabana table is crafted for unforgettable memories with friends and family.",
    aboutImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
  },
  urban: {
    logo: "🔥",
    name: "Urban Spice & Grill",
    sub: "Global City, Virar West",
    title: "Modern Multi-Cuisine & Fast Deliveries",
    desc: "Signature smashed burgers, gourmet rolls, continental sizzlers & thick Belgian shakes delivered in 25 mins across Virar.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    themeAttr: "urban",
    icon: "🏙️",
    aboutTitle: "Modern Urban Flavors for Global City",
    aboutStory: "Established in the heart of Global City, Virar West, Urban Spice & Grill brings contemporary gourmet comfort food right to your doorstep. From 100% freshly pressed smashed burgers to sizzling hot tandoori platters and artisan shakes, our kitchen operates on zero-compromise hygiene and direct doorstep deliveries in under 25 minutes.",
    aboutImg: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80"
  }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderMenuItems();
  setupCalculator();
  setupSearch();
  updatePhoneDisplay();
  lucide.createIcons();
});

// Update Phone Displays
function updatePhoneDisplay() {
  const disp = document.getElementById("display-target-phone");
  if (disp) disp.innerText = targetPhone.replace(/^91/, "");
  const input = document.getElementById("target-phone-input");
  if (input) input.value = targetPhone;
}

// ------------------------------------------
// 1. Theme Switching (Beach vs Urban)
// ------------------------------------------
function toggleTheme() {
  currentTheme = (currentTheme === "beach") ? "urban" : "beach";
  const t = THEMES[currentTheme];

  document.documentElement.setAttribute("data-theme", t.themeAttr);
  document.getElementById("brand-logo").innerText = t.logo;
  document.getElementById("brand-name").innerText = t.name;
  document.getElementById("brand-sub").querySelector("span").innerText = t.sub;
  document.getElementById("hero-title").innerText = t.title;
  document.getElementById("hero-desc").innerText = t.desc;
  document.getElementById("hero-img").src = t.img;
  document.getElementById("theme-icon").innerText = t.icon;

  // Update About Story
  const aboutTitle = document.getElementById("about-title");
  if (aboutTitle) aboutTitle.innerText = t.aboutTitle;
  const aboutStory = document.getElementById("about-story");
  if (aboutStory) aboutStory.innerText = t.aboutStory;
  const aboutImg = document.getElementById("about-img");
  if (aboutImg) aboutImg.src = t.aboutImg;

  // Update Footer
  const footerLogo = document.getElementById("footer-logo");
  if (footerLogo) footerLogo.innerText = t.logo;
  const footerName = document.getElementById("footer-name");
  if (footerName) footerName.innerText = t.name;
}

// ------------------------------------------
// 2. Laptop/Phone Device Simulator Mode (FIXED)
// ------------------------------------------
function toggleDeviceSimulation() {
  isPhoneSimulated = !isPhoneSimulated;
  document.body.classList.toggle("simulated-phone", isPhoneSimulated);
  
  const text = document.getElementById("device-toggle-text");
  if (text) {
    text.innerText = isPhoneSimulated ? "Restore Full Laptop View" : "Preview Phone Mode";
  }
  const btn = document.getElementById("btn-device-toggle");
  if (btn) {
    btn.classList.toggle("bg-white/40", isPhoneSimulated);
  }

  // Scroll to top of app wrapper smoothly for realistic view
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ------------------------------------------
// 3. Category Chips Rendering
// ------------------------------------------
function renderCategories() {
  const container = document.getElementById("category-container");
  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = cat.id === currentCategory;
    const activeClass = isActive 
      ? "bg-slate-900 text-white shadow-md scale-105" 
      : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50";
    return `
      <button onclick="setCategory('${cat.id}')" 
              class="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeClass}">
        ${cat.label}
      </button>
    `;
  }).join("");
}

function setCategory(catId) {
  currentCategory = catId;
  renderCategories();
  renderMenuItems();
  
  const heading = document.getElementById("section-heading");
  const selected = CATEGORIES.find(c => c.id === catId);
  if (heading && selected) {
    heading.innerText = selected.label;
  }
}

// ------------------------------------------
// 4. Menu Items Rendering (Responsive Cards)
// ------------------------------------------
function renderMenuItems() {
  const container = document.getElementById("menu-container");
  const searchVal = (document.getElementById("search-input").value || "").toLowerCase().trim();

  let filtered = MENU_ITEMS.filter(item => {
    const matchesCat = (currentCategory === "all") || (item.category === currentCategory);
    const matchesSearch = !searchVal || 
                          item.name.toLowerCase().includes(searchVal) || 
                          item.description.toLowerCase().includes(searchVal);
    return matchesCat && matchesSearch;
  });

  document.getElementById("item-count-label").innerText = `${filtered.length} Items Available`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <p class="text-3xl mb-2">🔍</p>
        <p class="text-sm font-bold text-slate-800">No dishes match your search</p>
        <p class="text-xs text-slate-400 mt-1">Try clearing the search or pick another category</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const qty = cart[item.id] || 0;
    const vegBadge = item.isVeg 
      ? `<div class="badge-veg"><div class="badge-veg-dot"></div></div>`
      : `<div class="badge-nonveg"><div class="badge-nonveg-dot"></div></div>`;

    const bestsellerBadge = item.isBestseller
      ? `<span class="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">⭐️ Bestseller</span>`
      : "";

    // Action button: '+ Add' vs '- 1 +'
    const actionBtn = (qty === 0) 
      ? `<button onclick="addToCart(${item.id})" 
                 class="px-4 py-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white border border-orange-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95">
           <span>ADD</span>
           <i data-lucide="plus" class="w-3.5 h-3.5"></i>
         </button>`
      : `<div class="flex items-center gap-2 bg-orange-500 text-white px-2.5 py-1.5 rounded-xl shadow-md">
           <button onclick="decrementCart(${item.id})" class="w-6 h-6 flex items-center justify-center font-black text-sm leading-none active:scale-90">-</button>
           <span class="text-xs font-black px-1">${qty}</span>
           <button onclick="addToCart(${item.id})" class="w-6 h-6 flex items-center justify-center font-black text-sm leading-none active:scale-90">+</button>
         </div>`;

    return `
      <div class="food-card bg-[var(--card-bg)] rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between overflow-hidden">
        <!-- Card Image & Floating Badges -->
        <div class="h-44 sm:h-48 w-full overflow-hidden card-img-wrap relative bg-slate-100">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" loading="lazy">
          <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            ${vegBadge}
            ${bestsellerBadge}
          </div>
          <div class="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-lg">
            ₹${item.price}
          </div>
        </div>

        <!-- Card Details -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="text-sm font-extrabold text-slate-900 leading-snug mb-1.5">${item.name}</h4>
            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">${item.description}</p>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
            <div>
              <span class="text-[10px] text-slate-400 block font-semibold">Price</span>
              <span class="text-sm font-black text-slate-900">₹${item.price}</span>
            </div>
            <div>${actionBtn}</div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

// ------------------------------------------
// 5. Cart Operations
// ------------------------------------------
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  renderMenuItems();
}

function decrementCart(id) {
  if (cart[id]) {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
  }
  updateCartUI();
  renderMenuItems();
}

function updateCartUI() {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find(m => m.id == id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  // Bottom Floating Bar
  const cartBar = document.getElementById("cart-bar");
  const cartBadge = document.getElementById("cart-badge");
  const cartPrice = document.getElementById("cart-total-price");

  // Desktop Header Cart
  const headerBadge = document.getElementById("header-cart-badge");
  const headerPrice = document.getElementById("header-cart-price");

  if (headerBadge) headerBadge.innerText = totalItems;
  if (headerPrice) headerPrice.innerText = `₹${totalPrice.toLocaleString("en-IN")}`;

  if (totalItems > 0) {
    cartBar.classList.remove("hidden");
    cartBadge.innerText = totalItems;
    cartPrice.innerText = `₹${totalPrice.toLocaleString("en-IN")}`;
    cartBadge.classList.add("cart-pop");
    setTimeout(() => cartBadge.classList.remove("cart-pop"), 300);
  } else {
    cartBar.classList.add("hidden");
  }
}

// ------------------------------------------
// 6. Commission Savings Calculator
// ------------------------------------------
function setupCalculator() {
  const slider = document.getElementById("calc-slider");
  const salesLabel = document.getElementById("calc-sales-label");
  const lossLabel = document.getElementById("calc-loss");
  const savedLabel = document.getElementById("calc-saved");

  function update() {
    const val = parseInt(slider.value, 10);
    salesLabel.innerText = `₹${val.toLocaleString("en-IN")}`;
    
    // 25% average aggregator cut
    const monthlyCut = Math.round(val * 0.25);
    const yearlySaved = monthlyCut * 12;

    lossLabel.innerText = `₹${monthlyCut.toLocaleString("en-IN")}/mo`;
    savedLabel.innerText = `₹${yearlySaved.toLocaleString("en-IN")}/yr`;
  }

  slider.addEventListener("input", update);
  update();
}

// ------------------------------------------
// 7. Search Bar Setup
// ------------------------------------------
function setupSearch() {
  const input = document.getElementById("search-input");
  input.addEventListener("input", () => {
    renderMenuItems();
  });
}

// ------------------------------------------
// 8. Cart & Checkout Modal
// ------------------------------------------
function openCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.classList.remove("hidden");
  renderModalCartItems();
}

function closeCartModal() {
  document.getElementById("cart-modal").classList.add("hidden");
}

function setOrderType(type) {
  orderType = type;
  const btnDine = document.getElementById("btn-type-dinein");
  const btnTake = document.getElementById("btn-type-takeaway");
  const btnDelv = document.getElementById("btn-type-delivery");
  const locLabel = document.getElementById("location-label");
  const locInput = document.getElementById("cust-location");

  [btnDine, btnTake, btnDelv].forEach(btn => {
    btn.className = "py-2 text-xs font-semibold rounded-lg bg-white text-slate-700 border border-slate-200";
  });

  if (type === "dinein") {
    btnDine.className = "py-2 text-xs font-semibold rounded-lg bg-orange-500 text-white shadow-sm";
    locLabel.innerText = "Table Number / Zone (If dining in):";
    locInput.placeholder = "e.g. Table #4 or Sunset Cabana #2";
  } else if (type === "takeaway") {
    btnTake.className = "py-2 text-xs font-semibold rounded-lg bg-orange-500 text-white shadow-sm";
    locLabel.innerText = "Pickup Time:";
    locInput.placeholder = "e.g. In 20 minutes";
  } else if (type === "delivery") {
    btnDelv.className = "py-2 text-xs font-semibold rounded-lg bg-orange-500 text-white shadow-sm";
    locLabel.innerText = "Delivery Address in Virar / Vasai *:";
    locInput.placeholder = "e.g. Flat 302, Gokul Paradise, Bolinj, Virar West";
  }
}

function renderModalCartItems() {
  const container = document.getElementById("modal-cart-items");
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">Your cart is empty. Please add delicious dishes!</p>`;
    document.getElementById("bill-subtotal").innerText = "₹0";
    document.getElementById("bill-total").innerText = "₹0";
    return;
  }

  let subtotal = 0;
  container.innerHTML = entries.map(([id, qty]) => {
    const item = MENU_ITEMS.find(m => m.id == id);
    if (!item) return "";
    const itemTotal = item.price * qty;
    subtotal += itemTotal;

    return `
      <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div class="flex-1 pr-3">
          <p class="text-xs sm:text-sm font-bold text-slate-800 leading-tight">${item.name}</p>
          <p class="text-[11px] text-slate-500 mt-0.5">₹${item.price} x ${qty} = <span class="font-bold text-slate-800">₹${itemTotal}</span></p>
        </div>
        <div class="flex items-center gap-2.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
          <button onclick="decrementCart(${item.id}); renderModalCartItems();" class="text-slate-600 font-black text-xs hover:text-black">-</button>
          <span class="text-xs font-extrabold text-slate-800 px-1">${qty}</span>
          <button onclick="addToCart(${item.id}); renderModalCartItems();" class="text-slate-600 font-black text-xs hover:text-black">+</button>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("bill-subtotal").innerText = `₹${subtotal.toLocaleString("en-IN")}`;
  document.getElementById("bill-total").innerText = `₹${subtotal.toLocaleString("en-IN")}`;
}

// ------------------------------------------
// 9. Send WhatsApp Order Message
// ------------------------------------------
function sendOrderToWhatsApp() {
  const name = (document.getElementById("cust-name").value || "").trim();
  const phone = (document.getElementById("cust-phone").value || "").trim();
  const location = (document.getElementById("cust-location").value || "").trim();
  const notes = (document.getElementById("cust-notes").value || "").trim();

  if (!name) {
    alert("Please enter your name!");
    document.getElementById("cust-name").focus();
    return;
  }
  if (!phone) {
    alert("Please enter your phone number!");
    document.getElementById("cust-phone").focus();
    return;
  }

  const entries = Object.entries(cart);
  if (entries.length === 0) {
    alert("Please add some items to your cart first!");
    return;
  }

  let subtotal = 0;
  let itemsListText = "";

  entries.forEach(([id, qty]) => {
    const item = MENU_ITEMS.find(m => m.id == id);
    if (item) {
      const itemTotal = item.price * qty;
      subtotal += itemTotal;
      itemsListText += `• ${qty}x ${item.name} (₹${itemTotal})\n`;
    }
  });

  const cafeName = THEMES[currentTheme].name;
  const orderTypeDisplay = (orderType === "dinein") ? "🍽️ Dine-In" : (orderType === "takeaway") ? "🛍️ Takeaway" : "🛵 Home Delivery";

  let msg = `🍽️ *NEW ORDER - ${cafeName.toUpperCase()}*\n`;
  msg += `----------------------------------\n`;
  msg += `📍 *Order Type:* ${orderTypeDisplay}\n`;
  msg += `👤 *Customer Name:* ${name}\n`;
  msg += `📞 *Customer Phone:* ${phone}\n`;
  if (location) {
    msg += `📍 *Table / Address:* ${location}\n`;
  }
  msg += `----------------------------------\n`;
  msg += `📋 *ORDER SUMMARY:*\n${itemsListText}`;
  msg += `----------------------------------\n`;
  msg += `💰 *Subtotal:* ₹${subtotal.toLocaleString("en-IN")}\n`;
  msg += `🚚 *Delivery Fee:* FREE\n`;
  msg += `💵 *TOTAL PAYABLE:* ₹${subtotal.toLocaleString("en-IN")} (UPI / Cash)\n`;
  if (notes) {
    msg += `📝 *Cooking Notes:* ${notes}\n`;
  }
  msg += `----------------------------------\n`;
  msg += `⚡ *Placed via Direct 0% Commission Website Store*`;

  const encodedUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  window.open(encodedUrl, "_blank");
}

// ------------------------------------------
// 10. Table & Cabana Booking Logic
// ------------------------------------------
function openBookingModal() {
  document.getElementById("booking-modal").classList.remove("hidden");
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("book-date");
  if (dateInput && !dateInput.value) dateInput.value = today;
}

function closeBookingModal() {
  document.getElementById("booking-modal").classList.add("hidden");
}

function sendBookingToWhatsApp() {
  const name = (document.getElementById("book-name").value || "").trim();
  const date = (document.getElementById("book-date").value || "").trim();
  const time = document.getElementById("book-time").value;
  const guests = document.getElementById("book-guests").value;
  const zone = document.getElementById("book-zone").value;
  const occasion = (document.getElementById("book-occasion").value || "").trim();

  if (!name) {
    alert("Please enter your name!");
    document.getElementById("book-name").focus();
    return;
  }

  const cafeName = THEMES[currentTheme].name;

  let msg = `🌴 *TABLE / CABANA RESERVATION - ${cafeName.toUpperCase()}*\n`;
  msg += `----------------------------------\n`;
  msg += `👤 *Guest Name:* ${name}\n`;
  msg += `📅 *Booking Date:* ${date}\n`;
  msg += `⏰ *Time Slot:* ${time}\n`;
  msg += `👥 *Party Size:* ${guests}\n`;
  msg += `🏖️ *Seating Zone:* ${zone}\n`;
  if (occasion) {
    msg += `🎉 *Special Request:* ${occasion}\n`;
  }
  msg += `----------------------------------\n`;
  msg += `Please confirm table availability for us! Thank you.`;

  const encodedUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  window.open(encodedUrl, "_blank");
  closeBookingModal();
}

// ------------------------------------------
// 11. Settings Modal
// ------------------------------------------
function toggleSettingsModal() {
  const modal = document.getElementById("settings-modal");
  modal.classList.toggle("hidden");
}

function saveTargetPhone() {
  const val = (document.getElementById("target-phone-input").value || "").trim().replace(/[^0-9]/g, "");
  if (val.length >= 10) {
    targetPhone = val.startsWith("91") ? val : `91${val}`;
    updatePhoneDisplay();
    toggleSettingsModal();
    alert(`Target WhatsApp number updated to: +${targetPhone}`);
  } else {
    alert("Please enter a valid 10-digit mobile number!");
  }
}
