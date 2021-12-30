import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, ParamType, taskRequest, completionPayload, CompleteRequest, addTaskPayload, addTaskRequest, idParamType, deleteTaskRequest } from "features/todo/reducer/taskSlice";

// export function useSuggestion(){
//     const { suggestionLoading } = useSelector((state: RootState) => state.suggestion);
//     const dispatch = useDispatch();
//     const suggestionUser = useCallback((data: SuggestionPayload) => {
//       dispatch(suggestionRequest(data));
//     }, []);
//     return { suggestionLoading, suggestionUser };

//task List
export function useTask(){
    const { taskLoading } = useSelector((state: RootState) => state.task);
    const dispatch = useDispatch();
    const taskList = useCallback((data: ParamType) => {
        dispatch(taskRequest(data));
    }, [])
    return { taskLoading, taskList} 
}

export function useTaskComplete(){
    const { taskLoading } = useSelector((state: RootState) => state.task);
    const dispatch = useDispatch();
    const taskComplete = useCallback((data: completionPayload) => {
        dispatch(CompleteRequest(data));
    }, [])
    return { taskLoading, taskComplete} 
}

export function useAddTask(){
    const { taskLoading } = useSelector((state: RootState) => state.task);
    const dispatch = useDispatch();
    const addTask = useCallback((data: addTaskPayload) => {
        dispatch(addTaskRequest(data));
    }, [])
    return { taskLoading, addTask} 
}

export function useDeleteTask(){
    const { taskLoading } = useSelector((state: RootState) => state.task);
    const dispatch = useDispatch();
    const deleteTask = useCallback((data: idParamType) => {
        dispatch(deleteTaskRequest(data));
    }, [])
    return { taskLoading, deleteTask} 
}