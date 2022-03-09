import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

function RestaurantDetail(props) {
    let {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

    useEffect(() => {
const fetchData = async () => {
    try{
const response = await RestaurantFinder.get(`/${id}`);
let data = response.data.data;
setSelectedRestaurant(data);
    } catch(e){
        console.log('Get individual restaurant error:', e)
    }
}
fetchData();
    }, [id, setSelectedRestaurant])

    return (
        <div className='mb-4 text-center'>
            {selectedRestaurant ?
            <>
             <h5 className="font-weight-light display-3 text-center">{selectedRestaurant?.restaurant?.name}</h5>
             <StarRating rating={1}/>
            <div className="mt-3">
                <Reviews reviews={selectedRestaurant?.reviews}/>
            </div> 
            <AddReview/>
            </>
            : null}
        </div>
    );
}

export default RestaurantDetail;