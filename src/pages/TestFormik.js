import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Link } from "gatsby"
import Layout from '../components/layout';

const Basic = () => (
  <Layout>
    <div>
      <h1>Basic Form With Basic Validation</h1>
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
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="Jane" />
          <br/>
          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />
          <br/>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="jane@acme.com" type="email"/>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <p> 
        <Link to="/">Home</Link>
      </p>
    </div>
  </Layout>
);

export default Basic;