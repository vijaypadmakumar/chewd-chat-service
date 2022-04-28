const express = require("express")
const app = express()
const body_parser = require("body-parser")
const manager = require("./manager")

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }))

app.route("/:group_id/:sent/:message/:stamp")
    .get((req, res) => {
        manager.save_chat(req.params)
            .then(result => {
                res.send(result)
            })
    })

app.route("/get_chat/:group_id")
    .get((req, res) => {
        const { group_id } = req.params
        manager.get_chat(group_id)
            .then(result => {
                res.send(result)
            })
    })

app.listen(process.env.PORT || 4000)

