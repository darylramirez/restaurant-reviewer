import React, {useState, useContext} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

function AddRestaurant(props) {
    const {addRestaurant} = useContext(RestaurantsContext)
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');

    const handleSubmit = async (e) => {
        try{
e.preventDefault();
const response = await RestaurantFinder.post('/', {name, city, price_range: priceRange});
addRestaurant(response.data.data.restaurant)
        } catch(e){
            console.log(`Adding restaurant error ${e}`)
        }
    }
    return (
        <div className="mb-4 ">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input type="text" value ={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className='form-control' placeholder="Restaurant Name"/>
                    </div>
                    <div className="col">
                    <input type="text" value ={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className='form-control'placeholder="City"/>
                    </div>
                    <div className="col">
                        <select value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className='custom-select my-1 mr-sm-2'>
                            <option disabled>Price Range</option>
                            <option value='1'>$</option>
                            <option value='2'>$$</option>
                            <option value='3'>$$$</option>
                            <option value='4'>$$$$</option>
                            <option value='5'>$$$$$</option>
                        </select>
                    </div>
                    <button type='submit'
                    onClick={handleSubmit}
                    className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddRestaurant;