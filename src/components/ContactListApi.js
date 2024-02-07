import axiosInstance from "../api/api";
import { baseURL } from "../api/api";

const ContactListApi = async () => {
    try{
        const response = await axiosInstance.get(`${baseURL}/api/chat/contactlist/`);
        if (response.status === 200 ){
            return response.data
        }
        else{
            console.log(response.error)
        }
        console.log(response.data);
    }catch(error){
        console.error(error);
    }
};

export default ContactListApi;