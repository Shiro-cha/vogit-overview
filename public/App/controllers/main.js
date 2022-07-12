app.controller("main",function($scope,$http , $rootScope){
	$scope.manualPath=""
	$scope.hostisthere=false
	$scope.hostcotainer=false
	$scope.hostname = ""
	$scope.addbtn="plus"
	$scope.yes=false 
	
	
	$scope.openDir = function(path,type,hostname){
		if(type == "folder"){
			$http.post(`/files`,{path:path,hostname:hostname}).then(function(res){
				if(typeof res.data != "string"){
					let files = res.data.files
					$rootScope.root = res.data.root
					$scope.files = files
					$scope.paths=[]
					$scope.path = res.data.path
					
					if($scope.path === $rootScope.root){
						
						$scope.paths.push({name:"Home",path:$rootScope.root})
					}else{
						let i =""
						$scope.paths.push({name:"Home",path:$rootScope.root})
						let path = $scope.path.split(res.data.sep)
						path = path.slice($rootScope.root.split(res.data.sep).length,path.length)
						path.forEach((value)=>{
							i = i + value+res.data.sep
							
							$scope.paths.push({name:value,path:$rootScope.root+res.data.sep+value})	
							
						})	
					}
					
					$scope.parent = res.data.parent
					$scope.nextPath = res.data.next
				}else{
					console.error("Error in your request")
				}
				
			})	
		}
		
	}
	$scope.setHost = function(e){
		$scope.openDir("","folder","e.target.value")
	}
	$scope.hostContainerFunc = function(){
		if($scope.addbtn == "plus"){
			$scope.hostcotainer=true
			$scope.yes=true
			$scope.addbtn="minus"
			
		}else{
			$scope.hostcotainer=false
			$scope.addbtn="plus"
			$scope.hostIp = ""
			$scope.hostisthere=false
		}
		
	}
	$scope.validateHost = function(e){
		if(e.target.value && e.target.value !=" " && e.target.value !="  " && e.target.value !="  " && e.target.value !="  " && e.target.value !="  " ){
			if(e.key === "Enter"){
				$http.post("/ping",{hostname:e.target.value}).then(function(res){
					$scope.hostname=e.target.value
					$scope.hostisthere=true;
					$scope.addbtn="minus"
					$scope.yes=false
					
				})
			}	
		}
		
	}
	$scope.previous = function(parent){
		if(typeof parent == "string"){
			$scope.openDir(parent,"folder",$scope.hostname)	
		}
		
	}
	$scope.next = function(path){
		if(path){
			if(typeof path === "string"){
				$scope.openDir(path,"folder",$scope.hostname)	
			}	
		}
		
	}
	$scope.changeDirectory = function(path){
		if(path){
			if(typeof path === "string"){
				$scope.openDir(path,"folder",$scope.hostname)	
			}	
		}
	}
	
	// Default opendirectory
	$scope.openDir("","folder",$scope.hostname)
})
