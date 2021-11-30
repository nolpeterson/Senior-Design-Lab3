import React from 'react';
import { Formik, Field, Form, ErrorMessage  } from 'formik';
import { Link } from "gatsby"
import Layout from '../components/layout';
import * as Yup from 'yup';
import { getUser } from '../services/auth';
import { setPoll } from '../utils/polls';

const timezones = ["Eastern", "Central", "Mountain", "Pacific"];

const PollSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(),
  location: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  // timezone: Yup.string().required().oneOf(timezones),
  votesPerTimeslot: Yup.number().min(1, 'Minimum votes are 1'),
  votesPerUser: Yup.number().min(1, 'Minimum votes are 1')
});

const Basic = () => (
  <Layout>
    <h1>Create Poll</h1>
    <div style={{display: "flex", 
        justifyContent: 'center',
        alignItems: 'center',}}>
      <Formik
        initialValues={{
          username: getUser().username,
        }}
        validationSchema={PollSchema}
        onSubmit={async (values) => {
          console.log(values); // Log the poll schema to console
          if (Object.keys(values).length != 8) {
            alert(JSON.stringify("please fill out all form sections", null, 2));
          } else {
            var date = new Date(values.deadline)
            setPoll(date, values.location, values.notes, values.username, values.timezone, values.title, values.votesPerTimeslot, values.votesPerUser)
            alert(JSON.stringify(values, null, 2));
          }
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
          <Field id="location" name="location"/>
          </div> 

          <div name = "notesDiv"> 
          <br/>
          <label htmlFor="notes">Notes</label>
          <Field id="notes" name="notes"/>
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
          <ErrorMessage name="timezone"/>
          </div>

          <div name = "deadline div">
            <br/>
            <label htmlFor="deadline">Deadline</label>
            <Field type="datetime-local" id="deadline" name="deadline"/>
            <br/>
          </div>

          <div name = "selectionDiv" style={{color: "red"}}>
          <br/>
          "The poll should allow for selection of many dates and times"
          </div>
          
          <div name = "votesTimeDiv">
          <br/>
          <label htmlFor="votesPerTimeslot">Votes Per Timeslot</label>
          <Field type="number" id="votesPerTimeslot" name="votesPerTimeslot"/>
          <ErrorMessage name="votesPerTimeslot"/>
          </div>

          <div name = "votesUserDiv">
          <br/>
          <label htmlFor="votesPerUser">Votes Per User</label>
          <Field type="number" id="votesPerUser" name="votesPerUser"/>
          <ErrorMessage name="votesPerUser"/>
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