# My Decision Making App
## Project Title: What Should I Skate?
### Description: So this app will decide what how and how i will skate based on the selections i make and it will give me recommecdations 
### Input Types Used: radio buttons for selecting my mood and how i am feeling, select/dropdown for selecting the type of skating i would like to do, number input for choosing how long the skate session should be, checkbox for if you want to skate switch or not 
### Color Palette: 
                    #344e41 - Usage (e.g., Main Background)
                    #ffd60a - Usage (e.g., Primary Text)
                    #588157 - Usage (e.g., Submit Button)
## Step 5 Planning
### What new input will you add? (Describe the input, e.g., "A checkbox asking if I have a deadline," or "A number input for my current budget.") A new input i would add is another select/dropdown input for the weather type. 
### How will this change your logic? (Explain how your decision.js file will use this new piece of data to alter the final result.) it would change my logic by having to add formdata to my generateskatesessionplan function and create new logic for exapmle if they select hot weather the output would be drink water and take more breaks adding more boxes to my entries table. What I would want to do is depending on the weather it could also affect the results of skateType. 

## Step 6 Planning: Validation.
### What is the "Required" state? (e.g., Is it mandatory? Must a checkbox be checked?) The required state for session lenth, mood, skate type, and skate weather. It has to be equal or greater then 0 for session lenth, For mood a radio has to be checked, Skate type a type has to be selected and for weather a selection has to be made. 

### What are the "Boundary" rules? (e.g., If it's a number, what is the min/max? If it's text, is there a minimum length?)
### For session lenth the max amount of minutes would be 480 minutes which is 8 hours and the minimum times would be 15 mintues 

### The Error Message: Write out the exact, user-friendly sentence you want the user to see if they fail that specific validation.
### for sessionlenth error message: "Session submission must be more then 15min and less then 480 min" skate type :"Skate Type not selected "
### mood type : "Mood Type not selected" skate weather: "Weather not selected" 

