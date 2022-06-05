app.controller("main",function($scope,$http , $rootScope){
	$scope.manualPath=""
	$scope.openDir = function(path,type){
		if(type == "folder"){
			$http.post(`/files`,{path:path}).then(function(res){
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
						path = path.slice(3,path.length)
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
	
	$scope.previous = function(parent){
		if(typeof parent == "string"){
			$scope.openDir(parent,"folder")	
		}
		
	}
	$scope.next = function(path){
		if(path){
			if(typeof path === "string"){
				$scope.openDir(path,"folder")	
			}	
		}
		
	}
	$scope.changeDirectory = function(path){
		if(path){
			if(typeof path === "string"){
				$scope.openDir(path,"folder")	
			}	
		}
	}
	
	// Default opendirectory
	$scope.openDir("","folder")
})
