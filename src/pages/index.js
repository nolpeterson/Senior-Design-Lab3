import * as React from "react"
import Layout from "../components/layout"
import { getUsers, setUser, getUserID } from "../utils/users"
import { getPolls, setPoll, getPollID } from "../utils/polls"
import { getInvites, setInvite } from "../utils/invites"
import { getEvents, setEvent } from "../utils/events"

const IndexPage = () => {
  React.useEffect(() => {
    getUsers()
    getPolls()
    var date = new Date();
    getUserID('ajung1')
    getPollID('rdean', 'Meeting')
    getInvites()
    getEvents()
  }, [])
  
  return (
    <Layout>
      <h3>Scheduling appointments has never looked better.</h3>
      <h4>Log in or sign up to get started.</h4>
    </Layout>
  )
}

export default IndexPage
