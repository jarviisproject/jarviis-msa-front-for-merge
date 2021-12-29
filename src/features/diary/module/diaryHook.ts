import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiaryCreatePayload, diaryCreateRequest, DiaryFindPayload, diaryFindRequest, DiaryMemoPayload, diaryMemoRequest, RootState } from "../reducer/diarySlice";

export function useDiaryFind() {
    const { diaryLoading } = useSelector((state: RootState) => state.diary);
    const dispatch = useDispatch();
    const find = useCallback((data: DiaryFindPayload) => {
        dispatch(diaryFindRequest(data));
    }, [])
    return { diaryLoading, find};
}

export function useDiaryMemo() {
    const { diaryLoading } = useSelector((state: RootState) => state.diary);
    const dispatch = useDispatch();
    const memo = useCallback((data: DiaryMemoPayload) => {
        dispatch(diaryMemoRequest(data));
    }, [])
    return { diaryLoading, memo};
}

export function useDiaryCreate() {
    const { diaryLoading } = useSelector((state: RootState) => state.diary);
    const dispatch = useDispatch();
    const create = useCallback((data: DiaryCreatePayload) => {
        dispatch(diaryCreateRequest(data));
    }, [])
    return { diaryLoading, create};
}

