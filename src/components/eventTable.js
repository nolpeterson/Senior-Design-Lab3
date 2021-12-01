import React, { useState } from 'react'
import { useTable } from 'react-table'
import { getUser } from '../services/auth';
import { getEventPollID, getEvents } from '../utils/events';
import { getPollID } from '../utils/polls';

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
    console.log(await getEvents())
    var temp = await getEventPollID("rdean", "title")
    console.log(temp)
    setData(temp)
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Events',
        columns: [
          {
            Header: 'Participant Name',
            accessor: 'participant_name',
          },
          {
            Header: 'Link',
            accessor: 'link',
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
