import axiosInstance from "../api/api";
import { baseURL } from "../api/api";

const GetChatMessages = async (roomId) => {
  try {
    const response = await axiosInstance.get(`${baseURL}/api/chat/chat-room/${roomId}/`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default GetChatMessages;
