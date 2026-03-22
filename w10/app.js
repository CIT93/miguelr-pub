console.log('Hello from app.js! Your JavaScript is connected and running!');
import * as orderHandler from './order-handler.js';
import * as calculator from './price-calculator.js';
import * as resultsDisplay from './results-display.js';
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

const orderForm = document.getElementById('orderForm');

const messageDisplayElement = document.getElementById('ordersummary');

const orders = []


const handleOrderSubmit = function (event) {
    event.preventDefault();
    const formData = orderHandler.getOrderInputs();



    const calculatedPrice = calculator.calculateTotal(formData.qty, formData.giftwrap);

    const orderId = document.getElementById('order-id').value;
    // app.js - inside handleOrderSubmit

    if (orderId) {
        const index = orders.findIndex(order => order.id === orderId);

        if (index !== -1) {
            orders[index] = {
                ...orders[index],
                ...formData,
                totalPrice: calculatedPrice
            };
        }


    }else{
        const newOrder = {
            id: Date.now().toString(),
            ...formData, 
            totalPrice: calculatedPrice, 
            timeStamp: new Date().toDateString()
        }; 
        orders.push(newOrder)
    }
    orderStorage.saveOrders(orders); 
    orderList.renderOrders(orders, {
        onDelete: handleDelete, 
        onEdit: handleEdit
    }); 

   document.getElementById('order-id').value= ''; 
   orderForm.reset(); 
}; 



// app.js

const handleDelete = function (id) {
    console.log("App.js: Requesting delete for order", id);
    const indexToDelete = orders.findIndex(function (entry) {
        return entry.id === id;
    });
    if (indexToDelete !== -1) {
        orders.splice(indexToDelete, 1);
        orderStorage.saveOrders(orders);
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
    };
};

const handleEdit = function (id) {
    console.log("App.js: Requesting edit for order", id);
    const order = orders.find(function (entry) {
        return entry.id === id;
    });

    if (!order) return;
    document.getElementById('qty').value = order.qty;

    const sizeRadio = document.querySelector(
        `input[name="size"][value="${order.size}"]`);

    if (sizeRadio) {
        sizeRadio.checked = true;
    }

    document.getElementById('giftwrap').checked = order.giftwrap;
    document.getElementById('order-id').value = order.id;

    window.scrollTo({ top: 0, behavior: 'smooth' });


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
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
    } else {
        console.log('Orders not loaded. Starting Fresh! ')
    }


};



document.addEventListener('DOMContentLoaded', init);


