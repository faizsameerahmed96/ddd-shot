import { SheetApplicationService } from "../domain/application/Sheet/SheetApplicationService"
import { SheetsRepository } from "./repositories/SheetsRepository"

const sheetApplicationService = new SheetApplicationService(
    new SheetsRepository()
)

export { sheetApplicationService }
