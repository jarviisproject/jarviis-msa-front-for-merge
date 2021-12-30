import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

//받아오는 데이터//
export interface eventDataPayload {
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


export interface completionPayload {
  id:number;
  completion: boolean;
}

export interface addEventPayload{
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
export interface eventState {
  eventLoading: boolean;
  eventData: any;
  error: any;
}

// api의 param 타입
export interface idParamType {
  id: number;
}
export interface UserParamType {
  user_id: number;
}



const initialState: eventState = {
  eventLoading : false,
  eventData: null,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {

    //suggestion
    eventRequest(state: eventState, _action: PayloadAction<UserParamType>) {
      state.eventLoading = true;
      state.error = null;
    },

    eventSuccess(state: eventState, action: PayloadAction<eventDataPayload>) {
      state.eventLoading = false;
      state.eventData = action.payload;
    },

    eventFailure(state: eventState, action: PayloadAction<{ error: any }>) {
      state.eventLoading = true;
      state.error = action.payload;
    },

    // 수정필요(디테일 확인해야함)
    
    addEventRequest(state: eventState, _action: PayloadAction<addEventPayload>) {
      state.eventLoading = true;
      state.error = null;
    },

    addEventSuccess(state: eventState, action: PayloadAction<addEventPayload>) {
      state.eventLoading = false;
      state.eventData = action.payload;
    },

    addEventFailure(state: eventState, action: PayloadAction<{ error: any }>) {
      state.eventLoading = true;
      state.error = action.payload;
    },    
    deleteEventRequest(state: eventState, _action: PayloadAction<idParamType>) {
      state.eventLoading = true;
      state.error = null;
    },

    deleteEventSuccess(state: eventState, action: PayloadAction<idParamType>) {
      state.eventLoading = false;
      state.eventData = action.payload;
    },

    deleteEventFailure(state: eventState, action: PayloadAction<{ error: any }>) {
      state.eventLoading = true;
      state.error = action.payload;
    },
  }
})

const store = configureStore({
  reducer: {
      event: eventSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
const { reducer, actions } = eventSlice;

export const {
  eventRequest,
  eventSuccess,
  eventFailure,
  addEventRequest,
  addEventSuccess,
  addEventFailure,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFailure
} = actions;

export default reducer;
    

