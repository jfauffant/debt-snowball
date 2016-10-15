angular.module('dbForm', [])
.controller('formCtrl', function($scope,appService) {
    var as = appService;
	
	$scope.update = function(account){
		if(account && account.name && account.type){
			as.storeAccount(account);
			
			for(var key in account){
				delete account[key];
			}
		}else{
			alert("not enough information");
		}
	}
	
	$scope.changePeriod = function(account){
		var period = account.period;
		delete account.dueDate;
		delete account.dueDate2;
		if(period=="weekly" || period=="biWeekly"){
			$scope.showDays = true;
			$scope.showNumber = false;
			$scope.showSecondNumber = false;
		}else{
			$scope.showDays = false;
			$scope.showNumber = true;
			$scope.showSecondNumber = (period=="semiMonthly");
		}	
	}
	
	$scope.removeExtras = function(){
		for(var key in $scope.account){
			if(key != 'name' && key != 'type'){
				delete $scope[key];
			}
		}
	}
}).factory('appService',[function(){
	var accounts = [];
	
	$(window).unload(function(){window.localStorage.setItem('snowball',JSON.stringify(accounts));})

	if(window.localStorage.getItem('snowball') != null){
		var _accounts = JSON.parse(window.localStorage.getItem('snowball'));
		
		for(var obj in _accounts){accounts.push(_accounts[obj]);}
		localStorage.removeItem('snowball');
	}

	function storeAccount(acc){
		accounts.push(JSON.parse(JSON.stringify(acc)));
	}
	
	function getAccounts(){
		return JSON.parse(JSON.stringify(accounts));
	}
	
	function getType(type){
		var returnArr = [];
		
		$.each(accounts,function(i,elem){
			if(elem.type == type){
				returnArr.push(elem);
			}
		})
		
		var returnObj = JSON.parse(JSON.stringify(returnArr));
		
		var arrKey = [];
		
		$.each(returnObj,function(i,elem){
			for(var key in elem){
				if(arrKey.indexOf(key) === -1){arrKey.push(key);}
			}
		})
		
		console.log(type,arrKey);
		
		$.each(returnObj,function(i,elem){
			$.each(arrKey,function(j,key){
				if(elem.hasOwnProperty(key) == false){elem[key] = 'n/a'}
			})
		})
		
		return returnObj
	}
	
	function getBills(){
		return getType('recurring')
	}
	
	function getIncome(){
		return getType('income')
	}
	
	function getOneTime(){
		return getType('once')
	}
	
	function getDebt(){
		var debt = getType('debt');
		$.each(debt,function(i,elem){
			if(elem.fixedPayment == "n/a"){elem.fixedPayment = false;}
		})
		
		return debt;
	}

	var serviceObject = {
		storeAccount:storeAccount,
		getAccounts:getAccounts,
		getIncome:getIncome,
		getDebt:getDebt,
		getOneTime:getOneTime,
		getBills:getBills
	}

	return serviceObject;
}])
.directive('billForm',function(){
	return {
		restrict:'E',
		controller:'formCtrl',
		templateUrl:'form/form.html'
	}
})