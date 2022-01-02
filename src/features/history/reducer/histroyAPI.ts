import axios from "axios";
import { HistoryPayload, ListDataPayload, HistoryDataPayload, HistoryModifyPayload
, HistoryRemovePayload } from "./historySlice";
// const SERVER = 'http://192.168.0.73:8000/api'
const SERVER = 'http://127.0.0.3:8003/api'

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege..'
}

function createAPI( data: HistoryPayload){
    // alert(`히스토리 추가 테스트 :: ${JSON.stringify(data)}`)
    return axios.post(`${SERVER}/history/create`, JSON.stringify(data), { headers })
}
function listAPI( data: ListDataPayload){
    // alert('# 4 LIST - historyRequest')
    return axios.post(`${SERVER}/history/list`,JSON.stringify(data), { headers })
}
function modifyAPI( data: HistoryModifyPayload){
    // alert(JSON.stringify(data))
    return axios.put(`${SERVER}/history/modify`,JSON.stringify(data), { headers })
}
function autoAddAPI( data: HistoryDataPayload){
    return axios.get(`${SERVER}/history/upload`)
}
function removeAPI( data: HistoryRemovePayload){
    // alert(`히스토리 삭제 테스트 :: ${JSON.stringify(data)}`)

    return axios.delete(`${SERVER}/history/remove/${data}`)
}
function removeFromTodoAPI( data: HistoryRemovePayload){
    // alert(`히스토리 삭제 테스트 :: ${JSON.stringify(data)}`)
    return axios.delete(`${SERVER}/history/remove-from-todo/${data}`)
}
// const modify = x => axios.put(`${SERVER}/history/modify/${x}`)
// const remove = x => axios.delete(`${SERVER}/history/remove/${x}`)
// const create = x => axios.post(`${SERVER}/history/create`,JSON.stringify(x),{headers})
// const find = x => axios.get(`${SERVER}/history/find/${x}`)//pk로 찾는거 하나 무조건 있어야됌
// const list = x => axios.get(`${SERVER}/history/list/${x}`)//page로 찾는거 하나 
// const hmap = x => axios.get(`${SERVER}/history/map/${x}`)


export default {
    createAPI,
    listAPI,
    modifyAPI,
    autoAddAPI,
    removeAPI,
    removeFromTodoAPI
}