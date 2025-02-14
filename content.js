// Fetch coupons from GitHub
function fetchCoupons() {
  fetch('https://raw.githubusercontent.com/Timessless01/CouponCatcher/main/coupons.json')
    .then(response => response.json())
    .then(data => {
      const store = window.location.hostname.replace('www.', '');
      const storeData = data.find(item => item.store.toLowerCase() === store);
      if (storeData) {
        const couponList = storeData.codes.join(', ');
        // Inject a banner into the page
        const banner = document.createElement('div');
        banner.innerHTML = `
          <div style="position: fixed; top: 10px; right: 10px; background: yellow; padding: 10px;">
            <b>Coupons:</b> ${couponList}<br>
            <a href="${storeData.affiliateLink}" target="_blank">Click here to support us!</a>
          </div>
        `;
        document.body.appendChild(banner);
      }
    });
}

// Initial fetch
fetchCoupons();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'refreshCoupons') {
    fetchCoupons();
  }
});