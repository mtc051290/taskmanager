angular.module('taskmanager', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('Categories',function(){
	return {
		save: function(categories){
			window.localStorage["categories"]=angular.toJson(categories);	
		}
	}
})

.controller('TaskCtrl', function($scope, $ionicModal){
	$scope.tasks = [];
	
	var createCategory=function(categoryTitle){
		var newCategory=Categories.newCategory(categoryTitle);		
	}
	
	$ionicModal.fromTemplateUrl('new-task.html', function(modal){
		$scope.taskModal = modal;
	},{
		scope: $scope,
		animation: 'slide-in-up'
	});
	
	$scope.createTask = function(task){
		if(task.title){
			$scope.tasks.push({
				title: task.title
			});
			$scope.taskModal.hide();
			task.title="";
		}else{
			$scope.prueba="Por favor ingrese un task correcto";
		}
	}
	
	$scope.newTask = function(){
		$scope.taskModal.show();
		$scope.prueba="";
	}
	
	$scope.closeNewTask = function(){
		$scope.taskModal.hide();
	}
});