import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { HistoryDataPayload, historyFailure, HistoryPayload, historyRemoveFailure, HistoryRemovePayload, historyRemoveRequest, historyRemoveSuccess, historyRequest, historySuccess, ListDataPayload } from "features/history/reducer/historySlice";
import { historyListRequest, historyListSuccess, historyListFailure } from "features/history/reducer/historySlice"
import { HistoryModifyPayload, historyModifyRequest, historyModifySuccess, historyModifyFailure } from "features/history/reducer/historySlice";
import { historyAutoAddRequest, historyAutoAddSuccess, historyAutoAddFailure } from "features/history/reducer/historySlice";
import { historyAPI } from "features/history";

function* create(action: PayloadAction<HistoryPayload>) {
    try {
        const result: HistoryDataPayload = yield call(
            historyAPI.createAPI,
            action.payload
        );
        yield put(historySuccess(result));
        window.location.href = "/history/history"
    } catch (error: any) {
        yield put(historyFailure(error))
        alert(`ERROR :: ${error}`)
    }
}

export function* watchCreate() {
    yield takeLatest(historyRequest.type, create);
}
//리스트
function* list(action: PayloadAction<ListDataPayload>) {
    alert('# 3 SAGA - historyRequest')

    try {
        const result: HistoryDataPayload = yield call(
            historyAPI.listAPI,
            action.payload
        );
        alert('# 5 SAGA success - historyRequest')
        yield put(historyListSuccess(result));
        

        window.localStorage.setItem('sessionHistory', JSON.stringify(result.data))

    } catch (error: any) {
        yield put(historyListFailure(error))
        alert(error)
    }
}

export function* watchHistoryList() {
    yield takeLatest(historyListRequest.type, list);
}
//수정
function* modify(action: PayloadAction<HistoryModifyPayload>) {
    try {
        const result: HistoryModifyPayload = yield call(
            historyAPI.modifyAPI,
            action.payload
        );
        yield put(historyModifySuccess(result));
        window.location.href = "/history/history"
    } catch (error: any) {
        yield put(historyModifyFailure(error))
        alert(error)
    }
}

export function* watchHistoryModify() {
    yield takeLatest(historyModifyRequest.type, modify);
}

//자동 기록 추가
function* autoAdd(action: PayloadAction<HistoryDataPayload>) {
    try {
        const result: HistoryDataPayload = yield call(
            historyAPI.autoAddAPI,
            action.payload
        );
        yield put(historyAutoAddSuccess(result));
        window.location.href = "/history/history"
    } catch (error: any) {
        yield put(historyAutoAddFailure(error))
        alert(error)
    }
}

export function* watchHistoryAutoAdd() {
    yield takeLatest(historyAutoAddRequest.type, autoAdd);
}
// 삭제
function* remove(action: PayloadAction<HistoryRemovePayload>) {
    try {
        const result: HistoryRemovePayload = yield call(
            historyAPI.removeAPI,
            action.payload
        );
        yield put(historyRemoveSuccess(result));
        window.location.href = "/history/history"
    } catch (error: any) {
        yield put(historyRemoveFailure(error))
        alert(error)
    }
}
export function* watchHistoryRemove() {
    yield takeLatest(historyRemoveRequest.type, remove);
}