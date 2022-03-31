import { expect } from "chai"
import { Sheet } from "../../../model/Sheet/Sheet"
import { SheetDataProperties } from "../../../model/Sheet/SheetData"
import { SheetApplicationService } from "../SheetApplicationService"
import { TestSheetRepository } from "./TestSheetRepository"

describe("SheetApplicationService.spec.ts", () => {
    it("should create a new sheet", () => {
        const sheetRepository = new TestSheetRepository()
        const sheetService = new SheetApplicationService(sheetRepository)

        sheetService.createNewSheet()

        expect(sheetRepository.sheets.length).to.be.equal(1)
        expect(sheetRepository.sheets[0]).to.be.instanceOf(Sheet)
    })

    it("should be able to return sheet by pk", async () => {
        const sheetRepository = new TestSheetRepository()
        const sheetService = new SheetApplicationService(sheetRepository)

        const sheet = await sheetService.createNewSheet()

        const fetchedSheet = await sheetService.getSheetByPk(sheet.pk)
        expect(fetchedSheet?.pk).equals(sheet.pk)

        const nullSheet = await sheetService.getSheetByPk("dummy-pk")
        expect(nullSheet).to.be.null
    })

    it("should be able to update data of sheet by pk", async () => {
        const sheetRepository = new TestSheetRepository()
        const sheetService = new SheetApplicationService(sheetRepository)

        const sheet = await sheetService.createNewSheet()

        const newSheetData: SheetDataProperties = {
            columns: [{ id: "TEST", name: "test" }],
            data: {},
        }

        await sheetService.updateDataOfSheetByPk(
            sheet.pk,
            newSheetData
        )

        const fetchedSheet = await sheetService.getSheetByPk(sheet.pk)
        expect(fetchedSheet?.data.columns[0].id).equals("TEST")
    })
})
