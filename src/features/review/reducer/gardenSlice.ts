import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface FlowerDataPayload {
    data: {
        id: number;
        create_date: string;
        update_date: string;
        title: string;
        grade: string;
        step: string;
        color: string;
        log_id: string;
        event_id: string;
        user_id: number;

    }
}
export interface FlowerIdPayload {
    user_id: number
}

export interface GardenState {
    gardenLoading: boolean;
    gardenData: any;
    error: any;
}

export interface ParamType {
    id: number;
}
const initialState: GardenState = {
    gardenLoading: false,
    gardenData: null,
    error: null,
};

const GardenSlice = createSlice({
    name: "gardens",
    initialState,
    reducers: {
        flowerListRequest(state: GardenState, _action: PayloadAction<FlowerIdPayload>) {
            // alert("Slice!")
            state.gardenLoading = true;
            state.error = null;
        },
        flowerListSuccess(state: GardenState, action: PayloadAction<FlowerDataPayload>) {
            // alert("Slice SUCCESS!")
            // alert(JSON.stringify(action.payload))
            state.gardenLoading = false;
            state.gardenData = action.payload;
        },
        flowerListFailure(state: GardenState, action: PayloadAction<{ error: any }>) {
            alert("Slice FAIL!")
            state.gardenLoading = true;
            state.error = action.payload;
        },
        routineRequest(state: GardenState, _action: PayloadAction<FlowerIdPayload>) {
            alert("Slice!")
            state.gardenLoading = true;
            state.error = null;
        },
        routineSuccess(state: GardenState, action: PayloadAction<FlowerDataPayload>) {
            alert("Slice SUCCESS!")
            alert(JSON.stringify(action.payload))
            state.gardenLoading = false;
            state.gardenData = action.payload;
            window.location.href = "../review/review"

        },
        routineFailure(state: GardenState, action: PayloadAction<{ error: any }>) {
            alert("Slice FAIL!")
            state.gardenLoading = true;
            state.error = action.payload;
        },
    }
})


const store = configureStore({
    reducer: {
        garden: GardenSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
const { reducer, actions } = GardenSlice;

export const {
    flowerListRequest,
    flowerListSuccess,
    flowerListFailure,
    routineRequest,
    routineSuccess,
    routineFailure
} = actions;

export default reducer;