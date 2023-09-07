const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
 const btnClose = document.querySelector('#cart-close');


  btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
 });
 btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
 });

 document.addEventListener('DOMContentLoaded' , loadfood);
 function loadfood(){
   loadContent();
 }
 function loadContent(){
    // Removing the items from the cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((item)=>{
        item.addEventListener('click', removeItem);
    });

    // changing the quantity of the item
    let btnQuantity = document.querySelectorAll('.cart-quantity');
    btnQuantity.forEach((input)=>{
        input.addEventListener('change', QuantityChange)
    });
 
     // adding item to the cart
    let btnAddcart = document.querySelectorAll('.add-cart');
      btnAddcart.forEach((value)=>{
        value.addEventListener('click', AddtoCart);
    });
    updateTotal();
 }

 // Removing Item 
 function removeItem(){
    this.parentElement.remove();
    let tittle = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList= itemList.filter(ele => ele.title !=tittle);
    loadContent();
 };
 
 // changing the quanity of the item
 function QuantityChange(){
    if(isNaN(this.value) || this.value<1){
        this.value = 1;
    }
    loadContent();

 };

 let itemList = [];

function AddtoCart(){
  let foodCart = this.parentElement;
  let title = foodCart.querySelector('.food-title').innerHTML;
  let price = foodCart.querySelector('.food-price').innerHTML;
  let image = foodCart.querySelector('.food-img').src;
//   console.log(title,price,image);

// checking if the already exist in the cart 
let newcartList = {title,price,image};
if(itemList.find((ele)=> ele.title == newcartList.title))
  { 
   alert('The item already exist in the cart')
   return;
  }
  else{
    itemList.push(newcartList);
  };
  
   let newProduct = createCartProduct(title,price,image);
   let element = document.createElement('div');
   element.innerHTML=newProduct;
   let newCart = document.querySelector('.cart-content');
   newCart.append(element);
   loadContent();

   // your cart is empty 
   const cartMessage = document.querySelector(".cart-message");
    if(itemList.length == 0){
      cartMessage.style.display = "block";
    }
   else{
      cartMessage.style.display = "none";
   }
}



 function createCartProduct(title,price,image){
 return `
             <div class="cart-box">
                <img src="${image}" class="cart-img">
                <div class="detail-box">
                  <div class="cart-food-title">${title}</div>
                  <div class="price-box">
                    <div class="cart-price">${price}</div>
                     <div class="cart-amt">${price}</div>
                 </div>
                  <input type="number" value="1" class="cart-quantity">
                </div>
                <ion-icon name="trash" class="cart-remove"></ion-icon>
              </div> `;
 }

function updateTotal(){
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');
 let  total = 0 ;

 cartItems.forEach(item =>{
  let PriceElement =  item.querySelector('.cart-price');
  let price = parseInt(PriceElement.innerHTML.replace('Rs.',''));
  let qty = item.querySelector('.cart-quantity').value;
  total +=(price *qty);
  item.querySelector('.cart-amt').innerText  = "Rs."+price *qty
});

  totalValue.innerHTML="Rs."+ total;

  // Adding the count value in the cart 
  let CartCount = document.querySelector('.cart-count');
   let count = itemList.length;
   CartCount.innerHTML=count;
   if(count == 0){
      CartCount.style.display = "none";
   }
   else{
      CartCount.style.display = "block";
   }
 }


