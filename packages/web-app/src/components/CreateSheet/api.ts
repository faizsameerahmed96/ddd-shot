import axios from 'axios'
import { Sheet } from 'store/sheet/sheetTypes'

export const createSheet = async (): Promise<Sheet> => {
  const sheet = (await axios.post(`${process.env.REACT_APP_API_URL}/sheet`)).data as Sheet
  return sheet
}
