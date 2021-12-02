import React from "react";
import { Link } from "gatsby"
import Layout from '../components/layout';
import Table from "../components/eventTable";

const dashboard = () => (
  <Layout>
      <div style={{margin: `0 auto`,maxWidth: 960}}>

      {/* "My Polls Text" */}
      <div style={{ float: "left" }}>
        <h1>My Polls</h1>
      </div>

      {/* Create new poll button */}
      <div style={{ float: "right" , marginTop: "10px" }}> 
        <Link to="/createPoll/">
          <button>
            Create New Poll
          </button>
        </Link>
      </div>
      <br></br><br></br>
    </div>

    <br/>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <Link to="/dashboard/">Go back to dashboard</Link>
    </div>

    {/* List of user's polls */}
    <div>
      <Table></Table>
    </div>
    
  </Layout>
);

export default dashboard;
