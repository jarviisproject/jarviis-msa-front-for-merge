import { values } from 'lodash';
import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components';
import TimelineModify from './TimelineModify';
import { historyListRequest } from "features/history/reducer/historySlice"
import { useForm } from 'react-hook-form';
// 참고한 블로그 : https://code-masterjung.tistory.com/99
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker } from "@mui/lab";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { triggerDateSelect } from '@fullcalendar/react';
import { HistoryMap } from '..';




export default function TimelineLog() {
  const [counter, setCounter] = useState(0)
  const [juudata, setJuudata] = useState([
    {
      "0": {
        "id": "25",
        "location": "비트캠프",
        "address": "서울 강남구 강남대로94길 20",
        "x": "127.029037792462",
        "y": "37.4994078625536",
        "log_date": "2021-12-20 05:06:55+00:00",
        "weather": "맑음",
        "log_type": "normal",
        "contents": "밥을 먹어요",
        "user_id": "1"
      }
    },
    {
      "1": {
        "id": "26",
        "location": "비트캠프",
        "address": "서울 강남구 강남대로94길 20",
        "x": "127.029037792462",
        "y": "37.4994078625536",
        "log_date": "2021-12-20 05:06:55+00:00",
        "weather": "맑음",
        "log_type": "normal",
        "contents": "너무 힘들어요..",
        "user_id": "1"
      }
    }
  ])
  const dateFormat = (date) => dayjs(date).format("YYYY-MM-DD");
  const today = new window.Date()
  const [date, setDate] = useState(dateFormat(today))
  useEffect(() => {
    // alert('# 1 dispatch - historyRequest'),
    dispatch(historyListRequest({
      user_id: 1,
      date: date
    }))
  }, [date]);
  const dispatch = useDispatch()
  const mytest = useSelector(state => state.history.historyData)
  if (mytest != null && counter < 1) {
    // alert('# 7 component - historyRequest'),
    setCounter(counter + 1)
    setJuudata(mytest['data'])
  }


  return (<>
    <div style={{ borderCollapse: "collapse", textAlign: "right" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={["day"]}
          label="날짜 이동"
          value={today}
          maxDate={"2021-12-21"}
          onChange={(newValue) => {
            // triggerDateSelect
            setDate(newValue);
            setJuudata(mytest['data'])
          }}
          renderInput={(params) => (
            <TextField {...params} helperText={null} />
          )}
        />
      </LocalizationProvider>
      <br />
      <button> Go!</button>
    </div>
    <HistoryMap data={juudata} />
    {Object.keys(juudata).map((value, index, array) => (
      <TimelineItem>
        <Date>{juudata[value].log_date} ..<b>{juudata[value].weather}</b></Date>
        <Title>{juudata[value].log_type}</Title>
        <Contents>
          <p><b>{juudata[value].location}</b>에서 {juudata[value].contents}</p>
          {/* <p>{JSON.stringify(juudata[value])}</p> */}
          <TimelineModify history={juudata[value]} />
        </Contents>
      </TimelineItem>
    ))
    }
  </>);
};


const Container = styled.div`
 
`

const TimelineList = styled.ul`

  border-left: 2px solid ;
  list-style: none;
`

const TimelineItemContainer = styled.li`
  list-style: none;
`;

const Date = styled.span`
  padding: 4px 12px;
  background: wheat;
  color: gray;
  border-radius: 16px;
`;

const Title = styled.h4`
  margin: 16px 0 0;
  padding: 0;
  color: dimgray;
  opacity: 0.8;
  text-align:left;
`;

const Contents = styled.p`
  margin: 8px 0 0;
  color: dimgray;
`;

const animate = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding: 28px 20px;
  &:hover {
    background: rgba(105, 105, 105, 0.2);
    ${Date} {
      background: seagreen;
      color: white;
      font-weight: bold;
    }
    ${Title} {
      color: lime;
      font-weight: bold;
    }
    ${Contents} {
      color: gray;
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 32px;
    left: -7px;
    width: 12px;
    height: 12px;
    background: dimgray;
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 1);
  }
  &::after {
    content: '';
    position: absolute;
    top: 32px;
    left: -6px;
    width: 12px;
    height: 12px;
    background: lime;
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0, 255, 0, 1);
    opacity: 0;
  }
  &:hover::after {
    animation: ${animate} 0.5s linear infinite;
  }
`;