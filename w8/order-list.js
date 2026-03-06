const orderHistorySection = document.getElementById('orderHistorySection');

const orderTable = document.getElementById('orderTable'); 

const orderTableBody = orderTable.querySelector('tbody')

let moduleCallbacks = {}; 

const formatDateDisplay = function(timeStamp){
    const date = new Date(timeStamp); 
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day:'numeric'
    });
};

const formatQtyDisplay = function(qty){
    return qty.toString(); 

};
const formatRadioValue = function(size, giftwrap){
    let text = ''
    switch(size){
        case "S": text = "small"; break ; 
        case "M": text = "medium"; break; 
        case "L": text = "large"; break; 
        default: text = size; 
    }; 
    return giftwrap ?text + '+ Gift':text; 

}; 

const tableBody = document.getElementById('order-table-body');

orderTableBody.addEventListener('click', function (event) {
    const target = event.target;


    const id = target.dataset.id;

    if (!id) return;

    if(target.classList.contains('editbtn')){
        if(moduleCallbacks.onEdit){
            moduleCallbacks.onEdit(id)
        }
    }

     if(target.classList.contains('deletebtn')){
        if (moduleCallbacks.onDelete) {
            moduleCallbacks.onDelete(id)
        }
    }

    //console.log("Clicked button with ID:", id); 
});


export const renderOrders = function(orders, callbacks){
    orderTableBody.innerHTML = ''

    moduleCallbacks = callbacks

    if(orders.length === 0){
        orderHistorySection.style.display ='none'
        orderTable.style.display = 'none'
        return;
    }else {
        orderHistorySection.style.display = 'block'
        orderTable.style.display = 'table'
    }

    orders.forEach(entry => { 
        const row = document.createElement('tr')
        
        row.dataset.id = entry.id; 
        row.innerHTML =`
        <td>${formatDateDisplay(entry.timeStamp)}</td> 
        <td>${formatQtyDisplay(entry.qty)}</td> 
        <td>${formatRadioValue(entry.size)}</td> 
        <td>${entry.totalPrice.toFixed(2)}</td>
        <td>
            <button class= "editbtn" data-id="${entry.id}">Edit</button>
            <button class= "deletebtn" data-id="${entry.id}">Delete</button> 
            </td>
            `; 
        


        orderTableBody.appendChild(row) 

      
        
    });

 }

