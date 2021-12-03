import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage  } from 'formik';
import { Link } from "gatsby"
import Layout from '../components/layout';
import * as Yup from 'yup';
import { getUser } from '../services/auth';
import { getPoll, updatePoll } from '../utils/polls';
import { navigate } from '@reach/router';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getEventPollID } from "../utils/events";
import { getParameterByName } from "../utils/url";
import { createDatetime } from "../utils/datetime";

const PollSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  location: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  timezone: Yup.string().required('Required'),
  deadline: Yup.string().required('Required').nullable(),
  votesPerTimeslot: Yup.number().required('Required').min(1, 'Minimum votes are 1'),
  votesPerUser: Yup.number().required('Required').min(1, 'Minimum votes are 1'),
});

const events = []

function Basic() {

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }

    const [oldPoll, setOldPoll] = useState({});
    const [oldEvent, setOldEvent] = useState({});

    React.useEffect(async () => {
    var tempPoll = await getPoll(getParameterByName('owner_id'), getParameterByName('title'))
    var tempEvent = await getEventPollID(getParameterByName('owner_id'), getParameterByName('title'))
    setOldPoll(tempPoll)
    setOldEvent(tempEvent)
    }, [])

    return (
    <Layout>
        <h1>Edit Poll</h1>
        <h6>* indicates required field.</h6>
        <div style={{display: "flex", justifyContent: 'center', alignItems: 'center',}}>
        <Formik
            enableReinitialize
            initialValues={{
            username: getUser().username,
            title: oldPoll.title,
            location: oldPoll.location,
            notes: oldPoll.notes,
            timezone: oldPoll.timezone,
            deadline: createDatetime(((oldPoll.deadline || {}).seconds || [])),
            endEvent: '',
            startEvent: '',
            eventTitle: oldEvent.title,
            votesPerTimeslot: oldPoll.vote_limit_options,
            votesPerUser: oldPoll.vote_limit_user,
            }}
            validationSchema={PollSchema}
            onSubmit={async (values) => {
            console.log(values);
            var date = values.deadline
            console.log(date)
            await updatePoll(date, values.location, values.notes, values.username, values.timezone, values.title, values.votesPerTimeslot, values.votesPerUser)
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);
            }}
        > 
        {({ errors, touched, values, setFieldValue }) => (
            <Form>
            <div name = "titleDiv" style = {{display: "flex", flexDirection: "column ", border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}> 
                <h3>What is this poll about?</h3>
                <label htmlFor="title">Poll Title*</label>
                <Field id="title" name="title" style = {{width: "25%"}}/>
                <ErrorMessage name="title">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                </ErrorMessage>

                <br/> 
                <label htmlFor="location">Location</label>
                <Field id="location" name="location" placeholder="optional" style = {{width: "25%"}}/>

                <br/>
                <label htmlFor="notes">Notes</label>
                <Field id="notes" name="notes" placeholder="optional" style = {{width: "25%"}}/>
            </div>
            <br/>

            <div name = "timezone div" style = {{display: "flex", flexDirection: "column ", border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}>
            <h3>Specifiy meeting timezone.</h3>
                <label htmlFor="timezone">Timezone*</label>
                <Field as="select" name="timezone" id="timezone" style = {{width: "25%"}}>
                <option style={{display:"none"}} value="">select a timezone</option>
                <option value="Eastern">Eastern(GMT-6)</option>
                <option value="Central">Central(GMT-7)</option>
                <option value="Mountain">Mountain(GMT-8)</option>
                <option value="Pacific">Pacific(GMT-9)</option>
                </Field>
                <ErrorMessage name="timezone">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                </ErrorMessage>
            </div>
            <br/>
            
            <div name = "votesTimeDiv" style = {{display: "flex", flexDirection: "column ", border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}>
                <h3>How many votes do you want users to have?</h3>
                <label htmlFor="votesPerTimeslot">Number of votes Per Timeslot*</label>
                <Field type="number" id="votesPerTimeslot" name="votesPerTimeslot" style = {{width: "10%"}}/>
                <ErrorMessage name="votesPerTimeslot">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                </ErrorMessage>
                <br/>
                <label htmlFor="votesPerUser">Number of votes Per User*</label>
                <Field type="number" id="votesPerUser" name="votesPerUser" style = {{width: "10%"}}/>
                <ErrorMessage name="votesPerUser">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                </ErrorMessage>
            </div>
            <br/>

            <div name = "deadline div" style = {{display: "flex", flexDirection: "column ", border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}>
                <h3>When do you want voting to finish?</h3>
                <label htmlFor="deadline">Poll voting deadline*</label>
                <DatePicker
                showTimeSelect 
                dateFormat="MM/dd/yyyy h:mm aa"
                selected={values.deadline}
                placeholderText = "Voting Deadline"
                name="deadline"
                onChange={date => setFieldValue('deadline', date)}
                />
                <ErrorMessage name="deadline">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
                </ErrorMessage>
            </div>
            <br/>

            <div name = "pubAndCancelDiv" style = {{border: "3px solid #eee", borderRadius: "15px", padding: "20px", overflow: "auto"}}>
                <h3>And on the 7th day, god made this poll, probaly.</h3>
                <div style={{ float: "left"}}> 
                <button type="submit">Update Poll</button>
                </div>
                <div style={{marginInline:"150px"}}>
                <Link to="/dashboard">Cancel</Link>
                </div>
            </div>
            </Form>
            )}
        </Formik>
        </div>
    </Layout>
    );
}

export default Basic;
 