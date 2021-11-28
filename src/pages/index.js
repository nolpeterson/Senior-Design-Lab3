import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import { getUsers } from "../utils/users"

const IndexPage = () => {
  React.useEffect(() => {
    getUsers()
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
