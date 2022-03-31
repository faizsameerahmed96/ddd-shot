import { useViewSheetContext } from 'components/ViewSheet/viewSheetContext'
import React, { useEffect, useState } from 'react'
import { Column } from 'store/sheet/sheetTypes'
import styles from './SheetCell.module.css'

type Props = {
  rowNumber: number
  column: Column
}

/** Component that handles each cell on a sheet */
export default function SheetCell({ rowNumber, column }: Props) {
  const { getCellValue, setCellValue } = useViewSheetContext()
  const cellValue = getCellValue(rowNumber, column.id)

  // Used to prevent rerendering of entire table for performance
  const [localCellValue, setLocalCellValue] = useState<string | undefined>(undefined)

  // Update cell due to global updates
  useEffect(() => {
    setLocalCellValue(cellValue)
  }, [cellValue])

  const updateCellValue = () => {
    setCellValue(rowNumber, column.id, localCellValue ?? '')
  }

  return (
    <td>
      <textarea
        className={styles.cellTextArea}
        onChange={e => setLocalCellValue(e.target.value)}
        value={localCellValue ?? ''}
      />
      {cellValue !== localCellValue && (
        <div className="flex-row">
          <button onClick={updateCellValue} type="button">
            Update
          </button>
          <button onClick={() => setLocalCellValue(cellValue)} type="button">
            Cancel
          </button>
        </div>
      )}
    </td>
  )
}
