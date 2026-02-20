console.log('Hello from app.js! Your JavaScript is connected and running!');
import * as orderHandler from './order-handler.js'; 
import * as calculator from './price-calculator.js'; 
import * as resultsDisplay from './results-display.js'; 
import * as orderStorage from './order-storage.js'; 
import * as orderList from './order-list.js';
const orderForm = document.getElementById('orderForm');

const messageDisplayElement = document.getElementById ('ordersummary');

const orders = []


const handleOrderSubmit = function(event){
    event.preventDefault();
    const formData = orderHandler.getOrderInputs();
    
       

        const calculatedPrice = calculator.calculateTotal(formData.qty, formData.giftwrap); 

        
        const newOrder = {
            ...formData, 
            totalPrice:calculatedPrice, 
            gift: formData.giftwrap, 
            id: orderStorage.generateUniqueId(),
            timeStamp: new Date().toISOString(),
           
         }
            orders.push(newOrder); 
            orderStorage.saveOrders(orders); 
            orderList.renderOrders(orders)

           resultsDisplay.displayOrder(newOrder)
        
    }; 
    

   


const init = function () {
    console.log('App initialized: DOM is Ready! Try Submiting the form')
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', handleOrderSubmit);

    const ordersLoaded = orderStorage.loadOrders();
    if (ordersLoaded.length > 0) {

        orders.push(...ordersLoaded);
        console.log('Orders loaded:')
         // Render the full list instead of just the last one
        orderList.renderOrders(orders);
    } else {
        console.log('Orders not loaded. Starting Fresh! ')
    }


}



document.addEventListener('DOMContentLoaded', init);


 