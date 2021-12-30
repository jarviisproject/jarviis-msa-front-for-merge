import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

//받아오는 데이터//
export interface taskListDataPayload {
  data:[
    id: number,
    user_id: number,
    created: string,
    update: string,
    classification: string,
    type: string,
    title: string,
    start: string,
    end: string,
    location: string,
    completion: string,
    description: string
  ]
}



//요청하는 데이터
export interface taskPayload {
  user_id: number;
}

export interface completionPayload {
  id:number;
  completion: boolean;
}

export interface addTaskPayload{
  user_id: number,
  classification: string,
  title: string,
  start: string,
  end: string,
  location: string, 
  completion: string, 
  description: string, 
}



//미들웨어
export interface taskState {
  taskLoading: boolean;
  taskData: any;
  error: any;
}

// api의 param 타입
export interface ParamType {
  date: string;
}
export interface idParamType{
  id:number;
}

const initialState: taskState = {
  taskLoading : false,
  taskData: null,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    //suggestion
    taskRequest(state: taskState, _action: PayloadAction<ParamType>) {
      state.taskLoading = true;
      state.error = null;
    },

    taskSuccess(state: taskState, action: PayloadAction<taskListDataPayload>) {
      state.taskLoading = false;
      state.taskData = action.payload;
    },

    taskFailure(state: taskState, action: PayloadAction<{ error: any }>) {
      state.taskLoading = true;
      state.error = action.payload;
    },
    CompleteRequest(state: taskState, _action: PayloadAction<completionPayload>) {
      state.taskLoading = true;
      state.error = null;
    },

    CompleteSuccess(state: taskState, action: PayloadAction<completionPayload>) {
      state.taskLoading = false;
      state.taskData = action.payload;
    },

    CompleteFailure(state: taskState, action: PayloadAction<{ error: any }>) {
      state.taskLoading = true;
      state.error = action.payload;
    },
    addTaskRequest(state: taskState, _action: PayloadAction<addTaskPayload>) {
      state.taskLoading = true;
      state.error = null;
    },

    addTaskSuccess(state: taskState, action: PayloadAction<addTaskPayload>) {
      state.taskLoading = false;
      state.taskData = action.payload;
    },

    addTaskFailure(state: taskState, action: PayloadAction<{ error: any }>) {
      state.taskLoading = true;
      state.error = action.payload;
    },    
    deleteTaskRequest(state: taskState, _action: PayloadAction<idParamType>) {
      state.taskLoading = true;
      state.error = null;
    },

    deleteTaskSuccess(state: taskState, action: PayloadAction<idParamType>) {
      state.taskLoading = false;
      state.taskData = action.payload;
    },

    deleteTaskFailure(state: taskState, action: PayloadAction<{ error: any }>) {
      state.taskLoading = true;
      state.error = action.payload;
    },
  }
})

const store = configureStore({
  reducer: {
      task: taskSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
const { reducer, actions } = taskSlice;

export const {
  taskRequest,
  taskSuccess,
  taskFailure,
  CompleteRequest,
  CompleteSuccess,
  CompleteFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure
} = actions;

export default reducer;
    

