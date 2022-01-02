import PropTypes from "prop-types";
import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { CompleteRequest, deleteTaskFailure, deleteTaskRequest } from "../reducer/taskSlice";
import { historyRemoveFromTodoRequest, historyRemoveRequest, historyRequest } from "features/history/reducer/historySlice";

const TaskList = ({ data }) => {
  const [counter, setCounter] = useState(0)

  const [check, setCheck] = useState(data.completion)
  const dispatch = useDispatch()
  // function handleSubmit(data){
  //   dispatch(deleteTaskRequest({id:data.id})); 
  //   location.reload()
  // }    
  
  // function success(){
  //   const test22 = useSelector(state => state.history.historyTodo)
  //   console.log(`success function :: ${JSON.stringify(test22)}`)

  // }
  return (
    <div className="c-cb">
    <input  id="todo-0" type="checkbox" defaultChecked={check} onChange={
      ()=>{
      dispatch(CompleteRequest({id: data.id, completion: !check}))
      // handleSubmit()
      if (check == false){
        dispatch(historyRequest(
            {
              log_date: new Date().toISOString("yyyy-mm-dd hh:MM:ss"),
              location: data.location==null? "" : data.location,
              address: "",
              weather: "",
              log_type: "todo",
              contents: data.title,
              event_id: data.id,
              user_id: 1
            }
          ))
      }
      else{
        dispatch(historyRemoveFromTodoRequest(data.id))}
        setCheck(!check)
    }
    }/>
    <label className="todo-label" htmlFor="todo-0">
      {data.title}
    </label>
    {check ? <><img class="rotate-center"
              style={{ width: '6%', visibility: "visible", float: "right" }}
              src={require("features/todo/images/feedback.png").default} />
              <Button variant="outlined" onClick={async()=>{await dispatch(deleteTaskRequest({id:data.id})) }} >삭제</Button>
            </>
    :<>
    <Button variant="outlined" onClick={async()=>{await dispatch(deleteTaskRequest({id:data.id})) }} >삭제</Button>
    <img 
    style={{ width: '6%', visibility: "hidden", float: "right" }}
    src={require("features/todo/images/feedback.png").default}
    /></>}
  </div>   
  );
};

TaskList.propTypes = {
  data: PropTypes.object,
};

export default TaskList;
