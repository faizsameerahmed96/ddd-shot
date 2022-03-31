/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai"
import { SheetData, SheetDataValidationError } from "./SheetData"

describe("SheetData", () => {
    it("can create a new sheet data with default values", () => {
        const sheetData = SheetData.newSheetData()

        expect(sheetData.columns?.length).to.be.equal(0)
        expect(sheetData.data).to.not.be.undefined.and.not.be.null
    })

    it("can be recreated from existing data", () => {
        const validSheetData: SheetData = {
            columns: [{ id: "test", name: "testasf" }],
            data: {
                0: {
                    testasf: "example value",
                },
            },
        }

        const validSheetDataObj =
            SheetData.fromExistingSheetData(validSheetData)

        expect(validSheetDataObj).to.not.be.undefined
        expect(validSheetDataObj.columns.length).to.be.equal(
            validSheetData.columns.length
        )
        expect(Object.keys(validSheetDataObj.data).length).equals(
            Object.keys(validSheetData.data).length
        )

        // TODO Add more cases here
        const invalidSheetData: any[] = [
            (() => {
                const data = JSON.parse(JSON.stringify(validSheetData))
                data.notAllowedKey = "asdsad"
                return data
            })(),
            (() => {
                const data = JSON.parse(JSON.stringify(validSheetData))
                data.data["0"]["testasf"] = {}
                return data
            })(),
        ]

        for (const sheetData of invalidSheetData) {
            let error
            try {
                SheetData.fromExistingSheetData(sheetData)
            } catch (err) {
                error = err
            }

            expect(error).to.be.instanceOf(SheetDataValidationError)
        }
    })
})
