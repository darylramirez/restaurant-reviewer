import axios from "axios";

//create an axios instance running on your backend port
export default axios.create({
    baseURL: "http://localhost:4000/api/v1/restaurants"
})