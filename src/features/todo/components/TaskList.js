import PropTypes from "prop-types";
import React, { useEffect, useState }  from "react";
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import { CompleteRequest, deleteTaskFailure, deleteTaskRequest } from "../reducer/taskSlice";

const TaskList = ({ data }) => {
  
  const [check, setCheck] = useState([data.completion])
  const dispatch = useDispatch()
  function handleSubmit(data){
    console.log(data)
    dispatch(deleteTaskRequest({id:data.id})); 
    location.reload()
  }

//  console.log(data.id)
  return (
    <div className="c-cb">
    <input  id="todo-0" type="checkbox" defaultChecked={check} onChange={()=>{
      dispatch(CompleteRequest({id: data.id, completion: !check}))
      setCheck(!check)
    }}/>
    <label className="todo-label" htmlFor="todo-0">
      {data.title}
    </label>
    {check ? <><img class="rotate-center"
              style={{ width: '6%', visibility: "visible", float: "right" }}
              src={require("features/todo/images/feedback.png").default} />
              <Button variant="outlined" 
              onClick={() => {
                // dispatch(historyRequest(
                //   {
                //     log_date: new Date().toISOString("yyyy-mm-dd hh:MM:ss"),
                //     location: "",
                //     address: "",
                //     weather: "",
                //     log_type: "todo",
                //     contents: "content 담아주세여",
                //     user_id: 1
                //   }
                // ))
              }}>히스토리에도 추가하기</Button>
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
