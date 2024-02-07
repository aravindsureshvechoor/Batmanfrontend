import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { clearAuth } from '../Redux/UserSlice';

const baseURL = 'http://localhost:8000';
const imageBaseUrl = 'http://localhost:8000'


const axiosInstance = axios.create({
    baseURL: baseURL,
});
console.log({refresh: localStorage.getItem('refreshToken')});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
                console.log(localStorage.getItem('refreshToken'));
            return axiosInstance
                .post(`api/token/refresh/`, {refresh: localStorage.getItem('refreshToken')})
                .then((res) => {
                    const accessToken = res.data['access'];

                    localStorage.setItem('accessToken', accessToken);

                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                })
                .catch((error) => {
                    console.error('Token refresh error:', error);
                });
        }

        return Promise.reject(error);
    }
);

// axiosInstance.interceptors.request.use(

//   async function(config) {
    
//     const user = useSelector((state)=> state.user)
//     const dispatch = useDispatch()
//     const email = user.user.email
//     try {
//       const response = await axios.get(`${baseURL}/api/authentication/userstatus/${email}/`);
//       const status = response.data;
//       if (status && status.BLOCKED) {
//         console.log('User is blocked. Logging out...');
//         dispatch(clearAuth());
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/';
//       } else if (status && status.NOTBLOCKED) {
//         console.log('User is not blocked.');
//       } else {
//         console.warn('Unexpected response format:', status);
//       }
//     } catch (error) {
//       console.error('Error occurred while checking user status:', error);
//     }
    
//     return config;
//   },
//   function(error) {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
export {baseURL, imageBaseUrl};
