import { Sheet } from "./Sheet"
import { SheetData } from "./SheetData"

/** Repository for the sheet aggregate root. */
export interface ISheetRepository {
    /** Save the sheet */
    save(sheet: Sheet): Promise<void>

    /** Get a sheet by pk, null if no sheet exists */
    getSheetByPk(pk: string): Promise<Sheet | null>

    /** Update the sheet data of a sheet of particular pk */
    saveDataForSheet(sheet: Sheet): Promise<Sheet>
}
