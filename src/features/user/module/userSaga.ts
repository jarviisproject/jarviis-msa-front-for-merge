import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  LoginPayload,
  UserDataPayload,
  loginRequest,
  loginFailure,
  loginSuccess,
  JoinPayload,
  joinSuccess,
  joinFailure,
  joinRequest,
  ExistPayload,
  existSuccess,
  existFailure,
  existRequest,
  ModifyPayload,
  modifySuccess,
  modifyFailure,
  modifyRequest,
  UserLoginDataPayload,
  UserModifyDataPayload,
  deleteRequest,
  RemovePayload,
  deleteSuccess,
  List,
  listSuccess,
  listFailure,
  listRequest,
} from "features/user/reducer/userSlice";
import { userAPI } from "features/user";

function* remove(action: PayloadAction<RemovePayload>) {
  try {
    const result: UserDataPayload = yield call(
      userAPI.removeAPI,
      action.payload
    );
    yield put(deleteSuccess(result));
    localStorage.clear()
    alert("필요하시면 다시 돌아오세요🤖")
    window.location.href = "/home"

  } catch (error: any) {
    yield put(modifyFailure(error));
  }
}

function* exist(action: PayloadAction<ExistPayload>) {
  try {
    const result: UserDataPayload = yield call(
      userAPI.existAPI,
      action.payload
    );
    yield put(existSuccess(result));
    alert("가능한 아이디입니다.")
  } catch (error: any) {
    yield put(existFailure(error))
    alert("쓸수없는 아이디입니다.")
  }
}


  function* join(action: PayloadAction<JoinPayload>) {
    try {
      
      const result: UserDataPayload = yield call(
        userAPI.joinAPI,
        action.payload
      );
      yield put(joinSuccess(result));
      window.location.href = 'users/login'
      alert("🎄회원가입을 축하드립니다🎄")
    } catch (error: any) {
      yield put(joinFailure(error));
      alert("정보를 다시 수정해주세요😥")
    }
  }
  function* login(action: PayloadAction<LoginPayload>) {
    try {
      const result: UserLoginDataPayload = yield call(
        userAPI.loginAPI,
        action.payload
      );
      yield put(loginSuccess(result));
      window.localStorage.setItem('sessionUser', JSON.stringify(result.data))
      window.location.href = "/suggestion/event"
    } catch (error: any) {
      alert("아이디 혹은 비밀번호가 틀렸습니다😞")
      yield put(loginFailure(error));
    }
  }
  function* modify(action: PayloadAction<ModifyPayload>) {
    try {
      const result: UserModifyDataPayload = yield call(
        userAPI.modifyAPI,
        action.payload
      );
      yield put(modifySuccess(result));
      window.localStorage.setItem('sessionUser', JSON.parse(JSON.stringify(result.config.data)))
      alert("수정이 완료되었습니다✔️")
      window.location.href = "/mypage/setting"

    } catch (error: any) {
      yield put(modifyFailure(error));
    }
  }
  function* list(action: PayloadAction<List>) {
    try {
      alert("사가 트라이")
      const result: UserDataPayload = yield call(
        userAPI.listAPI,
        action.payload
      );
      yield put(listSuccess(result));
      alert("수정이 완료되었습니다✔️")

    } catch (error: any) {
      yield put(listFailure(error));
    }
  }


  // Watch 함수
  export function* watchLogin() {
    yield takeLatest(loginRequest.type, login);
  }
  export function* watchJoin() {
    yield takeLatest(joinRequest.type, join);
  }
  export function* watchExist() {
    yield takeLatest(existRequest.type, exist);
  }
  export function* watchModify() {
    yield takeLatest(modifyRequest.type, modify);
  }
  export function* watchRemove() {
    yield takeLatest(deleteRequest.type, remove);
  }
  export function* watchList() {
    yield takeLatest(listRequest.type, list);
  }