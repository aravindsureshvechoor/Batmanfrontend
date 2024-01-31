import axiosInstance from "../api/api";
import { baseURL } from "../api/api";

const CreateChatRoomApi = async (userID)=> {
 try{
    let body = {}
    const response = axiosInstance.post(`${baseURL}/api/chat/create-room/${userID}/`,body);
    if (response.status === 200){
        return response.data
    }
    else{
        console.log(response.error);
    }
    console.log(response.data);
 }catch(error){
    console.error(error);
 }
}
export default CreateChatRoomApi;