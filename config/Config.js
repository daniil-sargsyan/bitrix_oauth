import fs from "fs"
import {json} from "express";
class Config {
    async getConfig(){

        const conf = new Promise((resolve, reject) => {
            fs.readFile(process.cwd() + "/config/conf.json", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        })
        return await conf
    }
}

export default new Config()