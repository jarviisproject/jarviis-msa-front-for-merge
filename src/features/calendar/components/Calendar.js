import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LayOut } from 'features/common';
import EventAdd from './EventAdd';
import { eventRequest } from '../reducer/calendarSlice';

// 추가
// yarn add @fullcalendar/react
// yarn add @fullcalendar/daygrid
// yarn add @fullcalendar/timegrid
// yarn add @fullcalendar/interaction


const Calendar = () => {

  const [events, setEvents] = useState([]);
  const [counter, setCounter] = useState(0)

  const eventData = useSelector(state => state.event.eventData);
  console.log(`이벤트까지 왔다... ${JSON.stringify(eventData)}`)
  useEffect(() => {
    dispatch(eventRequest({user_id: 1}));
  }, []);
 
  const dispatch = useDispatch();
 
  if (eventData != null && counter < 1) {
    setCounter(counter + 1)
    setEvents(eventData['data'])
  }
  
  return (
    <LayOut>
    <div className="App" style={{width:"1000px", marginLeft:"262px"}}>
    {/* <EventAdd /> */}
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventColor="wheat"
      nowIndicator
      dateClick={(e) => console.log(e.dateStr)}
      eventClick={(e) => console.log(e.event.id)}
      // dateClick={EventAdd}
    />
  </div>
  </LayOut>
);
}

export default Calendar