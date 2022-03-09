import React, {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import Loading from './Loading';

function RestaurantList(props) {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    const {deleteRestaurant} = useContext(RestaurantsContext);
    let navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
    try{
                const response = await RestaurantFinder.get('/');
                setRestaurants(response.data.data.restaurants);
                } catch(e){
                    console.log(`Restaurant List GET request ${e}`)
                }
            }
            fetchData();
    }, [setRestaurants])

    const handleDelete = async (e, id) => {
        //since the handleSelect is placed on the entire row this e.stopPropagation will allow the delete and edit button to 
        //go to the right place where the button indicates
        e.stopPropagation();
try{
    await RestaurantFinder.delete(`/${id}`);
    deleteRestaurant(id);
    console.log(`Restaurant at id ${id} deleted`)
} catch(err){
    console.log(`Deleting restaurant ${err}`)
}
    }

    const handleUpdate = async (e, id) => {
        e.stopPropagation();
try{
navigate(`/restaurants/${id}/update`)
} catch(err){
    console.log('Updating restaurant error: ', err)
}
    }

    const handleSelect = (id) => {
navigate(`/restaurants/${id}`);
    }

    return (
        <div className='list-group'>
            <table className="table table-hover table-dark">
  <thead>
    <tr className='bg-primary'>
      <th scope="col">Restaurant</th>
      <th scope="col">City</th>
      <th scope="col">Price Range</th>
      <th scope="col">Reviews</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
      {restaurants ? (restaurants.map(restaurant => {
          return(
        <tr key={restaurant.id}
        onClick={() => handleSelect(restaurant.id)}>
      <td>{restaurant.name}</td>
      <td>{restaurant.city}</td>
      <td>{"$".repeat(restaurant.price_range)}</td>
      <td>Reviews</td>
      <td><button onClick={(e) => handleUpdate(e, restaurant.id)}className="btn btn-warning">Edit</button></td>
      <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
    </tr>
          )
      }
      )) : <Loading/>}
    
  </tbody>
</table>
        </div>
    );
}

export default RestaurantList;