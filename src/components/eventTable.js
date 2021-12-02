import React, { useState } from 'react'
import { useTable } from 'react-table'
import { getUser } from '../services/auth';
import { getEventPollID, getEvents, updateEvent } from '../utils/events';
import { getPollID } from '../utils/polls';
import { getParameterByName } from '../utils/url';
import { createDateRange, createDatetime, createUpdatedDateRange } from '../utils/datetime';
import { Formik, Field, Form, ErrorMessage  } from 'formik';

var globalOwner = ""
var globalTitle = ""
var globalDatetime
var globalIDs

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
                    name: row.row.values.participant_name
                  }}
                  onSubmit={async (values) => {
                    console.log(values);
                    var vals = row.row.id
                    console.log(vals)
                    var eventID = globalIDs[vals]
                    console.log(eventID)
                    var participant = values.name
                    console.log(participant)
                    updateEvent(eventID, participant)
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
