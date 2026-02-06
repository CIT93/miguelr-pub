console.log('Hello from app.js! Your JavaScript is connected and running!');
import * as orderHandler from './order-handler.js'; 
import * as calculator from './price-calculator.js'; 
const orderForm = document.getElementById('orderForm');

const messageDisplayElement = document.getElementById ('ordersummary');

const orders = []


const handleOrderSubmit = function(event){
    event.preventDefault();
    const formData = orderHandler.getOrderInputs();
    
        console.log(`Order Inputs - Object Literal:`);
        console.log(`key of qty value of  ${formData.qty}`);
        console.log(`key of giftwrap value of  ${formData.giftwrap}`);
        console.log(`key of size value of  ${formData.size}`);
        console.log(formData)

        const calculatedPrice = calculator.calculateTotal(formData.qty, formData.giftwrap); 

        
        const newEntry = {
            ...formData, 
            total:calculatedPrice, 
            timeStamp: new Date().toISOString(),
           
         }
            orders.push(newEntry); 

            console.log("Orders array:",orders); 

            messageDisplayElement.textContent = `Ordered ${formData.qty} ${formData.size} T-Shirts. Total: $${calculatedPrice}`;
    }; 
    





const init = function(){
    console.log('App initialized: DOM is Ready! Try Submiting the form')
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit',handleOrderSubmit);

}



document.addEventListener('DOMContentLoaded', init);


