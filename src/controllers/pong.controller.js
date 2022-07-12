const http = require("http")

class Ping{
	
	postPing(req,res){
		const hostname = req.body.hostname
		const path = req.body.path
		console.log(http)
		res.send(hostname)
		request({
			"uri": `http://${hostname}/files`,
		  "method": "POST",
		  "json": {path}
		}, (err, res, body) => {
			if (!err) {
				console.log("sent!!!!!");
			} else {
				console.error("Unable to send message:" + err);
			}
		}); 
	}
	
}

module.exports = new Ping()
