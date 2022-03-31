import { useViewSheetContext } from 'components/ViewSheet/viewSheetContext'
import React from 'react'
import SheetAddColumn from './components/SheetAddColumn/SheetAddColumn'
import SheetColumn from './components/SheetColumn/SheetColumn'
import SheetRow from './components/SheetRow/SheetRow'
import styles from './Sheet.module.css'

/** Component responsible to render out a sheet with data */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Sheet() {
  const [numberOfRows] = React.useState(100)
  const { sheetData } = useViewSheetContext()
  return (
    <div>
      <table className={styles.sheetTable}>
        <tr>
          {sheetData.columns.map(column => (
            <SheetColumn key={column.id} column={column} />
          ))}
          <th>
            <SheetAddColumn />
          </th>
        </tr>
        {[...Array(numberOfRows)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SheetRow key={index} rowNumber={index} />
        ))}
      </table>
    </div>
  )
}
