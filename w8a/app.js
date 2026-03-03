
// Week 5.1: Now save entries to localStorage after submission.

// --- 4.1 - Part 1: Create calculator.js module and code household points function ---
console.log('Hello from app.js! Your JavaScript is connected and running!');
//--- Part 3: Implement the form-handler.js module ---
// Import the form-handler module so we can use its functions.
// Week 4.2: Part 1 Now calculates points, displays results, AND stores entries in an in-memory array.
// Display the calculated results for the current entry on the page.

import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js'; 
import * as storage from './storage.js'; 
import * as tableRenderer from './table-renderer.js'; 
// 6.1 We will modify the handleFormSubmit function to trigger the table update after a new entry.
// We will modify the init function to render the table immediately on page load with any loaded data.

// Declare a 'const' array to hold all submitted carbon footprint entries in memory.
// We use 'const' because the 'carbonFootprintEntries' variable will always refer
// to the same array, even though the array's contents will change (items added)

const carbonFootprintEntries = []; // Empty Array Literal = Global Variable 

// --- Part 1: Function, EventListener and References ---


// We get references to the HTML elements our JavaScript needs to interact with.
// We use 'const' because these references themselves won't change, even if their content does.
// Get a reference to the main form element by its ID.
const carbonFootprintForm = document.getElementById('carbonFootprintForm'); 

// Using form.querySelector() is good practice for elements inside a specific parent (our form).
//const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers'); 

// Get a reference to the 'Clear Form' button.
const clearFormButton = document.getElementById('clearFormButton');

// --- Part 2: Code handleFormSubmit and handleClearForm Functions ---

// Get reference to Clear All Data button
const clearAllDataButton = document.getElementById('clearAllDataButton')

// State variables for in-line confirmation of "Clear All Data" button.
let isConfirmingClearAll = false; // Tracks if the button is in a "confirming" state.
let clearAllTimeoutId = null; // Stores the ID returned by setTimeout, so we can cancel it.
// Resets the "Clear All Data" button to its original text and appearance.
const resetClearAllButton = function(){
    // Clears any pending confirmation timeout.
    console.log(clearAllTimeoutId); 
    if(clearAllTimeoutId){
        // If a timeout is active (meaning the button is in a confirming state), clear it.
        clearTimeout(clearAllTimeoutId); 
    }
    // Reset the confirmation state
    isConfirmingClearAll = false; 
    // Restore original button text and remove any special styling class.
    clearAllDataButton.textContent = 'Clear All Saved Data';
    clearAllDataButton.classList.remove('danger-button'); 
    clearAllDataButton.classList.remove('confirm-state'); 
    // Re-add danger-button if it was removed (it's part of initial styling)
    clearAllDataButton.classList.add('danger-button');

}; 
// Resets all UI-related confirmation states across the application.
const resetAllUIStates = function(){
    // This function is called when major actions (like form submit, clear, delete) occur, ensuring a clean UI state.
    //add to any function that updates DOM
    // This will be expanded in later weeks to include table row confirmations
    resetClearAllButton();
}

// Handles the Form submission event.
// @param {Event} event - The event object provided by the browser.
const handleFormSubmit = function(event) {
    event.preventDefault();

    const formData = formHandler.getFormInputs();
    const calculatedResults = calculator.calculateFootprint(formData)

    const newEntry = { 
        ...formData,
        ...calculatedResults, 
        id: storage.generateUniqueId(),
        timestamp: new Date().toISOString()
    }; 

    carbonFootprintEntries.push(newEntry);
    // Log the full array!
    console.log(carbonFootprintEntries);

    // Save the entire 'carbonFootprintEntries' array to localStorage using our storage module.
    storage.saveEntries(carbonFootprintEntries);

    //console.log(calculatedResults);
    resultsDisplay.displayResults(calculatedResults);
    tableRenderer.renderTable(carbonFootprintEntries,  {
            onDelete: handleDeleteEntry, 
            onEdit: handleEditEntry
        }); 
    resetAllUIStates(); 
}; 
// New function to perform the actual clearing of all saved data.
const performClearAllData = function(){
// Setting length to 0 efficiently clears the array while keeping its const reference.
    carbonFootprintEntries.length = 0; 
    console.log("In-memory array cleared:", carbonFootprintEntries); 
    storage.clearAllEntries(); 
    // Re-render table (will show "No entries")
    tableRenderer.renderTable(carbonFootprintEntries,  {
            onDelete: handleDeleteEntry, 
            onEdit: handleEditEntry
        }); 
    // Clear the form inputs
    formHandler.clearForm(); 
    // Hide the results section
    resultsDisplay.hideResults(); 
    resetAllUIStates(); 
    
}

