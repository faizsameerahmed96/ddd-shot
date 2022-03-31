import axios from 'axios'
import { Sheet, SheetData } from 'store/sheet/sheetTypes'

export const getSheetByPk = async (pk: string): Promise<Sheet> => {
  const sheet = (await axios.get(`${process.env.REACT_APP_API_URL}/sheet/${pk}`)).data as Sheet
  return sheet
}

export const updateSheetDataByPk = async (pk: string, sheetData: SheetData): Promise<Sheet> => {
  const sheet = (await axios.put(`${process.env.REACT_APP_API_URL}/sheet/${pk}/data`, sheetData)).data as Sheet
  return sheet
}
