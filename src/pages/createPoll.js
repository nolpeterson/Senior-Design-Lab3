import React from 'react';
import { Formik, Field, Form, ErrorMessage  } from 'formik';
import { Link } from "gatsby"
import Layout from '../components/layout';
import * as Yup from 'yup';

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
          title: '',
          location: '',
          notes: '',
          timezone: '',
          startDate: new Date(), // Start date is the current time of poll creation
          votesPerTimeslot: '',
          votesPerUser: '' 
        }}
        validationSchema={PollSchema}
        onSubmit={async (values) => {
          console.log(values); // Log the poll schema to console
          alert(JSON.stringify(values, null, 2)); // Show popup for schema TESTING
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
          <label> Timezone
              <select name="timezone" id="timezone">
                  <option defaultValue> -- Select Timezone -- </option>
                  <option>Eastern</option>
                  <option>Central</option>
                  <option>Mountain</option>
                  <option>Pacific</option>
              </select>
          </label>
          <ErrorMessage name="timezone"/>
          </div>

          <div name = "selectionDiv" style={{color: "red"}}>
          <br/>
          "The poll should allow for selection of many dates and times"
          </div>
          
          <div name = "votesTimeDiv">
          <br/>
          <label htmlFor="votesPerTimeslot">Votes Per Timeslot</label>
          <Field id="votesPerTimeslot" name="votesPerTimeslot"/>
          <ErrorMessage name="votesPerTimeslot"/>
          </div>

          <div name = "votesUserDiv">
          <br/>
          <label htmlFor="votesPerUser">Votes Per User</label>
          <Field id="votesPerUser" name="votesPerUser"/>
          <ErrorMessage name="votesPerUser"/>
          </div>

          <div name = "inviteDiv">
          <br/>
          <button>Invite Users</button>
          </div>

          <div name = "pubAndCancelDiv">
          <br/>
          <button type="submit">Publish Poll</button>
          <Link to="/">Cancel</Link>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  </Layout>
);

export default Basic;