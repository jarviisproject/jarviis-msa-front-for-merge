import axios from "axios";
import { addEventPayload, idParamType, UserParamType } from "./calendarSlice";
const SERVER = 'http://127.0.0.2:8002/api/event'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege..'
}


function eventListAPI( data: UserParamType){
  return axios.get(`${SERVER}/user/${data.user_id}`)
}

function addTaskAPI(data : addEventPayload){
  return axios.post(`${SERVER}/create`, {data}, { headers });
}

function deleteTaskAPI(data: idParamType){
  return axios.delete(`${SERVER}/delete/${data.id}`)
}



export default {
  eventListAPI,
  addTaskAPI,
  deleteTaskAPI
}