import { Validator } from "jsonschema"

export type Column = { id: string; name: string }
export type Row = { [columnId: string]: string }

export interface SheetDataProperties {
    columns: Column[]
    data: { [rowNumber: string]: Row }
}

/** Error thrown when sheet data validation fails */
export class SheetDataValidationError extends Error {
    // eslint-disable-next-line require-jsdoc
    constructor(message: string) {
        super(message)
    }
}

/** Represents the data stored on the sheet */
export class SheetData implements SheetDataProperties {
    columns: Column[]
    data: { [rowNumber: string]: Row }

    /**
     * Constructor
     * @param sheetData Data for the columns and rows data
     */
    private constructor(sheetData: SheetDataProperties) {
        this.columns = sheetData.columns
        this.data = sheetData.data
    }

    /**
     * @returns A fresh copy of the sheet data
     */
    static newSheetData(): SheetData {
        return new SheetData({
            columns: [],
            data: {},
        })
    }

    /**
     * @returns Get a sheet data instance from existing data.
     * @param data The existing data that needs to be parsed.
     */
    static fromExistingSheetData(data: SheetDataProperties): SheetData {
        const validation = new Validator().validate(data, {
            type: "object",
            properties: {
                columns: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                        },
                        additionalProperties: false,
                    },
                },
                data: {
                    type: "object",
                    patternProperties: {
                        "^[0-9]+$": {
                            type: "object",
                            patternProperties: {
                                "^.+$": {
                                    type: "string",
                                },
                            },
                        },
                    },
                    additionalProperties: false
                },
            },
            additionalProperties: false,
        })

        if (!validation.valid) {
            throw new SheetDataValidationError("The sheet data is not valid")
        }

        // TODO More validations here.

        return new SheetData(data)
    }
}
