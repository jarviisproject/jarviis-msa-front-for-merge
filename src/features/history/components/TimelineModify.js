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
import { historyModifyRequest, historyRemoveRequest } from "../reducer/historySlice";



export default function TimelineModify(props) {
    const t = props.history
    const defaultValues = {
        id: t.id,
        user_id: t.user_id, //로그인 되면 id 넣기
        log_type: t.log_type,
        contents: t.contents,
        location: t.location,
        log_date: t.log_date,
        weather: t.weather,
    }
    const dispatch = useDispatch()
    const [mode, setMode] = useState(0)
    const today = new Date()
    const { control, formState, handleSubmit, reset, getValues } = useForm({
        mode: 'onChange',
        defaultValues,
    });
    return (<>
        {mode == 0 ? <>
            <Button variant="text" onClick={() => {
                setMode(1)
            }}>수정 하기</Button>
            <Button variant="text" onClick={() => {
                dispatch(historyRemoveRequest(t.id))
            }}>삭제 하기</Button>
            </>
            : <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(async (data) => {
                await dispatch(historyModifyRequest({
                    ...data,
                    id: t.id,
                    user_id: t.user_id
                }))
            })}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ width: '20ch' }}>
                <Controller
                    name="log_date"
                    label="날씨"
                    control={control}
                    // value = {defaultValues.log_date}
                    render={({ field }) => (
                        <DateTimePicker
                            {...field}
                            renderInput={(field) => <TextField {...field} />
                            }
                        />)} />

            </LocalizationProvider>

            <FormControl sx={{ width: '15ch' }}>
                <InputLabel id="weather-select-label">날씨</InputLabel>
                <Controller
                    name="weather"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            labelId="weather-select-label"
                            id="weather-select"
                            // value={defaultValues.weather}
                            label="weather"
                        // onChange={handleChange}
                        >
                            <MenuItem value={'맑음'}>맑음</MenuItem>
                            <MenuItem value={'구름 많음'}>구름 많음</MenuItem>
                            <MenuItem value={'흐림'}>흐림</MenuItem>
                            <MenuItem value={'비'}>비</MenuItem>
                            <MenuItem value={'비/눈'}>비/눈</MenuItem>
                            <MenuItem value={'눈'}>눈</MenuItem>
                            <MenuItem value={'소나기'}>소나기</MenuItem>
                            <MenuItem value={'데이터 없음'}>모르겠음!</MenuItem>
                        </Select>
                    )} />
            </FormControl>
            <FormControl sx={{ width: '15ch' }}>
                <InputLabel id="category-select-label">카테고리</InputLabel>
                <Controller
                    name="log_type"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            labelId="category-select-label"
                            id="category-select"
                            // value={defaultValues.log_type}
                            label="category"
                        // value="normal"
                        // onChange={handleChange}
                        >
                            <MenuItem value={'normal'}>일반</MenuItem>
                            <MenuItem value={'visit'}>방문</MenuItem>
                            <MenuItem value={'payment'}>결제 내역</MenuItem>
                            <MenuItem value={'study'}>공부</MenuItem>
                            <MenuItem value={'workout'}>운동</MenuItem>
                        </Select>
                    )} />
            </FormControl>
            <Controller
                name="location"
                control={control}
                render={({ field }) => (
                    <TextField {...field} id="outlined-basic" label="장소" variant="outlined" sx={{ width: '20ch' }} placeholder="방문 장소" />
                )} />
            <Controller
                name="address"
                control={control}
                render={({ field }) => (
                    <TextField {...field} id="outlined-basic" label="주소" variant="outlined" sx={{ width: '20ch' }} placeholder="상세 주소" />
                )} />
            <br />
            <Controller
                name="contents"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="text"
                        id="outlined-basic" label="내용" variant="outlined"
                        sx={{ width: '100.5ch' }} placeholder="무엇을 했다!"
                    />
                )} />
            <br />
            <Button type="submit" variant="text" >수정 완료</Button>
            <Button variant="text" onClick={() => setMode(0)}>취소 하기</Button>

        </Box>}
    </>)
}