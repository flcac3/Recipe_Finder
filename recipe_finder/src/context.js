import React, {createContext, useState} from 'react';
export const MyContext = createContext();

function AppContext({children}) {
    // these are the contexts to pass the properties to the children components
    const [meals, setMeals] = useState([]);
    const [user, setUser] = useState(null);
    const [meal, setMeal] = useState(null);
    return (
        <MyContext.Provider value={{ meals, setMeals, user, setUser, meal, setMeal }}>{children}</MyContext.Provider>
    );
}

export default AppContext;