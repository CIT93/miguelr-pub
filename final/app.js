

import * as formHandler from './form-handler.js'
import * as decision from './decision.js'
import * as ui from './ui.js'
import * as storage from './data-store.js'
import { renderedTable } from './table-render.js'

console.log('App Loaded')


const skateSelectorEntries = []

const skateboardingSelectionForm = document.getElementById('skateboardingSelectionForm');

const clearFormButton = document.getElementById('clearFormButton');

const skateTypeError = skateboardingSelectionForm.querySelector('#skateTypeError')
const skateSessionError = skateboardingSelectionForm.querySelector('#skateSessionError')
const moodTypeError = skateboardingSelectionForm.querySelector('#moodTypeError')
const skateWeatherError = skateboardingSelectionForm.querySelector('#skateWeatherError')



const resetAllUIStates = () => {
    const hiddenId = document.getElementById('id');
    if (hiddenId) hiddenId.value = '';

    const submitBtn = skateboardingSelectionForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Select Skate Session';
    clearErrorMessage(); // accidently did this in phase 2 instead of phase 3 
};

const clearErrorMessage = () => {
skateTypeError.textContent = '';
skateTypeError.style.display = 'none'; 

skateSessionError.textContent = '';
skateSessionError.style.display = 'none'

moodTypeError.textContent = '';
moodTypeError.style.display = 'none'

skateWeatherError.textContent = '';
skateWeatherError.style.display = 'none'


}

const validateForm =(formData) => {
    let isValid = true; 
    clearErrorMessage()
    //rule 1 
if(!formData.skateType) {
    skateTypeError.textContent = 'Skate Type not selected!'; 
    skateTypeError.style.display = 'block'
    isValid = false; 
}
//rule 2 
if(formData.skateSession <= 15 || formData.skateSession > 480 ) {
skateSessionError.textContent = 'Session submission must be more then 15min and less then 480 min!'
skateSessionError.style.display = 'block'
isValid = false; 
}
//rule 3 
if(!formData.moodType){
    moodTypeError.textContent = 'Mood Type not selected!'
    moodTypeError.style.display = 'block'
     isValid = false;
}
//rule 4
if(!formData.skateWeather){
    skateWeatherError.textContent = 'Weather not selected!'
    skateWeatherError.style.display = 'block'
    isValid = false;
}
    return isValid
}



const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log('Form Submitted');

    console.log('Results for your decision function')

    const formData = formHandler.getFormInputs();

if(!validateForm(formData)){
    console.log("Form validation failed. Stopping submission.")
    return; // Stop execution if validation fails
}
console.log("Form validation passed. Proceeding with submission.");

    const sessionPlan = decision.generateSkateSessionPlan(formData);

    ui.renderDecision(sessionPlan);

    console.log(sessionPlan);

    const entryId = formData.id ? parseInt(formData.id) : null

    const entryToSave = {
        // id: Date.now(), 
        //timestamp: new Date().toISOString(), 
        ...formData,
        ...sessionPlan
    }
    if (entryId !== null) {
        const index = skateSelectorEntries.findIndex((entry) => {
            return entryId == entry.id;
        });
        if (index !== -1) {
            entryToSave.id = skateSelectorEntries[index].id;
            entryToSave.timestamp = skateSelectorEntries[index].timestamp;
            skateSelectorEntries[index] = entryToSave;


        } else {
            console.warn(`Attempted to update entry with id ${entryId}, but it was not found, adding as new`);
            entryToSave.id = storage.generateUniqueId();
            entryToSave.timestamp = new Date().toISOString();
            skateSelectorEntries.push(entryToSave);
        }
    } else {
        entryToSave.id = storage.generateUniqueId();
        entryToSave.timestamp = new Date().toISOString();
        skateSelectorEntries.push(entryToSave);
    }

    storage.saveToLS(skateSelectorEntries);

    renderedTable(skateSelectorEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });

    formHandler.clearForm()

    console.log(skateSelectorEntries);

    console.log("Form data:", formData);

    resetAllUIStates();
};



const handleClearForm = () => {

    formHandler.clearForm();
    ui.hideResults();
    console.log('Clear button clicked');


    storage.saveToLS(skateSelectorEntries);

    resetAllUIStates();

};

const handleDeleteEntry = (id) => {
    console.log(`Delete clicked for ID: ${id}`);
    const indexToDelete = skateSelectorEntries.findIndex( (entry) => {
        return entry.id === id;
    });
    if (indexToDelete !== -1) {
        skateSelectorEntries.splice(indexToDelete, 1);
        console.log(`Entry removed from memory`);

        storage.saveToLS(skateSelectorEntries);
        renderedTable(skateSelectorEntries, { onDelete: handleDeleteEntry });
    }
    ui.hideResults(); 
    resetAllUIStates();
};

const handleEditEntry = (id) => {
    const entryToEdit = skateSelectorEntries.find((entry) => {
        return entry.id === id;
    })
    if (entryToEdit) {
        formHandler.populateFormforEdit(entryToEdit);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(`Editing entry id ${id}form populated`);
     

    }
  
};



const init = () => {
    console.log('App initialized: DOM is ready! Try submitting the form or clearing it.');
    const storedOrders = storage.getFromLS();
    if (storedOrders.length > 0) {
        skateSelectorEntries.push(...storedOrders);
        console.log('Orders Loaded from Storage')
    } else {
        console.log('No Orders found in storage starting fresh')
    };

    renderedTable(skateSelectorEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });

    skateboardingSelectionForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    resetAllUIStates();
};


document.addEventListener('DOMContentLoaded', init); 