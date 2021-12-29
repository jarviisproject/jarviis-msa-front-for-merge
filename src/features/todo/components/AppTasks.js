import React, { useEffect, useState } from "react";
import { LayOut } from "features/common";
import "features/todo/style/Task.scss"
import { getBindingIdentifiers } from "@babel/types";
import Button from '@mui/material/Button';
import { historyRequest } from "features/history/reducer/historySlice";
import { useDispatch } from "react-redux";

export default function AppTasks() {
  const [task, setTask] = useState();
  const [check, setCheck] = useState(false)
  const dispatch = useDispatch()



  return (

    <div className="todoapp stack-large">
      <h1>오늘 할일</h1>
      <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
        />
        <button style={{ marginLeft: "20px" }} type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
      <div className="filters btn-group stack-exception">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-0" type="checkbox" defaultChecked={false} onChange={() => {
              setCheck(!check)
            }} />
            <label className="todo-label" htmlFor="todo-0">
              운동 24시간 하기
            </label>
            {check ? <><img class="rotate-center"
              style={{ width: '6%', visibility: "visible", float: "right" }}
              src={require("features/todo/images/feedback.png").default} />
              <Button variant="outlined" onClick={() => {
                dispatch(historyRequest(
                  {
                    log_date: new Date().toISOString("yyyy-mm-dd hh:MM:ss"),
                    location: "",
                    address: "",
                    weather: "",
                    log_type: "todo",
                    contents: "content 담아주세여",
                    user_id: 1
                  }
                ))
              }}>히스토리에도 추가하기</Button>
            </>
              : <img
                style={{ width: '6%', visibility: "hidden", float: "right" }}
                src={require("features/todo/images/feedback.png").default} />}
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