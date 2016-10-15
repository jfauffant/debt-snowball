angular.module('dbTable', [])
.controller('tableCtrl', function($scope,appService,NgTableParams) {
	var as = appService;
	var self = this;

	$scope.debtParams = new NgTableParams({}, { dataset: as.getDebt()});
})
.directive('snowballTable',function(){
	return {
		restrict:'E',
		controller:'tableCtrl',
		templateUrl:'table/table.html'
	}
})