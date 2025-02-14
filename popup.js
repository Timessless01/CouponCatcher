// Fetch coupons from GitHub
fetch('https://raw.githubusercontent.com/Timessless01/CouponCatcher/main/coupons.json')
  .then(response => response.json())
  .then(data => {
    const store = window.location.hostname.replace('www.', '');
    const storeData = data.find(item => item.store.toLowerCase() === store);
    if (storeData) {
      displayCoupons(storeData.codes);
    } else {
      displayCoupons([]); // No coupons found for this store
    }
  })
  .catch(error => {
    console.error("Error fetching coupons:", error);
    displayCoupons([]); // Fallback if fetch fails
  });

// Display coupons in the popup
function displayCoupons(coupons = []) {
  const couponList = document.getElementById("coupon-list");
  couponList.innerHTML = ""; // Clear previous results

  if (coupons.length === 0) {
    couponList.innerHTML = `<div style="text-align: center; color: #888;">No coupons found for this store.</div>`;
    return;
  }

  coupons.forEach(coupon => {
    const couponItem = document.createElement("div");
    couponItem.className = "coupon-item";
    couponItem.innerHTML = `
      <div class="coupon-code">${coupon.code}</div>
      <div>${coupon.description}</div>
      <button class="copy-button" data-code="${coupon.code}">Copy</button>
    `;
    couponList.appendChild(couponItem);
  });

  // Add copy functionality
  document.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", () => {
      const code = button.getAttribute("data-code");
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => button.textContent = "Copy", 2000);
      });
    });
  });
}

// Search functionality
document.getElementById("search").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const couponItems = document.querySelectorAll(".coupon-item");

  couponItems.forEach(item => {
    const code = item.querySelector(".coupon-code").textContent.toLowerCase();
    const description = item.querySelector("div").textContent.toLowerCase();
    if (code.includes(searchTerm) || description.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});