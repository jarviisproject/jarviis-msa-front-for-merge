import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HistoryPayload, historyRequest, RootState, ListDataPayload,
    historyListRequest, HistoryDataPayload, historyModifyRequest, HistoryModifyPayload,
     historyAutoAddRequest,
     HistoryRemovePayload,
     historyRemoveRequest} from "../reducer/historySlice";

export function useHistory() {
    const { historyLoading } = useSelector((state: RootState) => state.history);
    const dispatch = useDispatch();
    const create = useCallback((data: HistoryPayload) => {
        dispatch(historyRequest(data));
    }, [])
    return { historyLoading, create};
}

export function useHistoryList() {
    const { historyLoading } = useSelector((state: RootState) => state.history);
    const dispatch = useDispatch();
    const list = useCallback((data: ListDataPayload) => {
        dispatch(historyListRequest(data));
    }, [])
    return { historyLoading, list};
}

export function useHistoryModify() {
    const { historyLoading } = useSelector((state: RootState) => state.history);
    const dispatch = useDispatch();
    const list = useCallback((data: HistoryModifyPayload) => {
        dispatch(historyModifyRequest(data));
    }, [])
    return { historyLoading, list};
}

export function useHistoryAutoAdd() {
    const { historyLoading } = useSelector((state: RootState) => state.history);
    const dispatch = useDispatch();
    const autoAdd = useCallback((data: HistoryDataPayload) => {
        dispatch(historyAutoAddRequest(data));
    }, [])
    return { historyLoading, autoAdd};
}

export function useHistoryRemove() {
    const { historyLoading } = useSelector((state: RootState) => state.history);
    const dispatch = useDispatch();
    const remove = useCallback((data: HistoryRemovePayload) => {
        dispatch(historyRemoveRequest(data));
    }, [])
    return { historyLoading, remove};
}