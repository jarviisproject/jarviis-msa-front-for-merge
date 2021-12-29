import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

//받아오는 데이터//

export interface UserDataPayload {
  data: {
    user: {
      user_name: string;
      user_email: string;
      phone: string;
      address: string;
      password: string;
      birth: string;
      token: string;
      user_interests: string;
      job: string;
    };
  };
}
export interface UserLoginDataPayload {
  data: {
    userData: {
      user_name: string;
      user_email: string;
      phone: string;
      address: string;
      password: string;
      birth: string;
      user_interests: string;
      job: string;
    };
    tokenData: string;
  };
}
export interface UserModifyDataPayload {
  data: {
    token: string;
  };
  config: {
    data: {
      user_name: string;
      user_email: string;
      phone: string;
      address: string;
      password: string;
      birth: string;
    };
  };
}

//요청하는 데이터
export interface ExistPayload {
  user_email: string;
}
export interface RemovePayload {
  user_email: string;
}
export interface LoginPayload {
  user_email: string;
  password: string;
  token: string;
  user_name: string;
  phone: string;
  address: string;
  birth: string;
}

export interface ModifyPayload {
  user_email: string;
  phone: string;
  address: string;
  password: string;
  birth: string;
  job: string;
  user_interests: string;
}
export interface JoinPayload {
  user_name: string;
  user_email: string;
  phone: string;
  address: string;
  password: string;
  birth: string;
  job: string;
  user_interests: string;
}
//미들웨어
export interface UserState {
  userLoading: boolean;
  userData: any;
  error: any;
  token: null;
}
// api의 param 타입
export interface ParamType {
  user_email: string;
}
const initialState: UserState = {
  userLoading: false,
  userData: null,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Login
    loginRequest(state: UserState, _action: PayloadAction<LoginPayload>) {
      state.userLoading = true;
      state.error = null;
    },

    loginSuccess(
      state: UserState,
      action: PayloadAction<UserLoginDataPayload>
    ) {
      alert(`서버 로그인 성공 ${JSON.stringify(action.payload)}`)
      state.userLoading = false;
      state.userData = action.payload;
    },

    loginFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      alert(`서버 로그인 실패 ${JSON.stringify(action.payload)}`)

      state.userLoading = false;
      state.error = action.payload;
    },
    //join
    joinRequest(state: UserState, _action: PayloadAction<JoinPayload>) {
      state.userLoading = true;
      state.error = null;
    },
    joinSuccess(state: UserState, action: PayloadAction<UserDataPayload>) {
      state.userLoading = false;
      state.userData = action.payload;
    },
    joinFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      alert(`회원가입 실패 ${action.payload}`)
      state.userLoading = false;
      state.error = action.payload;
    },
    //modify
    modifyRequest(state: UserState, _action: PayloadAction<ModifyPayload>) {
      state.userLoading = true;
      state.error = null;
    },
    modifySuccess(
      state: UserState,
      action: PayloadAction<UserModifyDataPayload>
    ) {
      state.userLoading = false;
      state.userData = action.payload;
    },
    modifyFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      state.userLoading = false;
      state.error = action.payload;
    },
    //exist
    existRequest(state: UserState, _action: PayloadAction<ExistPayload>) {
      state.userLoading = true;
      state.error = null;
    },
    existSuccess(state: UserState, action: PayloadAction<UserDataPayload>) {
      state.userLoading = false;
      state.userData = action.payload;
    },
    existFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      state.userLoading = true;
      state.error = null;
    },
    deleteRequest(state: UserState, _action: PayloadAction<RemovePayload>) {
      alert(`slice :: ${_action.payload}`)
      state.userLoading = true;
      state.error = null;
    },
    deleteSuccess(state: UserState, action: PayloadAction<UserDataPayload>) {
      state.userLoading = false;
      state.userData = action.payload;
    },
    deleteFailure(state: UserState, action: PayloadAction<{ error: any }>) {
      state.userLoading = true;
      state.error = null;
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
const { reducer, actions } = userSlice;
export const {
  modifyRequest,
  modifyFailure,
  modifySuccess,
  existFailure,
  existRequest,
  existSuccess,
  loginRequest,
  loginSuccess,
  loginFailure,
  joinFailure,
  joinRequest,
  joinSuccess,
  deleteFailure,
  deleteRequest,
  deleteSuccess,
} = actions;
export default reducer;
