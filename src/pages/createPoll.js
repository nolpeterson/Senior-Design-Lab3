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
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <label htmlFor="title">Poll Title</label>
          <Field id="title" name="title"/>
          <br/>
          <label htmlFor="location">Location</label>
          <Field id="location" name="location"/>
          <br/>
          <label htmlFor="notes">Notes</label>
          <Field id="notes" name="notes"/>
          <br/>
          <label> Timezone
              <select name="timezone" id="timezone">
                  <option>Eastern</option>
                  <option>Central</option>
                  <option>Mountain</option>
                  <option>Pacific</option>
              </select>
          </label>
          <br/>
          <button type="submit">Publish Poll</button>
          <Link to="/">Cancel</Link>
        </Form>
      </Formik>
    </div>
  </Layout>
);

export default Basic;