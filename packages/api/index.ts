import app from "./src/infrastructure/app"
import express from "express"
import "dotenv/config"

app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.status(500).send("Something went wrong!")
        next(err)
    }
)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
