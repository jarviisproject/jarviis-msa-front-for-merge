import PropTypes from "prop-types";
import React, { useState }  from "react";
import { suggestionAcceptRequest, suggestionRejectRequest } from "features/suggestion/reducer/suggestionSlice";
import { useDispatch } from 'react-redux'

const SuggestionOneSingle = ({ data }) => {
  // const [counter, setCounter] = useState(0)
  // const [suggestions, setSuggestions] = useState([])
  // console.log(`setsuggestion 확인 :::${suggestions}`)
  // const onRemove = id => {
  //   const nextData = suggestion.filter(suggestion => suggestion.id !== id);
  //       console.log(`리무브 확인 ${nextData}`);
  //       setSuggestions(nextData);
    // setSuggestion(suggestion.filter(suggestion => suggestion.suggestion_id !== suggestion_id));
  // };
  // if (data != null && counter < 1) {
  //   setCounter(counter + 1)
  //   setSuggestion(data)
  // }
  const dispatch = useDispatch();

  function handleClick_accept(data) {
    dispatch(suggestionAcceptRequest(data));
    location.reload()
    // onRemove
  }

  function handleClick_reject(data){
    dispatch(suggestionRejectRequest(data))
  }


  return (
    <div>
      <div
        className="team-wrapper">
        <div className="team-img">
          <img
            className="img-fluid"
          />
          <div className="team-action">
          <h4>할까 말까</h4>  
            <a
              className="check"
              onClick = {async () => await handleClick_accept(data)}
            >
              <i className="fa fa-check" />
            </a>
            <a
              className="remove"
              onClick={async() => await handleClick_reject(data)}
            >
              <i className="fa fa-remove" />
            </a>
          </div>
        </div>
        <div className="team-content">
          <h4>{data.contents}</h4>
          <span>{`${data.start == null ? '' : data.start} `}{data.end == null ? '' : '~'}{data.end}</span>
          <span>{data.routine == null ? '' : `${data.routine}`}</span>
        </div>
      </div>
    </div>
  );
};

SuggestionOneSingle.propTypes = {
  data: PropTypes.object,
};

export default SuggestionOneSingle;
