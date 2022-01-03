import axios from "axios";
import { ModifyPayload,ExistPayload, JoinPayload, LoginPayload, RemovePayload, List } from "./userSlice";
const SERVER = "http://127.0.0.1:8000/api";
// const SERVER = "http://127.0.0.1:3001/";
const headers = {
  "Content-Type": "application/json",
  Authorization: "JWT fefege..",
};

function loginAPI(data: LoginPayload) {
  alert(`API data :: ${JSON.stringify(data)}`)
  return axios.post(`${SERVER}/users/login`, JSON.stringify(data), { headers });
}
function joinAPI(data: JoinPayload) {
  return axios.post(`${SERVER}/users`, JSON.stringify(data), { headers });
}
function existAPI(data: ExistPayload) {
  return axios.get(`${SERVER}/users/exist/${data}`);
}
function modifyAPI(data: ModifyPayload) {
  return axios.put(`${SERVER}/users`, JSON.stringify(data), { headers });
}
function removeAPI(data: RemovePayload) {
  return axios.delete(`${SERVER}/users/remove/${data}`);
}
function listAPI(data: List) {
  alert("가니")
  return axios.get(`${SERVER}/users/list/${data}`);
}

export default {
  loginAPI,
  joinAPI,
  existAPI,
  listAPI,
  removeAPI,
  modifyAPI,
};
