const orderHistorySection = document.getElementById('orderHistorySection');

const orderTable = document.getElementById('orderTable'); 

const orderTableBody = orderTable.querySelector('tbody')

export const renderOrders = function(orders){
    orderTableBody.innerHTML = ''

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
        row.innerHTML = `
        <td>${formateDateForDisplay(entry.timestamp)}</td> 
        <td>${formateQtyForDisplay(entry.qty)}</td> 
        <td>${formateRadioValue(entry.size)}</td> 
        <td>${entry.calculatedPrice}</td> `; 

        orderTableBody.appendChild(row) 

      
        
    });

}