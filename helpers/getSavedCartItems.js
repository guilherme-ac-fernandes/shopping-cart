const getSavedCartItems = () => {
  try {
    const cartSection = document.querySelector('.cart__items');
    cartSection.innerHTML = localStorage.getItem('cartItems');
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
