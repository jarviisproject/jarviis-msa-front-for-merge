import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SuggestionOneSingle from "./SuggestionOneSingle";
import { useDispatch, useSelector } from 'react-redux'
import { suggestionRequest } from "features/suggestion/reducer/suggestionSlice"
import { stringify } from "querystring";
// useEffect 참고 https://xiubindev.tistory.com/100


const SuggestionOne = () => {
  const [counter, setCounter] = useState(0)
  const [suggestion, setSuggestion] = useState([])
  const dispatch = useDispatch();

  //  유저 아이디 변경
  useEffect(() => {
    dispatch(suggestionRequest({user_id:1}));
  }, []);

  const suggestionData = useSelector(state => state.suggestion.suggestionData)
  if (suggestionData != null && counter < 1) {
    setCounter(counter + 1)
    setSuggestion(suggestionData['data'])
  }

  return (
    <div className='team-area'>
        <div>
          {suggestion.map((single, key) => {
              return (
                <SuggestionOneSingle
                  data={single}
                  key={key}
                />
              );
            })}
        </div>
      </div>
 
  );
};

export default SuggestionOne;
