import express from "express"
import 'reflect-metadata'
import './db'


const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Express server is running at port ${port}`)
})
