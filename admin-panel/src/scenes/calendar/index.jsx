import { useState } from 'react';
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import {Box, List, ListItem, ListItemText, Typography, useTheme} from "@mui/material";
import Header from "../../theme";
import { tokens } from '../../theme';

const Calendar = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);
    const handleDateClick = (selected) =>{
        //prompt is a native javascript function that triggers a standard javascript alert pop up
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        //once we click on a date we can unselect it immediately 
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });           
        }
    }

}

export default Calendar;