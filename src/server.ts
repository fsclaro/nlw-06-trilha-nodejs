import express from "express"
import 'reflect-metadata'
import './db'
import { router } from './routes/routes'

const app = express()
const port = 3000

app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Express server is running at port ${port}`)
})
