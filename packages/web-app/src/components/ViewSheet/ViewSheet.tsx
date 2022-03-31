import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Sheet as SheetType } from 'store/sheet/sheetTypes'
import { getSheetByPk, updateSheetDataByPk } from './api'
import Sheet from './components/Sheet/Sheet'
import { useCreateViewSheetContext, ViewSheetContextProvider } from './viewSheetContext'

/** Component responsible for displaying the ViewSheet route. */
export default function ViewSheet() {
  const contextValue = useCreateViewSheetContext()
  const params = useParams()

  const [sheet, setSheet] = useState<SheetType | null>(null)

  const sheetPk = params.sheetPk!
  const { setSheetData, sheetData } = contextValue

  useEffect(() => {
    ;(async () => {
      try {
        const sheetRetrieve = await getSheetByPk(sheetPk)
        setSheetData(sheetRetrieve.data)
        setSheet(sheetRetrieve)
      } catch (err: any) {
        alert(err.message)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetPk])

  // Saving data
  useEffect(() => {
    ;(async () => {
      if (sheet) {
        try {
          await updateSheetDataByPk(sheet.pk, sheetData)
        } catch (err: any) {
          alert(err.message)
        }
      }
    })()
  }, [sheet, sheetData])

  if (!sheet) return <h1>Loading...</h1>

  return (
    <div>
      <ViewSheetContextProvider value={contextValue}>
        <Sheet />
      </ViewSheetContextProvider>
    </div>
  )
}
