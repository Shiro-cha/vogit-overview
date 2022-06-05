const files = require("./internal/files.router")


module.exports = function(app){
    app.use("/files",files)
}
