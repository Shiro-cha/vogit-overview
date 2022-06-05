const fs = require("fs")
const os = require("os")
const path = require("path")

class FilesInternal{

    getDirectory(req,res){
		let sep = path.sep // "/" for posix an d \\ for windows
        let dirpath = req.body.path|| os.homedir()
		let parentdir = dirpath.split(sep)
		if(dirpath != os.homedir){
			parentdir = parentdir.splice(0,parentdir.length-1).join(sep)	
		}else{
			parentdir = dirpath
		}
         let readdirectory = new Promise(function(success,error){
             fs.readdir(dirpath+sep,function(err,files){
                if(err && err.errno == -20){ // this is a file not a directory
                    error()
                }else if(!err){                      // we can read directory
                    let directoryFile = []
                         for(let i = 0 ; i < files.length;i++){
                            let settingFils= new Promise(function(directory,file){
                            fs.readdir(`${dirpath+sep}${files[i]}`,function(err,data){
                                if(err && err.errno == -20){ //this is a file
                                    file()
                                }else{                        // this is a directory
                                    directory()
                                }
                            })
                        })
                        settingFils.then(function(){        //action for directory
							let name = files[i]
							if(files[i].length > 17){
								name = files[i].slice(0,17) + "..."
							}
                            directoryFile.push({
                                type:"folder",
								hidden:files[i][0] ==="." ? true:false,
                                name : name,
								realname:files[i],
								path:dirpath,
								parent:parentdir,
                                size:fs.statSync(`${dirpath+sep}${files[i]}`).size
                            })
                            if(i == (files.length-1)){
                                success(directoryFile)
                                
                            } 
                        }).catch(function(){ 
                            let extension = ""
                            let type ="file"               //action for files
							let name = files[i]
							
                            if(files[i].lastIndexOf(".") != -1){
                                extension = files[i].slice(files[i].lastIndexOf(".")+1,files[i].length)
                            }
                            if(files[i].length > 12){
								name = files[i].slice(0,12) + "..."
							}
							
                            extension.toLocaleLowerCase()
							if(extension.toLocaleLowerCase() ==="jpeg" || extension.toLocaleLowerCase() ==="jpg" || extension.toLocaleLowerCase() ==="png" || extension.toLocaleLowerCase() ==="gif" ||extension.toLocaleLowerCase() === "ico"){
								type="file-image"
							}else if(extension.toLocaleLowerCase() === "mp4" ||extension.toLocaleLowerCase() === "avi" ||extension.toLocaleLowerCase() === "mkv"){
								type="file-video"
							}else if(extension.toLocaleLowerCase() === "mp3" ||extension.toLocaleLowerCase() === "m4a" ||extension.toLocaleLowerCase() === "flac"){
								type="file-audio"
							}else if(extension.toLocaleLowerCase() === "docx" || extension.toLocaleLowerCase() ==="doc"){
								type="file-words"
							}else if(extension.toLocaleLowerCase() === ("pdf")){
								type="file-pdf"
							}else if(extension.toLocaleLowerCase() === "html" || extension.toLocaleLowerCase() === "css" ||extension.toLocaleLowerCase() === extension.toLocaleLowerCase() ==="js" ||extension.toLocaleLowerCase() === "java" ||extension.toLocaleLowerCase() === "cpp" ||extension.toLocaleLowerCase() === "php"){
								type="file-code"
							}else if(extension.toLocaleLowerCase() === "zip" || extension.toLocaleLowerCase() === "rar" || extension.toLocaleLowerCase() === "7zip" || extension.toLocaleLowerCase() === "7z"){
								type="file-archive"
							}
                                    

                            directoryFile.push({
                                type:type,
                                name : name,
								hidden:files[i][0] ==="." ? true:false,
								realname:files[i],
								path:dirpath,
								parent:parentdir,
                                size:fs.statSync(`${dirpath+sep}${files[i]}`).size
                            })
                            if(i == (files.length-1)){
                                success(directoryFile)
                                
                            } 
                        })
                    }


                    
                }else{
					console.log(err)
				}
             })

         })  
             
         readdirectory.then(function(directoryFile){
            
			let next = req.session.next
			req.session.next = dirpath
			 res.json({files:directoryFile,parent:parentdir,path:dirpath,root:os.homedir(),next:next,sep:sep})
         }).catch(function(){
             res.send("This is not a directory")
         })
        
}
}
async function isFile(file,fs){
    
    fs.readdir(file,function(err,data){
        if(err && err.errno == -20){
            console.log("here")
            return true
        }else{
            console.log(err)
            return false
        }
    })
}

module.exports = new FilesInternal()
