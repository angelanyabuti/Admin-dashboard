import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { formatDate } from '@fullcalendar/core';
import {Box, List, ListItem, ListItemText, Typography, useTheme} from "@mui/material";
import { tokens } from '../../theme';
import Header from "../../components/Header";

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
    //triggered when you click on an event
    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)){
            selected.event.remove();
        }
    }
    return(
    <Box m="20px">
        <Header title="CALENDAR" subtitle="Full Calendar and Events"/>
        <Box display="flex" justifyContent="space-between">
            {/*calendar sidebar*/}
            <Box flex="1 1 20%"
                 backgroundColor={colors.primary[400]}
                 p="15px"
                 borderRadius="4px">
                    <Typography variant="h5">Events</Typography>
                    <List>
                        {currentEvents.map((event) => (
                            <ListItem key={event.id}
                                      sx={{
                                        backgroundColor: colors.greenAccent[500],
                                        margin: "10px 0",
                                        borderRadius: "2px",
                                      }}>
                                        <ListItemText 
                                            primary={event.title}
                                            secondary={
                                                <Typography>
                                                    {/*Allows you to use the dates given by fullcalendar and format them*/}
                                                    {formatDate(event.start, {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </Typography>
                                            }
                                        />

                                        

                            </ListItem>
                        ))}
                    </List>

            </Box>
            {/*CALENDAR*/}
            <Box flex="1 1 100%" ml="15px">
                <FullCalendar
                    height="75vh"
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin
                    ]}
                    /*sets how the toolbar will look like at the top*/
                    headerToolbar={{
                        left:"prev,next, today",
                        center:"title",
                        right:"dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    eventsSet={(events) => setCurrentEvents(events)}
                    initialEvents={[
                        {id: "1234", title: "All-day event", date: "2024-06-14"},
                        {id: "4321", title: "Timed event", date: "2024-06-28"},
                    ]}
                    />
            </Box>
        </Box>
    </Box>
    )

}

export default Calendar;