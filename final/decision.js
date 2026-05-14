
const skateRecommendation = {
    rails: "FHS 8 stair rail, dd's 7 stair rail,",
    stairs: "FCC 5 stair, Shaw 9 stair",
    ledges: "Inspiration park ledges, FCC gym ledges",
    flatground: "lions skatepark, romains skatepark",
    transition: "lions skatepark"
};

const getRecommendationType = (type) => {
    return (skateRecommendation)[type] || 'Skate type not selected please try again'

};


const decideSkateType = (skateType) => {
    if (!skateType)
        return { skateType: null, recommendation: "No skate type selected." };

    return {
        skateType,
        recommendation: getRecommendationType(skateType)
    };
};

const recommendationSession = (skateSession, skateSwitch) => {
    if (!skateSession || skateSession <= 0) {
        return { skateSession: 0, skateCategory: null, recommendation: "Session time not selected" };
    };
     let skateCategory = "";

    if (skateSession <= 60) {
        skateCategory = "Short"
    }
    else if (skateSession <= 180) {
       skateCategory=  "Average"
    } else { skateCategory ="Long" }

    let recommendation = `${skateCategory} session: skate for ${skateSession} minutes.`;
    if (skateSwitch) {
        recommendation += " skate switch only for 10 mins."; 
    }
    return {
        skateSession, skateCategory, recommendation,skateSwitch }
    
}; 



const recommendationMood = (moodType) => {
 let recommendation = "";

    switch (moodType) {
        case 'happy': recommendation = "Go all out push yourself to learn something new";
            break;
        case 'sad': recommendation = "go light push around and have fun";
            break;
        case 'relaxed': recommendation = "Flow around focus on your skate style";
            break;
        case 'tense': recommendation = "take it easy warm up and only do tricks you know you can land";
            break;
        default: recommendation = "mood not known"
    };
    return recommendation; 
};



const decideMood = (moodType) => {
    if (!moodType) return {
        moodType: null, recommendation: "No mood type selected"};
     return {moodType,
            recommendation: recommendationMood(moodType)
     };
}; 

const recommendationWeather = (skateWeather) => {
    let recommendation = ''
    
    switch(skateWeather) {
        case 'raining': recommendation = "Skate indoors"; 
        break;
        case 'sunny': recommendation = "Good weather to skate anywhere!";
        break;
        case 'windy': recommendation = "Stay out of open areas";
        break;
        case 'scorching': recommendation = 'Drink water and find some shade to skate in';
        break;
        case 'freezing': recommendation = 'Stay warm and skate anywhere!';
        break; 
        default: recommendation = 'Select a weather type'
    }
    return recommendation; 
}

export const generateSkateSessionPlan = (formData) => {
    const skateTypeResult = decideSkateType(formData.skateType);
    const skateSessionResult = recommendationSession(
        formData.skateSession,
        formData.skateSwitch
    );
    const skateSwitchRecommendation = skateSessionResult.skateSwitch
    ?"Skate switch for 10 mins":
    "No skating Switch needed"; 
    const moodResult = decideMood(formData.moodType);
    const weatherResult = recommendationWeather(formData.skateWeather)
    return {
        skateTypeInput: formData.skateType || null,
        skateSessionInput: formData.skateSession|| 0,
        moodInput: formData.moodType || null,
        skateSwitchInput: !!formData.skateSwitch,

        skateTypeRecommendation: skateTypeResult.recommendation,
        skateCategory: skateSessionResult.skateCategory,
        skateSessionRecommendation: skateSessionResult.recommendation,
        moodRecommendation: moodResult.recommendation,
        skateSwitchRecommendation, 
        skateWeatherRecommendation: weatherResult
    };
};

