import React from "react";
import { Link } from "gatsby"
import Layout from '../components/layout';
import Table from "../components/table";

const dashboard = () => (
  <Layout>
      <div style={{margin: `0 auto`,maxWidth: 960,}}>

      {/* "My Polls Text" */}
      <div style={{ float: "left" }}>
        <h1>My Polls</h1>
      </div>

      {/* Create new poll button */}
      <div style={{ float: "right" , marginTop: "10px" }}> 
        <Link to="/createPoll/">
          <button class="customButton" style={{width: "150px", textAlign: "center", color: "white", borderRadius: "4px", backgroundColor: "	#6495ED"}}>
            Create New Poll
          </button>
        </Link>
      </div>
      <br></br><br></br>
    </div>

    {/* List of user's polls */}
    <div>
      <Table></Table>
    </div>
    
  </Layout>
);

export default dashboard;
