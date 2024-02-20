import axiosInstance from "../api/api";
import { baseURL } from "../api/api";

const getNotificationsApi = async () => {
  try {
    
    const response = await axiosInstance.get(`${baseURL}/api/posts/notifications/`);
    if  (response.status === 200) {
        return response.data;
    } else {
        console.log(response.error)
    }
  } catch (error) {
    console.error(error);
  }
};

export default getNotificationsApi;