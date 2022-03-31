import { useViewSheetContext } from 'components/ViewSheet/viewSheetContext'
import React from 'react'
import styles from './SheetAddColumn.module.css'

/** Component handles adding a new column to the sheet */
export default function SheetAddColumn() {
  const [addColumnMode, setAddColumnMode] = React.useState(false)
  const [columnName, setColumnName] = React.useState('')

  const { addColumnToSheet } = useViewSheetContext()

  const cancel = () => {
    setAddColumnMode(false)
    setColumnName('')
  }

  const addColumn = () => {
    addColumnToSheet(columnName)
    cancel()
  }

  if (addColumnMode) {
    return (
      <div>
        <input type="text" value={columnName} onChange={e => setColumnName(e.target.value)} />
        <div className={styles.actionContainer}>
          <button onClick={addColumn} type="button">
            Add Column
          </button>
          <button onClick={cancel} type="button">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <button onClick={() => setAddColumnMode(true)} type="button">
      Add Column
    </button>
  )
}
