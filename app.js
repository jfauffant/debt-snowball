'use strict';

angular.module('debtSnowball', [
	'ngRoute',
	'ngTable',
	'dbForm',
	'dbTable',
	'dbGraph'
]).config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/form', {
          template: '<bill-form></bill-form>'
        }).
		when('/graph',{
			template:'<snowball-graph></snowball-graph>'
		}).
		when('/table',{
			template:'<snowball-table></snowball-table'
		}).
        otherwise('/form');
    }
  ])
