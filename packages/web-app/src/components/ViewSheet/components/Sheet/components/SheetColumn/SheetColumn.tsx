import React from 'react'
import { Column } from 'store/sheet/sheetTypes'

type Props = {
  column: Column
}

/** Render each column cell of the sheet */
export default function SheetColumn({ column }: Props) {
  return <th>{column.name}</th>
}
