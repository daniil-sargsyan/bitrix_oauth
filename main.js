import express from "express"
import morgan from "morgan"
import fs from "fs";
import Config from "./config/Config.js";

const config = await Config.getConfig()
const app = express()
const port = 8883

app.use(morgan("dev"))
app.use(express.json())


app.get("/", async (req, res) => {
    const url = "https://oauth.bitrix.info/oauth/token/?"
    const resp = await fetch(url + new URLSearchParams({
        grant_type : "refresh_token",
        client_id : config.client_id,
        client_secret : config.client_secret,
        refresh_token : config.refresh_token
    }), {
        method: 'GET',
    })
    let response = await resp.json()
    const accessToken = response.access_token
    let newConfig = config
    newConfig.refresh_token = response.refresh_token
    fs.writeFile(
        process.cwd() + "/config/conf.json",
        JSON.stringify(newConfig, null, 2),
        'utf8',
        (err) => {console.log(err)})
    res.send({accessToken : accessToken})
})

app.listen(port, () => {
    console.log("Listen : " + port)
})