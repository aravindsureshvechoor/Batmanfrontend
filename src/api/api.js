import axios from 'axios';

const baseURL = 'http://localhost:8000';
const imageBaseUrl = 'http://localhost:8000'


const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosInstance.interceptors.request.use((config) => {
    const useraccessToken = localStorage.getItem('useraccessToken');
    console.log(useraccessToken,'AAAAAAAAACCCCCCCCEEEEEEEESSSSSSSSSSSSSSSS')
    if (useraccessToken) {
        config.headers['Authorization'] = `Bearer ${useraccessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            return axiosInstance
                .post('api/token/refresh/', {refresh: localStorage.getItem('userrefreshToken')})
                .then((res) => {
                    const {useraccessToken, userrefreshToken} = res.data;

                    localStorage.setItem('useraccessToken', useraccessToken);
                    localStorage.setItem('userrefreshToken', userrefreshToken);

                    originalRequest.headers['Authorization'] = `Bearer ${useraccessToken}`;
                    return axiosInstance(originalRequest);
                })
                .catch((error) => {
                    // localStorage.removeItem('accessToken')
                    // localStorage.removeItem('refreshToken')
                    console.error('Token refresh error:', error);
                });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
export {baseURL, imageBaseUrl};
