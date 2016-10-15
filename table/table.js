angular.module('dbTable', [])
.controller('tableCtrl', function($scope,appService,NgTableParams) {
	var as = appService;
	var self = this;

	$scope.debtParams = new NgTableParams({}, { dataset: as.getDebt()});
	$scope.incomeParams = new NgTableParams({},{dataset:as.getIncome()});
	$scope.onceParams = new NgTableParams({},{dataset:as.getOneTime()});
	$scope.recurringParams = new NgTableParams({},{dataset:as.getBills()});
})
.directive('snowballTable',function(){
	return {
		restrict:'E',
		controller:'tableCtrl',
		templateUrl:'table/table.html'
	}
})