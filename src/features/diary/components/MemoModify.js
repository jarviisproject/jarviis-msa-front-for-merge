


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
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { diaryMemoRequest } from "../reducer/diarySlice";



export default function TimelineModify(props) {
    const t = props.data
    const defaultValues = {
        id: t.id,
        memo: t.memo,
    }
    const dispatch = useDispatch()
    // const [mode, setMode] = useState(0)
    // const today = new Date()
    const { control, formState, handleSubmit, reset, getValues } = useForm({
        mode: 'onChange',
        defaultValues,
    });
    return (<>
        <Box
            component="form"
            sx={{ m: 3, width: 1550, maxWidth: '100%', }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(async (data) => {
                await dispatch(diaryMemoRequest({
                    ...data,
                    id: t.id
                }))
            })} >
            <Controller
                name="memo"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="standard-multiline-static"
                        // label="MEMO"
                        multiline
                        rows={4}
                        // defaultValue="MEMO"
                        variant="standard"
                        fullWidth
                    />
                )} />
            <Button type="submit" variant="text" >수정 완료</Button>
        </Box>
    </>)
}

