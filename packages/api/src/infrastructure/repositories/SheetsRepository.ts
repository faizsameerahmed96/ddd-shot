/* eslint-disable require-jsdoc */
import { pool } from "."
import { ISheetRepository } from "../../domain/model/Sheet/ISheetRepository"
import { Sheet } from "../../domain/model/Sheet/Sheet"

/** Sheets implementation for postgres */
export class SheetsRepository implements ISheetRepository {
    async save(sheet: Sheet): Promise<void> {
        await pool.query("INSERT INTO sheets(pk, data) VALUES($1, $2)", [
            sheet.pk,
            sheet.data,
        ])
    }

    async getSheetByPk(pk: string): Promise<Sheet | null> {
        const result: Sheet | undefined = (
            await pool.query("SELECT pk, data FROM sheets WHERE pk=$1", [pk])
        ).rows[0]

        return result ? Sheet.fromExistingSheet(result) : null
    }

    async saveDataForSheet(sheet: Sheet): Promise<Sheet> {
        const result = (
            await pool.query(
                "UPDATE sheets SET data=$2 WHERE pk=$1 RETURNING *",
                [sheet.pk, sheet.data]
            )
        ).rows[0]

        if (!result) throw new Error("Could not find sheet with pk")

        return result
    }
}