// Handles the Clear Form button.
const handleClearForm = function() { 
    //call clearform function from formHandler module
    formHandler.clearForm();
    // The form.reset() method is a built-in browser function that resets all form fields
    // back to their initial values as defined in the HTML.
    // Manually ensure the default value for 'householdMembers' is 1.
    //carbonFootprintForm.reset();
    // Manually ensure the default value for 'householdMembers' is 1.
    //householdMembersInput.value = 1; 
    resultsDisplay.hideResults();
    console. log('Clear button clicked');
    resetAllUIStates(); 
}; 
// Handles the "Delete" action for a specific entry.
const handleDeleteEntry = function(id){
    console.log(`Delete button clicked for ID: ${id} functionality added in week 7.1 `);
    // 1. Find the index of the entry to delete in our in-memory array.
    const indexToDelete = carbonFootprintEntries.findIndex(function(entry){
       return entry.id === id; 
    });
    if(indexToDelete !== -1){
        // 2. Remove the entry from the in-memory array using splice().
        carbonFootprintEntries.splice(indexToDelete, 1); 
        console.log(`Entry removes from memory`);
        // 3. Save the modified (smaller) array back to localStorage.
        storage.saveEntries(carbonFootprintEntries); 
        // 4. Re-render the table to reflect the deletion.
        tableRenderer.renderTable(carbonFootprintEntries, {
            onDelete: handleDeleteEntry, 
            onEdit: handleEditEntry
        });
        // 5. If the table is now empty, hide the results section and clear the form.
        if(carbonFootprintEntries.length === 0){
            resultsDisplay.hideResults();
            formHandler.clearForm();
            // Reset states even if entry not found (e.g., error case)
        }
        resetAllUIStates();
    }else {
        console.log(`did not find index`)
         resetAllUIStates();
    };
};
// Handles the "Edit" action for a specific entry.
const handleEditEntry = function(id){
    console.log(`Edit button clicked for ID: ${id} functionality added in week 7.1 `);
    resetAllUIStates();
}; 

// The main initialization function for our application.
// This function sets up all the event listeners.
// The 'DOMContentLoaded' event is crucial!
const init = function(){
    console.log('App initialized: DOM is ready!');

    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);

    resultsDisplay.hideResults(); 

    const loadedEntries = storage.loadEntries(); 

    if(loadedEntries.length > 0) {
        carbonFootprintEntries.push(...loadedEntries); 
    }

    tableRenderer.renderTable(carbonFootprintEntries,  {
        onDelete: handleDeleteEntry, 
        onEdit: handleEditEntry
    }); 

    // init function - Event listener for "Clear All Data"
    clearAllDataButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents this click from potentially triggering other global click listeners.
        if (isConfirmingClearAll) {
            // Second click: User confirms, so perform the action.
            performClearAllData();
        }else {
            // First click: Ask for confirmation by changing button text and state
            isConfirmingClearAll = true; 
            clearAllDataButton.textContent = 'Are you sure? Click again'; 
            // Add a class to change its appearance (defined in style.css).
            clearAllDataButton.classList.add('confirm-state'); 
            // Set a timeout to automatically revert the button state if the user doesn't click again.
            clearAllTimeoutId = setTimeout(function(){
                resetClearAllButton()
                console.log('Clear All conformation timed out ')
            }, 3000); // 3 seconds 
        } 

    })
    // Global click listener to reset the "Clear All Data" button state
    // if the user clicks anywhere else on the page while confirmation is pending.
    // Only reset if we are in a confirming state AND the click was outside the button itself.
    document.addEventListener('click', function(event){
       
        if(isConfirmingClearAll && event.target !== clearAllDataButton){
            resetClearAllButton(); 
        }
    })
    // attach this once at the module level or in init()
   
};

document.addEventListener('DOMContentLoaded', init); 