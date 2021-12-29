import axios from "axios";
import { ChatBotPayload } from "./chatSlice";
const SERVER = "http://127.0.0.4:8004/api/";
const headers = {
  "Content-Type": "application/json",
  Authorization: "JWT fefege..",
};

function ChatAPI(data: ChatBotPayload) {
  return axios.post(`${SERVER}chat`, JSON.stringify(data), { headers });
}


export default {
  ChatAPI
  

};
