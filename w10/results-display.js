
const orderSummary = document.getElementById('orderSummary');

const displayTotalInput = orderSummary.querySelector('#displayTotal');

const displayQtyInput = orderSummary.querySelector('#displayQty')

const displaySizeInput = orderSummary.querySelector('#displaySize')

const displayGiftInput = orderSummary.querySelector('#displayGift')


export const displayOrder = function(order){
    displayTotalInput.textContent = order.totalPrice
    displayQtyInput.textContent = order.qty
    displaySizeInput.textContent = order.size
    if(order.giftwrap){displayGiftInput.textContent = "yes"}
    else{displayGiftInput.textContent = "No"}; 
}