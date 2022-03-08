import React from 'react';
import UpdateRestaurant from '../components/UpdateRestaurant';

function UpdatePage(props) {
    return (
        <div>
        <div className='mb-4'>
            <h5 className="font-weight-light display-3 text-center"> Update Restaurant</h5>
            <UpdateRestaurant/>
        </div>
        </div>
    );
}

export default UpdatePage;