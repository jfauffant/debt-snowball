angular.module('dbGraph', [])
.controller('graphCtrl', function($scope,appService) {
	var as = appService;

	$scope.test = JSON.stringify(as.getAccounts());
})
.directive('snowballGraph',function(){
	return {
		restrict:'E',
		controller:'graphCtrl',
		templateUrl:'graph/graph.html'
	}
})