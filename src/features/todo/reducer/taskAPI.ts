import axios from "axios";
import { ParamType, completionPayload, addTaskPayload, idParamType } from "features/todo/reducer/taskSlice";
const SERVER = 'http://127.0.0.2:8002/api/event'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege..'
}

function taskAPI( data: ParamType){
  return axios.get(`${SERVER}/date/${data.date}`)
}

function completeAPI(data : completionPayload){
  return axios.post(`${SERVER}/complete/${data.id}`, {completion : data.completion}, { headers });
}

function addTaskAPI(data : addTaskPayload){
  console.log('addtaskAPI')
  return axios.post(`${SERVER}/create`, data, { headers });
}

function deleteTaskAPI(data: idParamType){
  return axios.delete(`${SERVER}/delete/${data.id}`)
}



export default {
  taskAPI,
  completeAPI,
  addTaskAPI,
  deleteTaskAPI
}