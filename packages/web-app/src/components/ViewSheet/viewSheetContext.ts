import { useState } from 'react'
import { SheetData } from 'store/sheet/sheetTypes'
import createCtx from '../../utils/contextHelper'

export function useCreateViewSheetContext() {
  const [sheetData, setSheetData] = useState<SheetData>({
    columns: [],
    data: {},
  })

  const addColumnToSheet = (name: string) => {
    setSheetData({ ...sheetData, columns: [...sheetData.columns, { id: `${new Date().getTime()}`, name }] })
  }

  const getCellValue = (rowNumber: number, columnId: string) =>
    sheetData.data[rowNumber] ? sheetData.data[rowNumber][columnId] : undefined

  const setCellValue = (rowNumber: number, columnId: string, value: string) =>
    setSheetData({
      ...sheetData,
      data: {
        ...sheetData.data,
        [rowNumber]: {
          ...sheetData.data[rowNumber],
          [columnId]: value,
        },
      },
    })

  return {
    sheetData,
    setSheetData,
    addColumnToSheet,
    getCellValue,
    setCellValue,
  }
}

export const [useViewSheetContext, ViewSheetContextProvider, ViewSheetContextConsumer] =
  createCtx<ReturnType<typeof useCreateViewSheetContext>>()
