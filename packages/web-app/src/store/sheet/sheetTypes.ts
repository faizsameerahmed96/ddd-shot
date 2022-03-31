export type Column = { id: string; name: string }

export type Row = { [columnId: string]: string }

export type SheetData = {
  columns: Column[]
  data: { [rowNumber: string]: Row }
}

export type Sheet = {
  pk: string
  data: SheetData
}
