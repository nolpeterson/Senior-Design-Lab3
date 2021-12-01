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

const PollSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  location: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  timezone: Yup.string().required('Required'),
  deadline: Yup.string().required('Required'),
  votesPerTimeslot: Yup.number().required('Required').min(1, 'Minimum votes are 1'),
  votesPerUser: Yup.number().required('Required').min(1, 'Minimum votes are 1'),
  numDays: Yup.number().required('Required').min(1, 'Minimum days is 1'),
  numEvents: Yup.number().required('Required').min(1, 'Minimum events is 1'),
  lengthEvents: Yup.number().required('Required').min(5, 'Minimum length is 5 minutes'),
  startingDate: Yup.string().required('Required'),
  endingDate: Yup.string().required('Required'),
});

const events = [{}]
const localizer = momentLocalizer(moment)

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
      setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="calendar">
        <div>
            <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <DatePicker showTimeSelect dateFormat="MM/dd/yyyy h:mm aa" timeIntervals={5} placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
            <DatePicker showTimeSelect dateFormat="MM/dd/yyyy h:mm aa" timeIntervals={5} placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
            <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                Add Event
            </button>
        </div>
        <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
    </div>
  );
}

const Basic = () => (
  <Layout>
    <h1>Create Poll</h1>
    <div style={{display: "flex", 
        justifyContent: 'center',
        alignItems: 'center',}}>
      <Formik
        initialValues={{
          username: getUser().username,
          title: '',
          location: '',
          notes: '',
          timezone: '',
          deadline: '',
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
          console.log(values); // Log the poll schema to console
          var date = new Date(values.deadline)
          var PollID = await setPoll(date, values.location, values.notes, values.username, values.timezone, values.title, values.votesPerTimeslot, values.votesPerUser, values.numDays, values.numEvents, values.lengthEvents, values.startingDate, values.endingDate)
          //alert(JSON.stringify(values, null, 2));
          setTimeout(() => {
            console.log(PollID)
            sessionStorage.setItem("PollID",PollID);
            navigate('/TestCalendar')
          }, 1000);
        }}
      > 
      {({ errors, touched }) => (
        <Form>
          <div name = "titleDiv"> 
            <label htmlFor="title">Poll Title</label>
            <Field id="title" name="title"/>
            <ErrorMessage name="title">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div> 

          <div name = "locationDiv">
            <br/> 
            <label htmlFor="location">Location</label>
            <Field id="location" name="location" placeholder="optional"/>
          </div> 

          <div name = "notesDiv"> 
            <br/>
            <label htmlFor="notes">Notes</label>
            <Field id="notes" name="notes" placeholder="optional"/>
          </div>

          <div name = "timezone div">
            <br/>
            <label htmlFor="timezone">Timezone</label>
            <Field as="select" name="timezone" id="timezone">
              <option value=""></option>
              <option value="None">None</option>
              <option value="Eastern">Eastern</option>
              <option value="Central">Central</option>
              <option value="Mountain">Mountain</option>
              <option value="Pacific">Pacific</option>
            </Field>
            <ErrorMessage name="timezone">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>

          <App/>

          {/* <div name = "selectionDiv">
            <br/>
            <label htmlFor="numDays">Number of days for poll</label>
            <Field type="number" id="numDays" name="numDays"/>
            <ErrorMessage name="numDays">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>

            <br/>
            <label htmlFor="numEvents">Number of events</label>
            <Field type="number" id="numEvents" name="numEvents"/>
            <ErrorMessage name="numEvents">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>

            <br/>
            <label htmlFor="lengthEvents">Length of each event</label>
            <Field type="number" id="lengthEvents" name="lengthEvents"/>
            <ErrorMessage name="lengthEvents">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>

            <br/>
            <label htmlFor="startingDate">Poll starting date</label>
            <Field type="date" id="startingDate" name="startingDate"/>
            <ErrorMessage name="startingDate">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>

            <br/>
            <label htmlFor="endingDate">Poll ending date</label>
            <Field type="date" min = "startingDate" id="endingDate" name="endingDate"/>
            <ErrorMessage name="endingDate">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div> */}
          
          <div name = "votesTimeDiv">
            <br/>
            <label htmlFor="votesPerTimeslot">Number of votes Per Timeslot</label>
            <Field type="number" id="votesPerTimeslot" name="votesPerTimeslot"/>
            <ErrorMessage name="votesPerTimeslot">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>

          <div name = "votesUserDiv">
            <br/>
            <label htmlFor="votesPerUser">Number of votes Per User</label>
            <Field type="number" id="votesPerUser" name="votesPerUser"/>
            <ErrorMessage name="votesPerUser">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>

          <div name = "deadline div">
            <br/>
            <label htmlFor="deadline">Poll voting deadline</label>
            <Field type="datetime-local" id="deadline" name="deadline"/>
            <ErrorMessage name="deadline">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </div>

          <div name = "inviteDiv">
            <br/>
            <button>Invite Users</button>
          </div>

          <div name = "pubAndCancelDiv">
            <br/>
            <button type="submit">Publish Poll</button>
            <Link to="/dashboard">Cancel</Link>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  </Layout>
);

export default Basic;