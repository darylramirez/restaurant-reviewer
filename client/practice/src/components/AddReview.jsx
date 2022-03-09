import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';


function AddReview(props) {
    const {id} = useParams();
    let navigate = useNavigate();
    const [name, setName] = useState('')
    const [rating, setRating] = useState('Rating')
    const [review, setReview] = useState('');

    const handleSubmit = async (e) => {
e.preventDefault();
try{
await RestaurantFinder.post(`/${id}/addReview`, {
    name, review, rating
});
navigate('/');
navigate(`/restaurants/${id}`);
    } catch(err){
        console.log('Add review ', err)
    }
    }
    return (
        <div className='mb-2'>
            <form action=''>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor='name'>Name</label>
                        <input onChange={(e) => setName(e.target.value)} 
                        value={name}className='form-control' 
                        type='text' placeholder='Name'/>
                    </div>
                    <div className="form-group col-4">
                    <label htmlFor='Rating'>Rating</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)}
                    id="Rating" className="custom-select">
                        <option disabled>Rating</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='4'>5</option>
                    </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor='Review'>Review</label>
                    <textarea value={review} onChange={(e) => setReview(e.target.value)}
                    id="Review" className="form-control"></textarea>
                </div>
                <button type='submit' className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
        </div>
    );
}

export default AddReview;