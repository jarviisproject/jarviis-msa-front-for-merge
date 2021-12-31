import axios from "axios";
import { DiaryCreatePayload, DiaryFindPayload, DiaryMemoPayload } from "./diarySlice";
const SERVER = 'http://127.0.0.3:8003/api'
// const SERVER = 'http://192.168.0.73:8000/api'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege..'
}

function findAPI( data: DiaryFindPayload){
    // alert(`API :: data :: ${data.diary_date}`)
    return axios.get(`${SERVER}/diary/find/${data.user_id}/${data.diary_date}`)
}

function memoAPI( data: DiaryMemoPayload){
    // alert(`API :: data :: ${JSON.stringify(data)}`)
    return axios.put(`${SERVER}/diary/memo`,JSON.stringify(data), { headers })
}
function createaAPI( data: DiaryCreatePayload){
    // alert(`API :: data :: ${JSON.stringify(data)}`)
    alert("일기를 열심히 쓰고있는중이에요✍️...")

    return axios.get(`${SERVER}/diary/upload/${data.user_id}`)
}
export default {
    findAPI,
    memoAPI,
    createaAPI
}