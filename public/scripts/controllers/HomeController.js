(function(){

	'use strict';
	angular.module('MyGems').controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$http'];
	function HomeController($scope, $http){

		$scope.getGems = getGemsFn;
		$scope.tab = 1;
		$scope.stars = "0";
		$scope.body = "";
		$scope.author = "";
		$scope.name = "";
		var temp = 0;
		$scope.submitReview = submitReviewFn;
		$scope.setGemStars = setGemStarsFn;
		$scope.setReview = setReviewFn;
		$scope.setAuthor = setAuthorFn;
		$scope.getReviews = getReviewsFn;

		function getGemsFn(){

			var req = {
				method : 'GET',
				url : '/getGems'
			};
			$http(req).then(successGetGems, function(res){
				console.log("An error occured in getting the gems");
			});
		}

		function successGetGems(res){
			$scope.gems = res.data.gems;
		}

		function submitReviewFn(){

			var req = {
				method : 'POST',
				url : '/submitReview',
				data : {
					name : $scope.name,
					stars : $scope.stars,
					reviewBody : $scope.body,
					author : $scope.author
				}
			};
			$http(req).then(successSubmitReview, function(res){
				console.log("An error occured while adding the review to the database file");
			});
		}

		function successSubmitReview(res){
			temp = temp + 1;
			$scope.count = temp;
			console.log("Data inserted successfully -- HomeController");
		}

		function setGemStarsFn(_name, _stars){
			$scope.name = _name;
			$scope.stars = _stars;
			console.log($scope.name);
			console.log($scope.stars);
		}

		function setReviewFn(_body){
			$scope.body = _body;
			console.log($scope.body);
		}

		function setAuthorFn(_author){
			$scope.author = _author;
			console.log($scope.author);
		}

		function getReviewsFn(_name)
		{
			var req = {
				method : 'GET',
				url : '/getReviews',
				params : {
					name : _name
				}
			};
			$http(req).then(successGetReviews, function(res){
				console.log("An error occured in the getReviewsFn");
			});
		}

		function successGetReviews(res){
			$scope.reviews = res.data.reviews;
			console.log($scope.reviews);
		}
		$scope.getGems();
	}
})();