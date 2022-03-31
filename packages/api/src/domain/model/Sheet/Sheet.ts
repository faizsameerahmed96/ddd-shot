import { v4 } from "uuid"
import { SheetData } from "./SheetData"

export interface SheetProperties {
    pk: string
    data: SheetData
}

/** Represents a sheet entity and also is the aggregate root. */
export class Sheet implements SheetProperties {
    pk: string
    data: SheetData

    /**
     * Constructor
     * @param sheetProperties All the data related to a sheet
     */
    private constructor(sheetProperties: SheetProperties) {
        this.pk = sheetProperties.pk
        this.data = sheetProperties.data
    }

    /**
     * @returns the newly created sheet entity
     */
    static newSheet(): Sheet {
        return new Sheet({
            pk: v4(),
            data: SheetData.newSheetData(),
        })
    }

    /**
     * @param sheetProperties the sheet properties
     * @returns the parsed existing sheet
     */
    static fromExistingSheet(sheetProperties: SheetProperties): Sheet {
        return new Sheet({
            pk: sheetProperties.pk,
            data: SheetData.fromExistingSheetData(sheetProperties.data),
        })
    }

    /**
     * @param sheetData The new sheet data
     */
    public setSheetData(sheetData: SheetData): void {
        this.data = sheetData
    }
}
