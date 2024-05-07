import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Patient, Status } from 'PatientData'
import { isDate, join, trim } from 'lodash'
import { useMemo } from 'react'

interface PatientRow {
  name: string
  birthdate: string
  status: Status
  city: string
}

interface Filters {
  name?: string
  status?: Patient['status']
  age?: number
  city?: string
}

export default function PatientTable({
  patients,
  filters,
  ...props
}: {
  patients: Patient[]
  nameFilter?: string
  filters?: Filters
}): JSX.Element {
  const columnHelper = createColumnHelper<PatientRow>()

  const columnFilters = useMemo(() => {
    return [
      ...(filters && trim(filters.name).length > 0
        ? [{ id: 'name', value: props.nameFilter }]
        : []),
      ...(filters && trim(filters?.status ?? '').length > 0
        ? [{ id: 'status', value: filters.status }]
        : []),
      ...(filters && filters.age != null
        ? [{ id: 'birthdate', value: filters.age }]
        : []),
      ...(filters && trim(filters?.city ?? '').length > 0
        ? [{ id: 'city', value: filters.city }]
        : []),
    ]
  }, [filters])

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      cell: (info) => info.getValue(),
      header: 'Name',
    }),
    columnHelper.accessor('status', {
      id: 'status',
      cell: (info) => info.getValue(),
      header: 'Status',
    }),
    columnHelper.accessor('birthdate', {
      id: 'birthdate',
      cell: (info) => info.getValue(),
      header: 'Date of Birth',
      filterFn: 'ageFilterFunction', // age
    }),
    columnHelper.accessor('city', {
      id: 'city',
      cell: (info) => info.getValue(),
      header: 'City',
    }),
  ]

  const patientRows = useMemo(
    () =>
      patients.map(({ name, birthdate, status, addresses }) => ({
        name: join([name.firstName, name.middleName, name.lastName], ' '),
        birthdate: `${birthdate.getMonth() + 1}/${birthdate.getDate() + 1}/${birthdate.getFullYear()}`,
        status,
        city: addresses[0].city,
      })),
    [patients],
  )

  const table = useReactTable({
    data: patientRows,
    state: { columnFilters },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      ageFilterFunction: (row, columnId, filterValue) => {
        const birthdate = new Date(row.getValue(columnId))
        if (!isDate(birthdate)) {
          throw new Error('Expected birthdate to be a date!')
        }
        const age = new Date().getFullYear() - birthdate.getFullYear()
        return age === filterValue
      },
    },
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
