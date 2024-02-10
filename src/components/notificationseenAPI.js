import axiosInstance from "../api/api";
import { baseURL } from "../api/api";

const notificationseenApi = async (notificationId) => {
  try {
    let body = {}
    const response = await axiosInstance.post(`${baseURL}/api/posts/notifications-seen/${notificationId}/`, body);

    if (response.status === 200) {
        return response.data
    } else {
      return response.error
    }
  } catch (error) {
    return error
  }
};

export default notificationseenApi;
