import React from "react";
import { Link } from "gatsby"
import Layout from '../components/layout';
import Table from "../components/eventTable";
import { getParameterByName } from "../utils/url";
import { getPoll } from "../utils/polls";

const Dashboard = () => {
  var title = getParameterByName('title')
  var owner = getParameterByName('owner_id')

  var pollData 

  React.useEffect(async () => {
    pollData = await getPoll(owner, title)
    console.log(pollData.notes)
    pollData = pollData.notes
  })

  return (
    <Layout>
        <div style={{margin: `0 auto`,maxWidth: 960}}>

        {/* "Signup text" */}
        <div style={{ float: "left" }}>
          <h1>Signup</h1>
          <div dangerouslySetInnerHTML={{ __html: `Title: ${title}` }} />
          <div dangerouslySetInnerHTML={{ __html: `Owner: ${owner}` }} />
        </div>

      </div>

      <br/>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Link style= {{marginTop: "20px"}} to="/dashboard">Go back to dashboard</Link>
      </div>

      {/* List of events on a poll */}
      <div>
        <Table></Table>
      </div>
      
    </Layout>
  )
}

export default Dashboard;
