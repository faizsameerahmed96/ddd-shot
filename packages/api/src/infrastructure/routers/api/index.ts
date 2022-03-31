import express from "express"

import sheetsRouter from "./sheetsRouter"

// eslint-disable-next-line new-cap
const router = express.Router()

router.use("/sheet", sheetsRouter)

export default router
