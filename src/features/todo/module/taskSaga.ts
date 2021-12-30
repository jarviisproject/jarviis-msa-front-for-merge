import { PayloadAction } from "@reduxjs/toolkit";
import { ParamType, taskRequest, taskSuccess, taskFailure, taskListDataPayload, 
    idParamType, completionPayload, CompleteSuccess, CompleteFailure, CompleteRequest, addTaskPayload, addTaskSuccess, addTaskFailure, addTaskRequest, deleteTaskSuccess, deleteTaskFailure, deleteTaskRequest } from "features/todo/reducer/taskSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { taskAPI } from "features/todo";


function* taskList(action: PayloadAction<ParamType>){
    try {
        const result: taskListDataPayload = yield call(
            taskAPI.taskAPI,
            action.payload
        );
        yield put(taskSuccess(result));
    }
    catch (error:any){
        yield put(taskFailure(error))
    };
}

function* taskComplete(action: PayloadAction<completionPayload>){
    try {
        const result: completionPayload = yield call(
            taskAPI.completeAPI,
            action.payload
        );
        yield put(CompleteSuccess(result));
    }
    catch (error:any){
        yield put(CompleteFailure(error))
    };
}

function* addTask(action: PayloadAction<addTaskPayload>){
    try {
        const result: addTaskPayload = yield call(
            taskAPI.addTaskAPI,
            action.payload
        );
        yield put(addTaskSuccess(result));
    }
    catch (error:any){
        yield put(addTaskFailure(error))
    };
}

function* deleteTask(action: PayloadAction<idParamType>){
    try {
        const result: idParamType = yield call(
            taskAPI.deleteTaskAPI,
            action.payload
        );
        yield put(deleteTaskSuccess(result));
    }
    catch (error:any){
        yield put(deleteTaskFailure(error))
    };
}



export function* wathchTaskList(){
    yield takeLatest(taskRequest.type, taskList);
}

export function* watchTaskComplete(){
    yield takeLatest(CompleteRequest.type, taskComplete);
}

export function* watchAddTask(){
    yield takeLatest(addTaskRequest.type, addTask);
}

export function* watchDeleteTask(){
    yield takeLatest(deleteTaskRequest.type, deleteTask);
}
