import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import dayjs from "dayjs";
import { addTaskRequest, taskRequest } from "../reducer/taskSlice";




export default function TaskAdd() {
    const dateFormat = (date) => dayjs(date).format("YYYY-MM-DD 00:00");
    const today = new Date()
    const [date, setDate] = useState(dateFormat(today))
    const [task, setTask] = useState({})
    console.log(date)
    const test=(e)=>{
        setTask(e.target.value)
        console.log(task)
    }
    // const defaultValues = {
    //     user_id: 1, //로그인 되면 id 넣기
    //     title: '',
    //     classification: '',
    //     start: date,
    //     end: '',
    //     location: '', 
    //     completion: '', 
    //     description: '', 
    // };
    const dispatch = useDispatch()

    // const { control, formState, handleSubmit, reset, getValues } = useForm({
        // mode: 'onChange',
    //     defaultValues,
    // });
    // function onSubmit() {
    //     reset(defaultValues);
    // }
    return (<>
        <form
        >
            <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            placeholder="What needs to be done?"
            onChange={test}
            />
            <button style={{marginLeft:"20px"}} type="submit" className="btn btn__primary btn__lg"  
            onClick={async()=>await dispatch(addTaskRequest({title: task, start:date}))}
            >
                Add
            </button>
        </form>   
    </>)
}