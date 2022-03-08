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

    const handleDelete = async (id) => {
try{
    await RestaurantFinder.delete(`/${id}`);
    deleteRestaurant(id);
    console.log(`Restaurant at id ${id} deleted`)
} catch(e){
    console.log(`Deleting restaurant ${e}`)
}
    }

    const handleUpdate = async (id) => {
try{
navigate(`/restaurants/${id}/update`)
} catch(e){
    console.log('Updating restaurant error: ', e)
}
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
        <tr key={restaurant.id}>
      <td>{restaurant.name}</td>
      <td>{restaurant.city}</td>
      <td>{"$".repeat(restaurant.price_range)}</td>
      <td>Reviews</td>
      <td><button onClick={() => handleUpdate(restaurant.id)}className="btn btn-warning">Edit</button></td>
      <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
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