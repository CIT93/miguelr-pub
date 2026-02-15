const LOCAL_STORAGE_KEY = 'orders';

export const saveOrders = function (orders) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
        console.log('Data saved to localStorage successfully!');
    } catch (error) {
        console.log(`Error saving data to localStorage:${error}`);
    }

}

export const loadOrders = function () {
    try {
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY,)
        if (dataString) {
            return JSON.parse(dataString);
        }
        return [];
    }catch(error){
        console.error(`Error loading entries from localStorage:${e}`)
        localStorage.removeItem(LOCAL_STORAGE_KEY); 
    }

} 