// Inject after page loads
window.addEventListener('load', () => {
  // Only run on product pages (URL contains "/dp/")
  if (window.location.href.includes('/dp/')) {
    // Create the button
    const couponButton = document.createElement('button');
    couponButton.textContent = '🚀 Claim Coupons (Free!)';
    couponButton.style.cssText = `
      background: #FF9900;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin: 15px 0;
    `;

    // Add affiliate link logic
    couponButton.onclick = () => {
      const currentUrl = new URL(window.location.href);
      
      // Add YOUR AFFILIATE TAG
      currentUrl.searchParams.set('tag', 'couponcatch0a-20'); // Your ID here
      
      // Redirect to Amazon's coupon section for this product
      window.location.href = `${currentUrl.toString()}#promotions`;
    };

    // Insert near the price/buy box
    const buyBox = document.getElementById('buybox') || 
                   document.querySelector('[data-feature-name="buybox"]');
    if (buyBox) {
      buyBox.prepend(couponButton);
    }
  }
});