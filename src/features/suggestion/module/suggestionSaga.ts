import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { suggestionAPI } from "features/suggestion";
import { suggestionFailure, SuggestionListDataPayload, SuggestionPayload, suggestionRequest, 
  suggestionAcceptFailure, SuggestionResultPayload, suggestionAcceptRequest, suggestionAcceptSuccess, suggestionSuccess, suggestionRejectRequest, suggestionRejectSuccess, suggestionRejectFailure } from "../reducer/suggestionSlice";


//리스트
function* suggestionUser(action: PayloadAction<SuggestionPayload>) {
  // alert("suggestion saga action 감지")
  try {
      const result: SuggestionListDataPayload = yield call(
        suggestionAPI.suggestionAPI,
        action.payload
      );
      // alert(`saga action 실행 후 alert ::: ${JSON.stringify(action.payload)}`)
      yield put(suggestionSuccess(result));
      // alert("suggestion saga 실행")
      // window.localStorage.setItem('sessionSuggestion', JSON.stringify(result.data)) 

  } catch (error: any) {
      yield put(suggestionFailure(error))
      alert(error)
  }
}

function* accecpt(action: PayloadAction<SuggestionResultPayload>){
  try {
    const result: SuggestionResultPayload = yield call(
      suggestionAPI.suggestionAcceptAPI,
      action.payload
    );
    yield put(suggestionAcceptSuccess(result));
    // window.location.href =''
  } catch (error: any) {
    yield put(suggestionAcceptFailure(error))
    alert(error)
  }
}

function* reject(action: PayloadAction<SuggestionResultPayload>){
  try {
    const result: SuggestionResultPayload = yield call(
      suggestionAPI.suggestionRejectAPI,
      action.payload
    );
    yield put(suggestionRejectSuccess(result));
    // window.location.href =''
  } catch (error: any) {
    yield put(suggestionRejectFailure(error))
    alert(error)
  }
}

export function* wacthSuggestion(){
  yield takeLatest(suggestionRequest.type, suggestionUser);
}

export function* wacthAccept(){
  yield takeLatest(suggestionAcceptRequest.type, accecpt)
}

export function* wacthReject(){
  yield takeLatest(suggestionRejectRequest.type, reject)
}