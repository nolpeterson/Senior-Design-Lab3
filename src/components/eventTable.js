import React, { useState } from 'react'
import { useTable } from 'react-table'
import { getUser, isLoggedIn } from '../services/auth';
import { deleteEvent, getEventPollID, getEvents, updateEvent, verifyUserEventCount } from '../utils/events';
import { getPoll, verifyDeadline } from '../utils/polls';
import { getParameterByName } from '../utils/url';
import { createUpdatedDateRange } from '../utils/datetime';
import { Formik, Field, Form  } from 'formik';

var globalOwner = ""
var globalTitle = ""
var globalUserLimit
var globalDatetime
var globalIDs
var globalNotes
var globalLocation

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function App() {
const [data, setData] = useState([]);

const signUp = e => { // e.target.value = i " " participant_name: "0 Dean"
  var vals = e.target.value.split(' ')
  console.log(vals)
  var eventID = globalIDs[vals[0]]
  console.log(eventID)
  var participant = vals[1]
  console.log(participant)
  updateEvent(eventID, participant)
}

  React.useEffect(async () => {
    console.log(await getEvents())
    var title = getParameterByName('title')
    var owner = getParameterByName('owner_id')
    var user_limit = await getPoll(owner, title)
    console.log(user_limit)
    globalUserLimit = user_limit.vote_limit_user
    globalNotes = user_limit.notes
    globalLocation = user_limit.location
    console.log(globalUserLimit)
    globalOwner = owner
    globalTitle = title
    console.log(title)
    console.log(owner)
    var temp = await getEventPollID(owner, title)
    console.log(temp)
    temp[0].forEach(data => data.datetime = createUpdatedDateRange(data.datetime.seconds, data.length.seconds))
    console.log(temp[0])
    globalIDs = temp[1]
    setData(temp[0])
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Events',
        columns: [
          {
            Header: participant => 'Participant Name',
            accessor: 'participant_name',
            Cell: participant => {
              if (participant.value == "") {
                return <h5>Open Slot</h5>
              } else {
                return participant.value
              }
            }
          },
          {
            Header: 'Start - End',
            accessor: 'datetime'
          },
          {
            Header: 'Sign up',
            accessor: 'tes',
            Cell: (row) => {
              globalDatetime = row.row.id
              if (row.row.values.participant_name == "") {
                return (
                  <Formik
                    initialValues={{
                      name: row.row.values.participant_name,
                      datetime: row.row.values.datetime
                    }}
                    onSubmit={async (values) => {
                      console.log(values);
                      var vals = row.row.id
                      console.log(vals)
                      var eventID = globalIDs[vals]
                      console.log(eventID)
                      var participant = values.name
                      console.log(participant)
                      var validator = await verifyUserEventCount(globalOwner, globalTitle, participant, globalUserLimit)
                      var deadlineValidator = await verifyDeadline(globalOwner, globalTitle)
                      if (!deadlineValidator) { // past deadline
                        alert(JSON.stringify("It is past the deadline for this poll", null, 2));
                        console.log('past datetime')
                      } else if (validator) {
                        console.log(true)
                        updateEvent(eventID, participant)
                        alert(JSON.stringify( `${participant} has signed up for ${globalTitle} at ${globalLocation} during ${values.datetime} {-} notes: ${globalNotes}`, null, 2));
                      } else {
                        console.log(false)
                        alert(JSON.stringify("You have signed up for too many polls!", null, 2));
                      }
                      setTimeout(() => {
                        window.location.reload();
                      }, 200);
                    }}
                  > 
                    <Form style = {{display: "flex", flexDirection: "column ", border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}>
                      <label htmlFor="name">Name*</label>
                      <Field style={{width: "150px"}} placeholder="Enter name" id="name" name="name" defaultValue={row.row.values.participant_name}/>
                      <button class="customButton" 
                      style={{marginTop: "10px",width: "150px", textAlign: "center", color: "white", borderRadius: "4px", backgroundColor: "#4CAF50"}}
                      type="submit">Sign Up</button>
                    </Form>
                  </Formik>
                )
              } else {
                return (
                  <Formik
                    initialValues={{
                      name: row.row.values.participant_name,
                      datetime: row.row.values.datetime
                    }}
                    onSubmit={async (values) => {
                      console.log(values);
                      var vals = row.row.id
                      console.log(vals)
                      var eventID = globalIDs[vals]
                      console.log(eventID)
                      var participant = values.name
                      console.log(participant)
                      var validator = await verifyUserEventCount(globalOwner, globalTitle, participant, globalUserLimit)
                      var deadlineValidator = await verifyDeadline(globalOwner, globalTitle)
                      if (!deadlineValidator) { // past deadline
                        alert(JSON.stringify("It is past the deadline for this poll", null, 2));
                        console.log('past datetime')
                      } else if (validator) {
                        console.log(true)
                        updateEvent(eventID, participant)
                        alert(JSON.stringify( `${participant} has signed up for ${globalTitle} at ${globalLocation} during ${values.datetime} {-} notes: ${globalNotes}`, null, 2));
                      } else {
                        console.log(false)
                        alert(JSON.stringify("You have signed up for too many polls!", null, 2));
                      }
                      setTimeout(() => {
                        window.location.reload();
                      }, 200);
                    }}
                  > 
                    <Form style = {{display: "flex", flexDirection: "column ", border: "3px solid #eee", borderRadius: "15px", padding: "20px"}}>
                      <label htmlFor="name">Name*</label>
                      <Field style={{width: "150px"}} placeholder="Enter name" id="name" name="name" defaultValue={row.row.values.participant_name} disabled/>
                      <button class="customButton" 
                      style={{marginTop: "10px",width: "150px", textAlign: "center", color: "white", borderRadius: "4px", backgroundColor: "#4CAF50"}}
                      type="submit" disabled>Sign Up</button>
                    </Form>
                  </Formik>
                )
              }
              
            }
          },
          {
            Header: 'Remove',
            accessor: 'reset',
            Cell: (row) => {
              return (
                <Formik
                  onSubmit={async (values) => {
                    console.log(values);
                    var vals = row.row.id
                    console.log(vals)
                    var eventID = globalIDs[vals]
                    console.log(eventID)
                    var validator = isLoggedIn()
                    if (validator) {
                      console.log(true)
                      updateEvent(eventID, "")
                    } else {
                      console.log(false)
                      alert(JSON.stringify("You do not have permission to do that", null, 2));
                    }
                    setTimeout(() => {
                      window.location.reload();
                    }, 200);
                  }}
                > 
                  <Form>
                    <button class="customButton" style={{whiteSpace: "nowrap", textAlign: "center", color: "white", borderRadius: "4px", backgroundColor: "#f44336"}} type="submit">Remove participant</button>
                  </Form>
                </Formik>
              )
            }
          },
          {
            Header: 'Delete',
            accessor: 'delete',
            Cell: (row) => {
              return (
                <Formik
                  onSubmit={async (values) => {
                    console.log(values);
                    var vals = row.row.id
                    console.log(vals)
                    var eventID = globalIDs[vals]
                    console.log(eventID)
                    var validator = isLoggedIn()
                    if (validator) {
                      console.log(true)
                      deleteEvent(getUser().username, globalTitle, row.row.id)
                    } else {
                      console.log(false)
                      alert(JSON.stringify("You do not have permission to do that", null, 2));
                    }
                    setTimeout(() => {
                      window.location.reload();
                    }, 200);
                  }}
                > 
                  <Form>
                    <button type="submit" class="customButton" style={{width: "150px", textAlign: "center", color: "white", borderRadius: "4px", backgroundColor: "#f44336"}} 
                    onClick={() => {alert(JSON.stringify("Poll deleted", null, 2))}}>
                    Delete Event
                    </button>
                  </Form>
                </Formik>
              )
            }
          },
        ],
      }
    ],
    []
  )

  return (
      <Table columns={columns} data={data} />
  )
}

export default App
