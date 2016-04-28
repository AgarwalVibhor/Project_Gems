(function(){

	'use strict';
	var Gems = angular.module("MyGems", ['ngRoute']);

	Gems.config(function($routeProvider){

		$routeProvider
		.when('/',{
			templateUrl : './views/home.html'
		});
	});
})();