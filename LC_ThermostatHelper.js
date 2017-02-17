({
    // This function is used to automatically refresh our fridgeData every 2 seconds
    "pollRefresh": function(component,event,helper)	{
        helper.getSmartFridgeData(component,event,helper);
        
        window.setInterval($A.getCallback(function() {
            helper.getSmartFridgeData(component, event, helper)
        }), 2000);
    },

    // 1. Create a function called "getSmartFridgeData" with three parameters (component, event and helper)
    // 2. In this function create a variable called action.
    // =======================================
    // 3. First we want to get all information about our fridge to do this:
    // Call the method created in your ApexClass using the "component.get" function and store the result in the newly created action variable
    // =======================================
    // 4. Next we are going to get the recordId of our fridge, since we need it to retrieve all the current information from Salesforce
    // Set the "recordIdString" variable using the "setParams" function on the action variable. 
    // Tis function uses an javascript object as parameter and might look like: action.setParams({parameterName: component.get("recordIdVariableHere")})
    // =======================================
    // 5. Now we are going to set a callback function. This is the function that will be executed,
    // after our action has completed getting the data from our Apex Controller. 
    // The "setCallback" function on the action variable takes 2 parameters.
    //  1. the context (will be the value "this")
    //  2. a function to be executed when the call is completed. This function will have 1 parameter called: "response"
    //  3. This will look like: action.setCallback(this, *your function definition here*).
    //  4. Your function body can remain empty for now. We will write this logic a bit later.
    //========================================
    // 6. Next we will queue our callback. This tells our component to execute the action we defined asynchronously
    // We can do this by using the Aura javascript library. You can access it by using $A
    // Queue your action by using the $A.enqueueAction method and pass the action you've created as a parameter. 
    // =======================================
    // 7. Now we will start writing the logic in the empty function body that we have created in step 5
    // In this function we have one given parameter called "response" 
    // this parameter is automatically filled by Salesforce with the result of our ApexController function.
    //      1. create a state variable and save the status of the response in this variable using the: response.getState() method
    //      2. create an if condition and check if the state variable equals "SUCCESS"
    //      3. All next steps will be written in this "if" condition
    //      4. Save all return values in a variable called smartFridge by using: response.getReturnValue();
    //      5. Next we will set an amount of aura:attributes with the values we retrieved via Apex
    //      For this we use the "set" function on the component variable (component.set())
    //      This function takes 2 parameters the name of the aura attribute (v.attributeName) and the new value
    //          5.1 set the temprature attribute with the following value: (Math.round(smartFridge.Temperature__c * 100) / 100)
    //          5.2 set the humidity attribute with the following value: Math.round(smartFridge.Humidity__c * 100) / 100)
    //          5.3 set the door attribute with the following value: 'Door: ' + smartFridge.Door__c
    //      6. Next we will add some dynamic styling to our temperature bar.
    //      We want to change the color of our circle when our temperature is below or above a certain amount of degress.
    //      For this we will use our component to find our div that has an "aura:id"
    //      example: <div class="circleTemp" aura:id="temperatureDiv">  </div> in your component
    //      
    //          6.1 We can find this element by using the "find" function on the component variable  and use the aura:id of the element as a parameter
    //          component.find('temperatureDiv') --> this returns a component. Save the result in a variable (example: cmpTemp)
    //          6.2 Next we will remove any CSS classes that might interfere with our styling. 
    //              We do that by using the Aura javascript framework with the following function: $A.util.removeClass(cmpTemp, *classNameHere*)
    //              Do this for the following classes: circleTempNOK and circleTempOK
    //          6.3 Write a if statement. This statement will check if our temperature is above "15 degrees". Dependent on this we want to add a certain CSS class
    //          example: (Math.round(smartFridge.Temperature__c * 100) / 100) > 15
    //          6.4 When the temperature is above 15 degrees we want to add the class "circleTempNOK" else we want to add "circleTempOK"
    //          Use $A.util.addClass(cmpTemp, *classNameHere*) for this
    //      7. We also want to add some styling to make it more clear if the door of our fridge is open or not.
    //      For this we are going to follow the same principle. 
    //          7.1 So use the aura:id you used for the door section in your component and retrieve it + store it in a variable (ex: cmpDoor).
    //          7.2 Remove the classes "doorOK" and "doorNOK" using the Aura JS library
    //          7.3 Create an if statement and check of "smartFridge.Door__c.toLowerCase()" equals "closed" (assuming that you've created the smartFridge variable in step 4)
    //          7.4 If the door is closed use the Aura JS Library to add the class "doorOK" to cmpDoor
    //          7.5 If the door is not closed use the Aura JS Library to add the class "doorNOK" to cmpDoor
    //      
    //      After this your Javascript Helper should be ready to use ! :-D. Well done!
    
})