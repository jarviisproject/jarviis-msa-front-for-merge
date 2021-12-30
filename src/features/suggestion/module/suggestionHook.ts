import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, suggestionAcceptRequest, SuggestionPayload, 
  suggestionRejectRequest, suggestionRequest, SuggestionResultPayload
} from "../reducer/suggestionSlice";

export function useSuggestion(){
  const { suggestionLoading } = useSelector((state: RootState) => state.suggestion);
  const dispatch = useDispatch();
  const suggestionUser = useCallback((data: SuggestionPayload) => {
    dispatch(suggestionRequest(data));
  }, []);
  return { suggestionLoading, suggestionUser };
}

  export function useSuggestionAccept(){
    const { suggestionLoading } = useSelector((state: RootState) => state.suggestion);
    const dispatch = useDispatch();

    const accept = useCallback((data: SuggestionResultPayload) => {
      dispatch(suggestionAcceptRequest(data))
    }, [])
  return { suggestionLoading, accept };
  }

  export function useSuggestionReject(){
    const { suggestionLoading } = useSelector((state: RootState) => state.suggestion);
    const dispatch = useDispatch();

    const reject = useCallback((data: SuggestionResultPayload) => {
      dispatch(suggestionRejectRequest(data))
    }, [])
  return { suggestionLoading, reject}
  }