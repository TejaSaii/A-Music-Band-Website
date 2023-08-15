if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}
else {
  ready();
}

function ready() {
  var removeBtnElements = document.getElementsByClassName('btn-danger');
  for (let i = 0; i < removeBtnElements.length; i++) {
    var button = removeBtnElements[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityElements = document.getElementsByClassName('cart-quantity-input');
  for (let i = 0; i < quantityElements.length; i++) {
    var theQuantityElement = quantityElements[i];
    theQuantityElement.addEventListener('change', changedQuantity);
  }

  var addToCartButtons = document.getElementsByClassName('add-cart-btn');
  [...addToCartButtons].forEach(addButton => {
    addButton.addEventListener('click', addToCartClicked);
  });

  var purchaseButton = document.getElementsByClassName('btn-purchase')[0];
  purchaseButton.addEventListener('click', purchaseItems);
}

function purchaseItems(event) {
  var totalPriceElement = document.getElementsByClassName('total-price')[0];
  var totalPrice = totalPriceElement.innerText;
  var cleanPrice = parseFloat(totalPrice.replace('$', ''));
  if(cleanPrice == 0){
    alert('Please add items to cart to purchase items!');
  }
  else {
    var cartItems = document.getElementsByClassName('cart-items-container')[0];
    while(cartItems.hasChildNodes()){
      cartItems.removeChild(cartItems.lastChild);
    }
    totalPriceElement.innerText = '$0';
    alert('Items purchased, Total amount: '+totalPrice);
  }
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItemElement = button.parentElement.parentElement;
  var title = shopItemElement.getElementsByClassName('shop-item-header')[0].innerText;
  var price = shopItemElement.getElementsByClassName('shop-item-price')[0].innerText;
  var imgSrc = shopItemElement.getElementsByClassName('cart-item-image')[0].src;
  addItemToCart(title, price, imgSrc);
}

function addItemToCart(title, price, imgSrc) {
  var cartItemsContainer = document.getElementsByClassName('cart-items-container')[0];
  var itemTitles = cartItemsContainer.getElementsByClassName('item-title');
  for(let i = 0; i < itemTitles.length; i++) {
    if(itemTitles[i].innerText == title){
      alert('Item is already added to the cart');
      return;
    }
  }
  var newDiv = document.createElement('div');
  newDiv.classList.add('cart-row');
  var cartItemContent = `
          <div class="cart-item cart-column">
              <img class="cart-item-image" src="${imgSrc}" width="100px">
              <span class="item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1" />
              <button class="btn btn-danger" role="button">REMOVE</button>
          </div>`;
  newDiv.innerHTML = cartItemContent;
  cartItemsContainer.append(newDiv);
  newDiv.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  newDiv.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changedQuantity);
  updateCartTotal();
}

function changedQuantity(event) {
  console.log(event);
  var quantity = event.target.value;
  if (isNaN(quantity) || quantity <= 0) {
    event.target.value = 1;
  }
  else {
    updateCartTotal();
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items-container')[0];
  var cartItems = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (let i = 1; i < cartItems.length; i++) {
    let cartItem = cartItems[i];
    var priceElement = cartItem.getElementsByClassName('cart-price')[0];
    var quantityElement = cartItem.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  var totalPriceElement = document.getElementsByClassName('total-price')[0];
  totalPriceElement.innerText = `$${total}`;
}