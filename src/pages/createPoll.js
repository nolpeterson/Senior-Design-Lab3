import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage  } from 'formik';
import { Link } from "gatsby"
import Layout from '../components/layout';
import * as Yup from 'yup';
import { getUser } from '../services/auth';
import { setPoll } from '../utils/polls';
import { navigate } from '@reach/router';
import { Calendar , momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setEventEvents } from "../utils/events";
import emailjs from "emailjs-com";
import { setInvite } from "../utils/invites";

const PollSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  location: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  timezone: Yup.string().required('Required'),
  deadline: Yup.string().required('Required').nullable(),
  votesPerTimeslot: Yup.number().required('Required').min(1, 'Minimum votes are 1'),
  votesPerUser: Yup.number().required('Required').min(1, 'Minimum votes are 1'),
});

const events = []
const localizer = momentLocalizer(moment)
var globalNum = 1
var globalMinutes = 5

function Basic() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    console.log(newEvent)
    if (globalNum > 1) {
      console.log('num')
      var startSeconds = Date.parse(newEvent.start) / 1000
      var endSeconds = Date.parse(newEvent.end) / 1000
      var totalTime = (endSeconds - startSeconds) / globalNum
      console.log(totalTime)
      for (var i = 0; i < globalNum; i++) {
        var startDate = new Date(Date.UTC(1970, 0, 1));
        startDate.setUTCSeconds(startSeconds + i * totalTime)
        var endDate = new Date(Date.UTC(1970, 0, 1));
        endDate.setUTCSeconds(startSeconds + (i + 1) * totalTime)
        var event = {title: `${newEvent.title}-${i}`, start: startDate, end: endDate}
        console.log(event)
        if (i != globalNum - 1) {
          allEvents.push(event)
          console.log(allEvents)
        } else {
          setAllEvents([...allEvents, event]);
        }
      }
    } else if (globalMinutes > 0) {
      console.log('minutes')
      var startSeconds = Date.parse(newEvent.start) / 1000
      var endSeconds = Date.parse(newEvent.end) / 1000
      var totalRepeats = (endSeconds - startSeconds) / (globalMinutes * 60)
      var totalTime = (endSeconds - startSeconds) / totalRepeats
      console.log(totalRepeats)
      console.log(totalTime)
      for (var i = 0; i < totalRepeats; i++) {
        var startDate = new Date(Date.UTC(1970, 0, 1));
        startDate.setUTCSeconds(startSeconds + i * totalTime)
        var endDate = new Date(Date.UTC(1970, 0, 1));
        endDate.setUTCSeconds(startSeconds + (i + 1) * totalTime)
        var event = {title: `${newEvent.title}-${i}`, start: startDate, end: endDate}
        console.log(event)
        if (i != totalRepeats - 1) {
          allEvents.push(event)
        } else {
          setAllEvents([...allEvents, event]);
        }
      }
    } else {
      setAllEvents([...allEvents, newEvent]);
    }
  }

  function updateNum(num) {
    console.log(num.target.value)
    globalNum = num.target.value
    console.log(globalNum)
  }

  function updateMinutes(minutes) {
    console.log(minutes.target.value)
    globalMinutes = minutes.target.value
    console.log(globalMinutes)
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
          emailInvites: '',
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
          await setEventEvents(allEvents, values.username, values.title, values.votesPerTimeslot)
          setTimeout(() => {
            navigate('/dashboard')
          }, 500);
          var emails = values.emailInvites.split(', ')
          console.log(emails)
          var url = window.location.href.substr(0, window.location.href.length - 10) + "EventSignup?title=" + values.title.replace(/ /g, "%20") + "?owner_id=" +  values.username
          console.log(url)
          emails.forEach(email => setInvite(email, values.username, values.title, url))
          emails.forEach(email => emailjs.send("service_4da7hz1","template_ixccgdi",{reply_to: email, message: url},"user_C9QFMXD2JTZf0mLcSM271")
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            )
          )
        }}
      > 
      {({values, setFieldValue }) => (
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
              <option value="None">No Timezone</option>
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
              <br/><br/>
              <label htmlFor="startEvent">Event start date*</label>
              <DatePicker name="startEvent" showTimeSelect dateFormat="MM/dd/yyyy h:mm aa" timeIntervals={5} placeholderText="Choose a start date" selected={newEvent.start} 
                onChange={(start) => setNewEvent({ ...newEvent, start })} withPortal/>
              <br/>
              <label htmlFor="endEvent">Event end date*</label>
              <DatePicker name="endEvent" showTimeSelect dateFormat="MM/dd/yyyy h:mm aa" timeIntervals={5} placeholderText="Choose an end date" selected={newEvent.end} 
                onChange={(end) => setNewEvent({ ...newEvent, end })} withPortal/>
              <br/>
              <div name="eitherOrOption" style = {{overflow: "auto", border: "3px solid #eee", borderRadius: "15px", padding: "20px", marginTop: "10px"}}>
                <h5>How do you want to split timeslots inside event? <br/>Pick either option below (default "x" timeslots)</h5>
                <div style={{float: "left"}}>
                  <label htmlFor="splitEvent">Split Event into "x" timeslots</label>
                  <br/>
                  <Field type="number" name="splitEvent" min="1" placeholder="1"
                    onChange={(num) => updateNum(num)}/>
                  <br/><br/>
                </div>
                <div style={{margin: "15px", float: "center"}}>
                  <h5>- OR -</h5>
                </div>
                <div style={{float: "right"}}>
                  <label htmlFor="minuteEvent">Split Event into "x" minute timeslots</label>
                  <br/>
                  <Field type="number" name="minuteEvent" step="5" min="0" placeholder="0"
                    onChange={(minutes) => updateMinutes(minutes)}/>  
                </div>
              </div>
              <button class="customButton" style={{marginTop: "20px",width: "150px", textAlign: "center", color: "white", borderRadius: "4px", backgroundColor: "#4682B4"}}
                type="button" onClick={handleAddEvent}>Add Event</button>
            </div>
            <br/>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: '50vh'}} />
          </div>
          <br/>
          
          <div name = "votesTimeDiv" style = {{display: "flex", flexDirection: "column ", border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}>
            <h3>Step 4:</h3>
            <h4>How many votes do you want users to have?</h4>
            <label htmlFor="votesPerTimeslot">Number of votes Per Timeslot*</label>
            <Field type="number" id="votesPerTimeslot" min="1" name="votesPerTimeslot" style = {{width: "10%"}}/>
            <ErrorMessage name="votesPerTimeslot">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
            <br/>
            <label htmlFor="votesPerUser">Number of votes Per User*</label>
            <Field type="number" id="votesPerUser" min="1" name="votesPerUser" style = {{width: "10%"}}/>
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
            <h4>Send email invites to the poll. <br/>For multiple emails, separate them by a comma.</h4>
            <Field style={{overflowY: "scroll",resize: "none"}} placeholder="email@example.com, email@example.com" component="textarea" rows="4" cols="35" type="text" id="emailInvites" name="emailInvites"/>
          </div>
          <br/>

          <div name = "pubAndCancelDiv" style = {{border: "3px solid #eee", borderRadius: "15px", padding: "20px", overflow: "auto"}}>
            <h3>Step 7:</h3>
            <h4>And on the 7th day, god made this poll, probaly.</h4>
            <div style={{ float: "left"}}> 
              <button class="customButton" style={{width: "150px", textAlign: "center", color: "white", borderRadius: "4px", backgroundColor: "#4682B4"}}
                type="submit">Publish Poll</button>
            </div>
            <div style={{marginInline:"175px"}}>
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
