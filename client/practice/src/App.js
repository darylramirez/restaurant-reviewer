import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./routes/Home";
import RestaurantDetail from "./routes/RestaurantDetail";
import UpdateRestaurant from "./routes/UpdateRestaurant";

const App = () => {
    return (
        <div className='container'>
        <Router>
            <Routes>
            <Route exact path ='/' element={<Home/>}/>
            <Route exact path ='/restaurants/:id' element={<RestaurantDetail/>}/>
            <Route exact path ='/restaurants/:id/update' element={<UpdateRestaurant/>}/>
            </Routes>
        </Router>
        </div>
    )
}

export default App;