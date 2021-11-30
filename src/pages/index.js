import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { getUsers, setUser, getUserID } from "../utils/users"
import { getPolls, setPoll, getPollID } from "../utils/polls"
import { getInvites, setInvite } from "../utils/invites"
import { getEvents, setEvent } from "../utils/events"

const IndexPage = () => {
  React.useEffect(() => {
    getUsers()
    //setUser('ajung@email', 'Alex', 'Jung', 'pass', 'ajung1')
    getPolls()
    var date = new Date();
    //setPoll(date, "alex house", "alex mean :(", )
    getUserID('ajung1')
    getPollID('rdean', 'Meeting')
    getInvites()
    getEvents()
  }, [])
  

  return (
    <Layout>
      <Link to="/TestFormik/">Test Form Page</Link> <br/>
      <Link to="/createPoll/">Create Poll</Link> <br/>
      <Link to="/TestCalendar/">Test Calendar</Link>
    </Layout>
  )
}

export default IndexPage
