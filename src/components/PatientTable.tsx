import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Patient } from 'PatientData'
import { join } from 'lodash'

interface PatientRow {
  name: string
  birthdate: string
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
  ]

  const patientRows = patients.map(({ name, birthdate }) => ({
    name: join([name.firstName, name.middleName, name.lastName], ' '),
    birthdate: `${birthdate.getMonth() + 1}/${birthdate.getDate() + 1}/${birthdate.getFullYear()}`,
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
