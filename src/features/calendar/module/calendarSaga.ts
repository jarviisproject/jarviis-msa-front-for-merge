import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { calendarAPI } from 'features/calendar';
import { addEventFailure, addEventPayload, addEventRequest, addEventSuccess, deleteEventFailure, deleteEventRequest, deleteEventSuccess, eventDataPayload, eventFailure, eventRequest, eventSuccess, idParamType, UserParamType } from "../reducer/calendarSlice";
import { deleteTaskSuccess } from "features/todo/reducer/taskSlice";


function* eventList(action: PayloadAction<UserParamType>){
    try {
        const result: eventDataPayload = yield call(
            calendarAPI.eventListAPI,
            action.payload
        );
        console.log(`eventdatapayload - 사가 ${JSON.stringify(result)}`)
        yield put(eventSuccess(result));
    }
    catch (error:any){
        yield put(eventFailure(error))
    };
}


function* addEvent(action: PayloadAction<addEventPayload>){
    try {
        const result: addEventPayload = yield call(
            calendarAPI.addTaskAPI,
            action.payload
        );
        yield put(addEventSuccess(result));
    }
    catch (error:any){
        yield put(addEventFailure(error))
    };
}

function* deleteEvent(action: PayloadAction<idParamType>){
    try {
        const result: idParamType = yield call(
            calendarAPI.deleteTaskAPI,
            action.payload
        );
        yield put(deleteEventSuccess(result));
    }
    catch (error:any){
        yield put(deleteEventFailure(error))
    };
}



export function* watchEventList(){
    yield takeLatest(eventRequest.type, eventList);
}

export function* watchAddEvent(){
    yield takeLatest(addEventRequest.type, addEvent);
}

export function* watchDeleteEvent(){
    yield takeLatest(deleteEventRequest.type, deleteEvent);
}
