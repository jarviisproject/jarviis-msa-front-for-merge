import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlowerIdPayload, flowerListRequest, RootState, routineRequest } from "../reducer/gardenSlice";

export function useFlowerList() {
    const { gardenLoading } = useSelector((state: RootState) => state.garden);
    const dispatch = useDispatch();
    const list = useCallback((data: FlowerIdPayload) => {
        dispatch(flowerListRequest(data));
    }, [])
    return { gardenLoading, list};
}

export function useRoutine() {
    const { gardenLoading } = useSelector((state: RootState) => state.garden);
    const dispatch = useDispatch();
    const routine = useCallback((data: FlowerIdPayload) => {
        dispatch(routineRequest(data));
    }, [])
    return { gardenLoading, routine};
}

