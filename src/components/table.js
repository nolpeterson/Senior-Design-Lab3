import React, { useState } from 'react'
import { useTable } from 'react-table'
import { getUser } from '../services/auth';
import { getPollsUser, getPollID, deletePoll } from '../utils/polls';
import { Link } from "gatsby"
import Layout from '../components/layout';
import { resendEmail } from '../utils/invites';

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

  React.useEffect(async () => {
    var temp = await getPollsUser(getUser().username)
    setData(temp)
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Polls',
        columns: [
          {
            Header: 'Poll Name',
            accessor: 'title',
            Cell: e =><a href={"EventSignup?title=" + e.value + "?owner_id=" +  e.row.original['owner_id']}> {e.value}</a>
          },
          {
            Header: 'Owner',
            accessor: 'owner_id',
          },
          {
            Header: 'Resend Invites',
            accessor: "resend",
            Cell: (row) => {
            return (
                <button onClick={() => resendEmail(row.row.original['owner_id'], row.row.original['title'])}>
                  Resend Invites 
                </button>
              )
            }
          },
          {
            Header: 'Edit',
            accessor: "Edit Poll",
            Cell: (row) => {
            return (
                <Link to={"/editPoll?title=" + row.row.original['title'] + "?owner_id=" + row.row.original['owner_id']}>
                  <button>
                    Edit Poll  
                  </button>
                </Link>
              )
            }
          },
          {
            Header: 'Delete',
            accessor: "Delete Poll",
            Cell: (row) => {
            return (
                <button onClick={() => 
                deletePoll(row.row.original['title'], 
                row.row.original['owner_id'])}>
                  Delete Poll
                </button>
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
