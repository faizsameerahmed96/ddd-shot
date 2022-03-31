import { useViewSheetContext } from 'components/ViewSheet/viewSheetContext'
import React from 'react'
import SheetCell from './components/SheetCell/SheetCell'

type Props = {
  rowNumber: number
}

/** Component renders each row of a sheet */
export default function SheetRow({ rowNumber }: Props) {
  const { sheetData } = useViewSheetContext()
  const { columns } = sheetData

  return (
    <tr>
      {columns.map(column => (
        <SheetCell key={column.id} rowNumber={rowNumber} column={column} />
      ))}
    </tr>
  )
}
