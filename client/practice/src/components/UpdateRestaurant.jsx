import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router'
import RestaurantFinder from '../apis/RestaurantFinder';

function UpdateRestaurant(props) {
    let {id}= useParams();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [priceRange, setPriceRange] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
const fetchData = async () => {
    try{
const response = await RestaurantFinder.get(`/${id}`);
let restaurant = response.data.data.restaurant;
setName(restaurant.name);
setCity(restaurant.city);
setPriceRange(restaurant.price_range);
    } catch(e){
        console.log('Get individual restaurant error:', e)
    }
}
fetchData();
    }, [id])

const handleSubmit = async (e) => {
    try{
e.preventDefault();
const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {name, city, price_range: Number(priceRange)});
navigate('/')
    } catch(e){
        console.log(`Update restaurant error ${e}`)
    }
}
    return (
        <div>
          <form action=''>
              <div className="form-group">
            <label htmlFor='name'>Name</label>
            <input value={name} className='form-control' type='text' 
            onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="form-group">
            <label htmlFor='city'>City</label>
            <input value={city} className='form-control' type='text' 
            onChange={(e) => setCity(e.target.value)}/>
              </div>
              <div className="form-group">
            <label htmlFor='Price Range'>Price Range</label>
            <select value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className='custom-select my-1 mr-sm-2'>
                            <option value='1'>$</option>
                            <option value='2'>$$</option>
                            <option value='3'>$$$</option>
                            <option value='4'>$$$$</option>
                            <option value='5'>$$$$$</option>
                        </select>
              </div>
              <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
          </form>
        </div>
    );
}

export default UpdateRestaurant;