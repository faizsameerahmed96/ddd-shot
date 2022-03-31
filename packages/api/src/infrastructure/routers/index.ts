import express from "express"
import apiRoutes from "./api"

// eslint-disable-next-line new-cap
const router = express.Router()

router.use("/api", apiRoutes)

export default router