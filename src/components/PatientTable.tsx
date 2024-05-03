import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Patient, Status } from 'PatientData'
import { join } from 'lodash'

interface PatientRow {
  name: string
  birthdate: string
  status: Status
}

export default function PatientTable({
  patients,
}: {
  patients: Patient[]
}): JSX.Element {
  const columnHelper = createColumnHelper<PatientRow>()
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      cell: (info) => info.getValue(),
      header: 'Name',
    }),
    columnHelper.accessor('birthdate', {
      id: 'birthdate',
      cell: (info) => info.getValue(),
      header: 'Date of Birth',
    }),
    columnHelper.accessor('status', {
      id: 'status',
      cell: (info) => info.getValue(),
      header: 'Status'
    })
  ]

  const patientRows = patients.map(({ name, birthdate, status }) => ({
    name: join([name.firstName, name.middleName, name.lastName], ' '),
    birthdate: `${birthdate.getMonth() + 1}/${birthdate.getDate() + 1}/${birthdate.getFullYear()}`,
    status
  }))

  const table = useReactTable({
    data: patientRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className="border border-1 border-zinc-300 p-1"
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}{' '}
              </th>
            ))}{' '}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {' '}
            {row.getVisibleCells().map((cell) => (
              <td className="border border-1 border-zinc-300 p-1" key={cell.id}>
                {' '}
                {flexRender(cell.column.columnDef.cell, cell.getContext())}{' '}
              </td>
            ))}{' '}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
