import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <Link to="/TestFormik/">Test Form Page</Link> <br/>
    <Link to="/createPoll/">Create Poll</Link>
  </Layout>
)

export default IndexPage
