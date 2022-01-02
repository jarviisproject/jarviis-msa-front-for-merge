import axios from "axios";
import { SuggestionResultPayload, SuggestionPayload  } from "./suggestionSlice";
const SERVER = 'http://127.0.0.2:8002/api/suggestion'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege..'
}


function suggestionAPI( data: SuggestionPayload){
    return axios.get(`${SERVER}/user/${data.user_id}`)
}

function suggestionAcceptAPI(data : SuggestionResultPayload){
  return axios.post(`${SERVER}/accept`, JSON.stringify(data), { headers });
}
function suggestionRejectAPI(data : SuggestionResultPayload){
  return axios.post(`${SERVER}/reject`, JSON.stringify(data), { headers });
}


export default {
  suggestionAPI,
  suggestionAcceptAPI,
  suggestionRejectAPI,
}