import React from 'react';

function RestaurantList(props) {
    return (
        <div className='list-group'>
            <table className="table table-hover table-dark">
  <thead>
    <tr className='bg-primary'>
      <th scope="col">Restaurant</th>
      <th scope="col">City</th>
      <th scope="col">Price Range</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td><button className="btn btn-warning">Edit</button></td>
      <td><button className="btn btn-danger">Delete</button></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Mark</td>
      <td>Otto</td>
      <td><button className="btn btn-warning">Edit</button></td>
      <td><button className="btn btn-danger">Delete</button></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colSpan="3">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
        </div>
    );
}

export default RestaurantList;