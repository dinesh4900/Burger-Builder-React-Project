 import axios from 'axios'

 const instance = axios.create({
     baseURL: "https://react-burger-builder-5869e-default-rtdb.firebaseio.com/"
 });


 export default instance;