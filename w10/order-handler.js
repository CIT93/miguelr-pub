

const orderForm = document.getElementById('orderForm'); 

const qtyInput = orderForm.querySelector('#qty');  

const giftwrapInput = orderForm.querySelector('#giftwrap'); 

const sizeRadio = orderForm.querySelectorAll('input[name="size"]');


const getSelectedRadioValue = function(radioButtons){
        
    
    for(const radio of radioButtons) {
        if (radio.checked) {
           
            console.log(`${radio.value} has the attribute of ${radio.checked}`);
            return radio.value;
        }
    }
    };





    export const getOrderInputs = function (){
        console.log('get Order Inputs'); 
       



        return{ 
            qty: parseInt(qtyInput.value) || 1, 
            size: getSelectedRadioValue(sizeRadio) || "S", 
            giftwrap: giftwrapInput.checked 
        
        
        }


    }

