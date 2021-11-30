import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Link } from "gatsby"
import Layout from '../components/layout';

const Basic = () => (
  <Layout>
    <div>
      <h1>Create Poll</h1>
      <Formik
        initialValues={{
          //owner_id: 
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          if (Object.keys(values).length != 7) {
            alert(JSON.stringify("please fill out all form sections", null, 2));
          } else {
            alert(JSON.stringify(values, null, 2));
          }
        }}
      >
        <Form>
          <br/>
          <label htmlFor="deadline">Deadline</label>
          <Field type="datetime-local" id="deadline" name="deadline"/>
          <br/>
          <label htmlFor="title">Poll Title</label>
          <Field id="title" name="title"/>
          <br/>
          <label htmlFor="location">Location</label>
          <Field id="location" name="location"/>
          <br/>
          <label htmlFor="notes">Notes</label>
          <Field id="notes" name="notes"/>
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
          <br/>
          <label htmlFor="vote_limit_options">Options limit</label>
          <Field type="number" id="vote_limit_options" name="vote_limit_options"/>
          <br/>
          <label htmlFor="vote_limit_user">Users Limit</label>
          <Field type="number" id="vote_limit_user" name="vote_limit_user"/>
          <br/>
          <button type="submit">Publish Poll</button>
          <Link to="/dashboard">Cancel</Link>
        </Form>
      </Formik>
    </div>
  </Layout>
);

export default Basic;