import React, { useState } from 'react'
import { useTable } from 'react-table'
import { getUser, isLoggedIn } from '../services/auth';
import { deleteEvent, getEventPollID, getEvents, updateEvent, verifyUserEventCount } from '../utils/events';
import { getPollID, getPoll, verifyDeadline } from '../utils/polls';
import { getParameterByName } from '../utils/url';
import { createDateRange, createDatetime, createUpdatedDateRange } from '../utils/datetime';
import { Formik, Field, Form, ErrorMessage  } from 'formik';

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
                return <input type="text" defaultValue={participant.value}/>
              } else {
                return <input type="text" defaultValue={participant.value} disabled/>
              }
            }
          },
          {
            Header: 'Start - End',
            accessor: 'datetime'
          },
          {
            Header: 'Submit',
            accessor: 'tes',
            Cell: (row) => {
              globalDatetime = row.row.id
              // return (
              //   <button onClick={signUp} value={row.row.id + ' ' + row.row.values.participant_name}>
              //     Sign Up
              //   </button>
              // )
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
                  <Form>
                    <Field id="name" name="name" defaultValue={row.row.values.participant_name}/>
                    <button type="submit">Sign Up</button>
                  </Form>
                </Formik>
              )
            }
          },
          {
            Header: 'Reset',
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
                    <button type="submit">Delete participant</button>
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
                    <button type="submit">Delete Event</button>
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
