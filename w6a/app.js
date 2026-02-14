console.log('Hello from app.js! Your JavaScript is connected and running!');
import * as orderHandler from './order-handler.js'; 
import * as calculator from './price-calculator.js'; 
import * as resultsDisplay from './results-display.js' 
const orderForm = document.getElementById('orderForm');

const messageDisplayElement = document.getElementById ('ordersummary');

const orders = []


const handleOrderSubmit = function(event){
    event.preventDefault();
    const formData = orderHandler.getOrderInputs();
    
       

        const calculatedPrice = calculator.calculateTotal(formData.qty, formData.giftwrap); 

        
        const newOrder = {
            ...formData, 
            total:calculatedPrice, 
            giftwrap:formData.giftwrap, 
            timeStamp: new Date().toISOString(),
           
         }
            orders.push(newOrder); 

           resultsDisplay.displayOrder(newOrder)
        
    }; 
    

   


const init = function(){
    console.log('App initialized: DOM is Ready! Try Submiting the form')
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit',handleOrderSubmit);

}



document.addEventListener('DOMContentLoaded', init);


 