

export const renderDecision = (decisionObj) => {

    const resultsContainer = document.getElementById('results'); 

    const skateTypeResult = resultsContainer.querySelector('#skatetypeSelected');
    const skateSessionResult = resultsContainer.querySelector('#sessionlengthSelected');
    const moodResult = resultsContainer.querySelector('#moodTypeSelected');
    const weatherResult = resultsContainer.querySelector('#skateWeatherSelected')
    skateTypeResult.textContent = `Skate Type: ${decisionObj.skateTypeRecommendation}`; 
    skateSessionResult.textContent =`Session Length: ${decisionObj.skateSessionRecommendation}`
    moodResult.textContent = `Mood Result: ${decisionObj.moodRecommendation}`
    weatherResult.textContent = `Weather Result: ${decisionObj.skateWeatherRecommendation}`
     resultsContainer.style.display = 'block'; 

}; 
export const hideResults = () => {
     const resultsContainer = document.getElementById('results'); 
    resultsContainer.style.display = 'none'
}; 
