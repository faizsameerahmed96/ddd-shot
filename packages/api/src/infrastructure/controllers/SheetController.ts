/* eslint-disable require-jsdoc */
import express from "express"
import {
    SheetDataProperties,
    SheetDataValidationError,
} from "../../domain/model/Sheet/SheetData"
import { sheetApplicationService } from "../Registry"

/**
 * Controller for the sheets route
 */
export class SheetController {
    static async createNewSheet(
        _: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        try {
            const sheet = await sheetApplicationService.createNewSheet()
            res.send(sheet)
        } catch (err) {
            next(err)
        }
    }

    static async getSheetByPk(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        const sheetPk = req.params.sheetPk
        try {
            const sheet = await sheetApplicationService.getSheetByPk(sheetPk)
            if (sheet) {
                res.send(sheet)
            } else {
                res.status(400)
                res.send(`Sheet with pk ${sheetPk} not found`)
            }
        } catch (err) {
            next(err)
        }
    }

    static async updateSheetData(
        { body, params }: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        const sheetPk = params.sheetPk

        try {
            const sheet = await sheetApplicationService.updateDataOfSheetByPk(
                sheetPk,
                body as SheetDataProperties
            )
            res.send(sheet)
        } catch (err) {
            if (err instanceof SheetDataValidationError) {
                res.status(400).send("The sheet data is invalid")
            } else next(err)
        }
    }
}
