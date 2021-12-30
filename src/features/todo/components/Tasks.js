import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { LayOut } from "features/common";
import "features/todo/style/Task.scss"
import { getBindingIdentifiers } from "@babel/types";
import { taskRequest } from "../reducer/taskSlice";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import dayjs from "dayjs";
import { suggestionAcceptSuccess } from "features/suggestion/reducer/suggestionSlice";

export default function AppTasks() {
  const [task, setTask] = useState([]);
  const [counter, setCounter] = useState(0)
 
  const dateFormat = (date) => dayjs(date).format("YYYY-MM-DD");
  const today = new Date()
  const [date, setDate] = useState(dateFormat(today))

  const taskData = useSelector(state => state.task.taskData);
  useEffect(() => {
    dispatch(taskRequest({date: date}));
  }, []);
 
  const dispatch = useDispatch();
 
  if (taskData != null && counter < 1) {
    setCounter(counter + 1)
    setTask(taskData['data'])
  }
 
  return (

    <div className="todoapp stack-large">
    <h1>오늘 할일</h1>
    <AddTask />
    <h2 id="list-heading">
      {task.length} tasks remaining
    </h2>
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      <li className="todo stack-small">
      <div>
            {task.map((single) => {
                return (
                  <TaskList
                    data={single}
                  />
                );
              })}
          </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Eat</span>
          </button>
          <button type="button" className="btn btn__danger">
            Delete <span className="visually-hidden">Eat</span>
          </button>
        </div>
      </li>
    </ul>
  </div>


  );
  }