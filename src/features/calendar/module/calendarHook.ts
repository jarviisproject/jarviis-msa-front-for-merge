import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEventPayload, addEventRequest, deleteEventRequest, eventRequest, idParamType, RootState, UserParamType } from "../reducer/calendarSlice";

export function useEvent(){
    const { eventLoading } = useSelector((state: RootState) => state.event);
    const dispatch = useDispatch();
    const eventList = useCallback((data: UserParamType) => {
        dispatch(eventRequest(data));
    }, [])
    return { eventLoading, eventList} 
}

export function useAddTask(){
    const { eventLoading } = useSelector((state: RootState) => state.event);
    const dispatch = useDispatch();
    const addTask = useCallback((data: addEventPayload) => {
        dispatch(addEventRequest(data));
    }, [])
    return { eventLoading, addTask} 
}

export function useDeleteTask(){
    const { eventLoading } = useSelector((state: RootState) => state.event);
    const dispatch = useDispatch();
    const deleteTask = useCallback((data: idParamType) => {
        dispatch(deleteEventRequest(data));
    }, [])
    return { eventLoading, deleteTask} 
}