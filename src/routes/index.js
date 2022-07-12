const files = require("./files.router")
const ping = require("./pong")

module.exports = function(app){
    app.use("/files",files)
	app.use("/ping",ping)
}
