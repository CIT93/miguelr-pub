const orderform = document.getElementById('orderform'); 

const qtyInput = orderform.querySelector('#qty'); 

const giftwrapInput = orderform.querySelector('#giftwrap'); 

const sizeRadio = orderform.querySelectorAll('input[name="size"]');


const getSelectedRadioValue = function(radioButtons){
    for(const radio of radioButtons) {
        if (radio.checked) {
            console.log(`${radio.value} has the attribute of ${radio.checked}`);
            return radio.value;
        }
    }
    }


    export const getOrderInputs = function (){
        console.log('get order from inputs'); 




        return{ 
            qty: parseInt(qtyInput.value) || 1, 
            size: getSelectedRadioValue(sizeRadio), 
            giftwrap: getOrderInputs.checked
        }


    }

    // TEMPORARY TEST:
console.log(getOrderInputs()); 