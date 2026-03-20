
const shirtPrice = 15; 
const giftWrapPrice = 2;

export const calculateTotal = function(qty, giftWrapSelected) {
  let totalPrice = qty * shirtPrice;

  if (giftWrapSelected) {
    totalPrice += giftWrapPrice;
  }

  return totalPrice;
};



 
 



export const calculatedPrice = function(data){
    const shirtPrice = calculateTotal(data.qtyInput) 

}
