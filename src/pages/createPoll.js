import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage  } from 'formik';
import { Link } from "gatsby"
import Layout from '../components/layout';
import * as Yup from 'yup';
import { getUser } from '../services/auth';
import { getPollID, setPoll } from '../utils/polls';
import { getUserID } from '../utils/users';
import { navigate } from '@reach/router';
import { Calendar , momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setEventEvents } from "../utils/events";

const PollSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  location: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  timezone: Yup.string().required('Required'),
  deadline: Yup.string().required('Required').nullable(),
  // startEvent: Yup.string().required('Required').nullable(),
  // endEvent: Yup.string().required('Required').nullable(),
  votesPerTimeslot: Yup.number().required('Required').min(1, 'Minimum votes are 1'),
  votesPerUser: Yup.number().required('Required').min(1, 'Minimum votes are 1'),
  // eventTitle: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  // numDays: Yup.number().required('Required').min(1, 'Minimum days is 1'),
  // numEvents: Yup.number().required('Required').min(1, 'Minimum events is 1'),
  // lengthEvents: Yup.number().required('Required').min(5, 'Minimum length is 5 minutes'),
  // startingDate: Yup.string().required('Required'),
  // endingDate: Yup.string().required('Required'),
});

const events = []
const localizer = momentLocalizer(moment)

function Basic() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
}

return (
  <Layout>
    <h1>Create Poll</h1>
    <h6>* indicates required field.</h6>
    <div style={{display: "flex", justifyContent: 'center',alignItems: 'center',}}>
      <Formik
        initialValues={{
          username: getUser().username,
          title: '',
          location: '',
          notes: '',
          timezone: '',
          deadline: '',
          endEvent: '',
          startEvent: '',
          eventTitle: '',
          votesPerTimeslot: '',
          votesPerUser: '',
          numDays: '1',
          numEvents: '1',
          lengthEvents: '5',
          startingDate: '',
          endingDate: '',
        }}
        validationSchema={PollSchema}
        onSubmit={async (values) => {
          console.log(values);
          var date = new Date(values.deadline)
          var PollID = await setPoll(date, values.location, values.notes, values.username, values.timezone, values.title, values.votesPerTimeslot, values.votesPerUser, values.numDays, values.numEvents, values.lengthEvents, values.startingDate, values.endingDate)
          console.log(allEvents)
          setTimeout(() => {
            console.log(PollID)
            sessionStorage.setItem("PollID",PollID);
          }, 500);
          await setEventEvents(allEvents, values.username, values.title)
          setTimeout(() => {
            navigate('/dashboard')
          }, 500);
          
        }}
      > 
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <div name = "titleDiv" style = {{display: "flex", flexDirection: "column ", border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}> 
            <h3>Step 1:</h3>
            <h4>What is this poll about?</h4>
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
          <h3>Step 2:</h3>
          <h4>Specifiy meeting timezone.</h4>
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
          
          <div name="calendar" style = {{ border: "3px solid #eee", borderRadius: "15px", padding: "20px", marginTop: "10px"}}>
            <h3>Step 3:</h3> 
            <h4>Create event(s). You can add multiple events, with unique dates and times<br/> You must specify at least one event</h4>
            <div name="eventOptions" style = {{ border: "3px solid #eee", borderRadius: "15px", padding: "20px", marginTop: "10px"}}>
              <label htmlFor="eventTitle">Event Title*</label>
              <br/>
              <input name="eventTitle" type="text" style={{ width: "25%"}} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              {/* <ErrorMessage name="eventTitle">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
              </ErrorMessage> */}
              <br/><br/>
              <label htmlFor="startEvent">Event start date*</label>
              <DatePicker name="startEvent" showTimeSelect dateFormat="MM/dd/yyyy h:mm aa" timeIntervals={5} placeholderText="Choose a start date" selected={newEvent.start} 
                onChange={(start) => setNewEvent({ ...newEvent, start })} withPortal/>
              {/* <ErrorMessage name="startEvent">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
              </ErrorMessage> */}
              <br/>
              <label htmlFor="endEvent">Event end date*</label>
              <DatePicker name="endEvent" showTimeSelect dateFormat="MM/dd/yyyy h:mm aa" timeIntervals={5} placeholderText="Choose an end date" selected={newEvent.end} 
                onChange={(end) => setNewEvent({ ...newEvent, end })} withPortal/>
              {/* <ErrorMessage name="endEvent">
                { msg => <div style={{ color: 'red' }}>{msg}</div> }
              </ErrorMessage> */}
              <br/>
              <button type="button" stlye={{ alignSelf: "flex-start"}} onClick={handleAddEvent}>Add Event</button>
            </div>
            <br/>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: '50vh'}} />
          </div>
          <br/>
          
          <div name = "votesTimeDiv" style = {{display: "flex", flexDirection: "column ", border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}>
            <h3>Step 4:</h3>
            <h4>How many votes do you want users to have?</h4>
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
            <h3>Step 5:</h3>
            <h4>When do you want voting to finish?</h4>
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

          <div name = "inviteDiv" style = {{border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}>
            <h3>Step 6:</h3>
            <h4>Send invites to the poll.</h4>
            <button type="button">Invite Users</button>
          </div>
          <br/>

          <div name = "pubAndCancelDiv" style = {{border: "3px solid #eee", borderRadius: "15px", padding: "20px", overflow: "auto"}}>
            <h3>Step 7:</h3>
            <h4>And on the 7th day, god made this poll, probaly.</h4>
            <div style={{ float: "left"}}> 
              <button type="submit">Publish Poll</button>
            </div>
            <div style={{marginInline:"150px"}}>
              <Link to="/dashboard">Cancel Poll</Link>
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
