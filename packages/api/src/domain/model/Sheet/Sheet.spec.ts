import { expect } from "chai"
import { Sheet } from "./Sheet"
import { SheetData } from "./SheetData"

describe("Sheet.spec.ts", () => {
    it("can create a new sheet", () => {
        const sheet = Sheet.newSheet()
        expect(sheet.pk.length).to.be.greaterThan(5)
        expect(sheet.data.data).to.not.be.undefined.and.not.be.null
    })

    it("can be recreated from an existing sheet", () => {
        const sheet = Sheet.newSheet()
        sheet.data.columns.push({
            id: "test",
            name: "Name",
        })

        const recreatedSheet = Sheet.fromExistingSheet(sheet)

        expect(recreatedSheet.data.columns.length).to.be.equal(1)
    })

    it("can set sheet data", () => {
        const validSheetData: SheetData = SheetData.fromExistingSheetData({
            columns: [{ id: "test", name: "testasf" }],
            data: {
                0: {
                    testasf: "example value",
                },
            },
        })
        const sheet = Sheet.newSheet()
        sheet.setSheetData(validSheetData)

        expect(sheet.data.columns[0].id).equals(validSheetData.columns[0].id)
    })
})
