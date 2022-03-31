import express from "express"
import { SheetController } from "../../controllers/SheetController"

// eslint-disable-next-line new-cap
const router = express.Router()

router.post("/", SheetController.createNewSheet)
router.get("/:sheetPk", SheetController.getSheetByPk)
router.put("/:sheetPk/data", SheetController.updateSheetData)

export default router
