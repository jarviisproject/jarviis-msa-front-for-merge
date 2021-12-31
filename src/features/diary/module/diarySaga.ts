import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import diaryAPI from "../reducer/diaryAPI";
import { diaryCreateFailure, DiaryCreatePayload, diaryCreateRequest, diaryCreateSuccess, DiaryDataPayload, diaryFindFailure, DiaryFindPayload, diaryFindRequest, diaryFindSuccess, diaryMemoFailure, DiaryMemoPayload, diaryMemoRequest, diaryMemoSuccess } from "../reducer/diarySlice";

// find
function* find(action: PayloadAction<DiaryFindPayload>) {
    try {
        // alert("SAGA!")
        const result: DiaryDataPayload = yield call(
            diaryAPI.findAPI,
            action.payload
        );
        yield put(diaryFindSuccess(result));
    } catch (error: any) {
        yield put(diaryFindFailure(error))
        alert(error)
    }
}

export function* watchDiaryFind() {
    yield takeLatest(diaryFindRequest.type, find);
}

// Memo
function* memo(action: PayloadAction<DiaryMemoPayload>) {
    try {
        // alert("SAGA!")
        const result: DiaryMemoPayload = yield call(
            diaryAPI.memoAPI,
            action.payload
        );
        yield put(diaryMemoSuccess(result));
    } catch (error: any) {
        yield put(diaryMemoFailure(error))
        alert(error)
    }
}

export function* watchDiaryMemo() {
    yield takeLatest(diaryMemoRequest.type, memo);
}

function* create(action: PayloadAction<DiaryCreatePayload>) {
    try {
        const result: DiaryCreatePayload = yield call(
            diaryAPI.createaAPI,
            action.payload
        );
        yield put(diaryCreateSuccess(result));
    } catch (error: any) {
        yield put(diaryCreateFailure(error))
        alert(error)
    }
}

export function* watchDiaryCreate() {
    yield takeLatest(diaryCreateRequest.type, create);
}