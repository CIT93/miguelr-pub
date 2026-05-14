const SKATE_BOARD_KEY = 'skateSelectorEntries';  

export const saveToLS = (orders) => {
    try{
        localStorage.setItem(SKATE_BOARD_KEY,JSON.stringify(orders) )
        console.log('Data Stored Successfully!')
    }catch(error){
        console.log(`Error Saving Data to Storage: ${error} `)
    };
};

export const generateUniqueId = () => {
    return Date.now().toString(); 
};

export const getFromLS = () => {
    try{
        const dataString = localStorage.getItem(SKATE_BOARD_KEY);
        if(dataString){
            return JSON.parse(dataString);
        }
        return []; 
    } catch(e){
        console.log(`Error Loading Orders to Storage: ${e}`)
        localStorage.removeItem(SKATE_BOARD_KEY); 
        
    }
};