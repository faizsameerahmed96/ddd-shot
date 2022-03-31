/* eslint-disable require-jsdoc */
import { ISheetRepository } from "../../../model/Sheet/ISheetRepository"
import { Sheet } from "../../../model/Sheet/Sheet"

/** To test the sheet app service */
export class TestSheetRepository implements ISheetRepository {
    sheets: Sheet[]

    constructor() {
        this.sheets = []
    }

    save(sheet: Sheet): Promise<void> {
        this.sheets.push(sheet)
        return new Promise((resolve) => resolve())
    }

    getSheetByPk(pk: string): Promise<Sheet | null> {
        const sheet = this.sheets.find((sheet) => sheet.pk === pk)
        return new Promise((resolve) => resolve(sheet ?? null))
    }

    async saveDataForSheet(sheet: Sheet): Promise<Sheet> {
        const existingSheet = await this.getSheetByPk(sheet.pk)
        if (!existingSheet) throw new Error("Sheet does not exist")
        existingSheet.data = sheet.data
        return new Promise((resolve) => resolve(sheet))
    }
}
