

const skateboardingSelectionForm = document.getElementById('skateboardingSelectionForm');

const skateTypeSelected = skateboardingSelectionForm.querySelector('#skateType')

const sessionlengthSelected = skateboardingSelectionForm.querySelector('#skateSession')

const switchInput = skateboardingSelectionForm.querySelector('#skateSwitch')

const moodTypeSelectedRadios = skateboardingSelectionForm.querySelectorAll('input[name="moodType"]')

const  idInputs = skateboardingSelectionForm.querySelector('#id')

const submitButton = skateboardingSelectionForm.querySelector('#submitButton'); 

const skateWeatherSelected = skateboardingSelectionForm.querySelector('#skateWeather')

const setSelectedRadioValue = (radioButtons, valueSet) => {
    for(const radio of radioButtons){
        if (radio.value === valueSet){
            radio.checked = true; 
        }
    }
}

export const populateFormforEdit = (entry) => {
    idInputs.value = entry.id; 
    skateTypeSelected.value = entry.skateType
    sessionlengthSelected.value = entry.skateSession
    switchInput.checked = entry.skateSwitch
    setSelectedRadioValue(moodTypeSelectedRadios,entry.moodType);
    submitButton.textContent = 'Update Entry'
    skateWeatherSelected.value = entry.skateWeather
}



export const getFormInputs =  () => {
     let moodType; 
     
     for(const radio of moodTypeSelectedRadios){
        if(radio.checked){
            moodType = radio.value; 
        }
     }

    return {
        id: idInputs.value || null, 
        skateType: skateTypeSelected.value, 
        skateSession: parseInt(sessionlengthSelected.value) || 0, 
        skateSwitch: switchInput.checked,
        moodType: moodType,
        skateWeather:skateWeatherSelected.value
    }

}

export const clearForm =  () => {
    skateboardingSelectionForm.reset();
    idInputs.value = ''; 
}