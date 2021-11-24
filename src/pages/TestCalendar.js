import * as React from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Layout from "../components/layout"
require('react-big-calendar/lib/css/react-big-calendar.css');

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = () => (
    <Layout>
        <div>
            <Calendar
            style={{ height: "100vh" }} 
            views={['month', 'week', 'day']}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            />
        </div>
    </Layout>
)

export default MyCalendar