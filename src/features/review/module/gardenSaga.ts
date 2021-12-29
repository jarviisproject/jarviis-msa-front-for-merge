import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import gardenAPI from "../reducer/gardenAPI";
import { FlowerDataPayload, FlowerIdPayload, flowerListFailure, flowerListRequest, flowerListSuccess, routineFailure, routineRequest, routineSuccess } from "../reducer/gardenSlice";


//리스트
function* list(action: PayloadAction<FlowerIdPayload>) {
    try {
        // alert("SAGA!")
        const result: FlowerDataPayload = yield call(
            gardenAPI.listAPI,
            action.payload
        );
        yield put(flowerListSuccess(result));
    } catch (error: any) {
        yield put(flowerListFailure(error))
        alert(error)
    }
}

export function* watchFlowerList() {
    yield takeLatest(flowerListRequest.type, list);
}

//리스트
function* routine(action: PayloadAction<FlowerIdPayload>) {
    try {
        // alert("SAGA!")
        const result: FlowerDataPayload = yield call(
            gardenAPI.routineAPI,
            action.payload
        );
        yield put(routineSuccess(result));
    } catch (error: any) {
        yield put(routineFailure(error))
        alert(error)
    }
}

export function* watchRoutine() {
    yield takeLatest(routineRequest.type, routine);
}