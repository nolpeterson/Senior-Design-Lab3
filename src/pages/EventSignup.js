import React from "react";
import { Link } from "gatsby"
import Layout from '../components/layout';
import Table from "../components/eventTable";

const dashboard = () => (
  <Layout>
      <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        // padding: `1.75rem 1.0875rem`,
      }}
      >

      {/* "My Polls Text" */}
      <div style={{ float: "left" }}>
        <h1>Signup</h1>
      </div>

    </div>

    {/* List of user's polls */}
    <div>
      <Table></Table>
    </div>
    
  </Layout>
);

export default dashboard;
