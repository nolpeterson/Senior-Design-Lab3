import * as React from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Layout from "../components/layout"
import events from '../events'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from "@reach/router"

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = () => {
    React.useEffect(() => {
        console.log(sessionStorage.getItem("PollID"))
    }, [])

    return (
        <Layout>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Link to="/dashboard/">Go back to dashboard</Link>
            </div>

            <br/>
            <div>
                <Calendar
                events={events}
                style={{ height: "100vh" }} 
                views={['month', 'week', 'day']}
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                />
            </div>
        </Layout>
    )
}

export default MyCalendar
