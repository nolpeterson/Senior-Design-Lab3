import * as React from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Layout from "../components/layout"
import events from '../events'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = () => (
    <Layout>
        <div>
            <Calendar
            events={events}
            
            views={['month', 'week', 'day']}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            />
        </div>
    </Layout>
)

export default MyCalendar