import React, {useState, createContext} from "react";
//instead of prop drilling we use React Context Api to pass these selected props down to all children
//by wrapping everything in the Context Provider we create 

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([]);

    const addRestaurant = (restaurant) => {
setRestaurants([...restaurants, restaurant])
    }

    const deleteRestaurant = (restaurantID) => {
        let result = restaurants.filter(element => element.id !== restaurantID)
        setRestaurants(result);
    }
    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurant, deleteRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}