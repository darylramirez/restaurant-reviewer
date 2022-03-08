import React, {useState, createContext} from "react";
//instead of prop drilling we use React Context Api to pass these selected props down to all children
//by wrapping everything in the Context Provider we create 

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([]);
    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}