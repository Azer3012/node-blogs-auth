import axios from 'axios'


const instance=axios.create({
    baseURL:"http://localhost:8000/api/v1",
    withCredentials:true
})
export default instance;