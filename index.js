const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const path = require("path")
const env = require("./config/config.env")


let app = express()
// set environnement
const config = env["production"].port ? env["production"] : env["developpement"]


//set body parser middelware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

//set static pages

app.use(express.static(path.join(__dirname,"public")))

//set session middelware
app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 360000 }}))

//set router
const router = require("./src/routes/index")(app)




app.listen(config.port,function(err){
	if(err) console.log(err)
	console.log(`Server start at port ${config.port}`)
})



