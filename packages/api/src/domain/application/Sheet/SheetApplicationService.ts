import { Sheet } from "../../model/Sheet/Sheet"
import { ISheetRepository } from "../../model/Sheet/ISheetRepository"
import { SheetData, SheetDataProperties } from "../../model/Sheet/SheetData"

/**
 * Application service to handle the sheet aggregate root.
 */
export class SheetApplicationService {
    sheetRepository: ISheetRepository

    // eslint-disable-next-line require-jsdoc
    public constructor(sheetRepository: ISheetRepository) {
        this.sheetRepository = sheetRepository
    }

    /**
     * Create a new sheet and persist
     * @returns the newly created sheet
     */
    async createNewSheet(): Promise<Sheet> {
        const newSheet = Sheet.newSheet()
        await this.sheetRepository.save(newSheet)

        return newSheet
    }

    /**
     * @param pk The pk of the sheet
     * @returns The sheet
     */
    async getSheetByPk(pk: string): Promise<Sheet | null> {
        const sheet = await this.sheetRepository.getSheetByPk(pk)
        return sheet
    }

    /**
     *
     * @param pk the sheet's pk
     * @param sheetData the data for the sheet
     */
    async updateDataOfSheetByPk(
        pk: string,
        sheetData: SheetDataProperties
    ): Promise<Sheet> {
        const sheet = await this.getSheetByPk(pk)
        if (!sheet) throw new Error("Sheet does not exist")

        sheet.setSheetData(SheetData.fromExistingSheetData(sheetData))

        await this.sheetRepository.saveDataForSheet(sheet)

        return sheet
    }
}
