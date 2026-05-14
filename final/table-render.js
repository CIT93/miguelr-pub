



const tbody = document.querySelector('#history-list');
const table = document.getElementById('history'); 
const emptyMessage = document.getElementById('noEntriesMessage');



let _currentCallBacks = {}; 

const handleTableClick = (event) => {
    const target = event.target;
   


    if (target.classList.contains('delete') && typeof _currentCallBacks.onDelete === 'function') {
    // Extract the ID from the data-id attribute
     const id = target.dataset.id;
    // Call the function we passed from app.js
    _currentCallBacks.onDelete(id);
    } else if (
        target.classList.contains('edit') && typeof _currentCallBacks.onEdit === 'function'){
        const id = target.dataset.id; 
     _currentCallBacks.onEdit(id); 

    }
    


}; 


export const renderedTable = (data, callbacks) => {

 _currentCallBacks = callbacks

    if (!tbody) {
        console.error('table body not found');
        return;
    }

    tbody.innerHTML = '';
    if (!data || data.length === 0) {

        table.style.display = 'none'
        emptyMessage.style.display = 'block';
      
        console.log('No Entries to display table hidden')
        return
    } else {
        table.style.display = 'table'
        emptyMessage.style.display = 'none'

    }
    
    data.forEach(entry => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${new Date(entry.timestamp).toLocaleDateString()}</td>
        <td>${entry.skateType}</td>
        <td>${entry.skateSession}</td>
        <td>${entry.moodType}</td>
        <td class="action-cell">
            <button class="action-button edit" data-id="${entry.id}">Edit</button>
            <button class="action-button delete" data-id="${entry.id}">Delete</button>
        </td>
        `; 
        tbody.appendChild(row); 
    });

}; 
    document.querySelector('#history-list').addEventListener('click', handleTableClick);

    
