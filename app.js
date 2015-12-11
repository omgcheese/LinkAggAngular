//MODULE
var linkAgg = angular.module('linkAgg',['ngRoute', 'ngResource']);

//ROUTE CONFIG
linkAgg.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: './public/pages/item.html',
        controller: 'homeController'
    });
    //add more router Provider in the future
}]);

//SERVICE
linkAgg.service("webpostcrawl", function($http, $q) {
   var deferred = $q.defer();
    $http.get("https://calm-springs-9697.herokuapp.com/database/reddit/20151202").then(function (data) {
        deferred.resolve(data);
    });
    
    this.getWebposts= function() {
        return deferred.promise;
    }
});

//CONTROLLER
linkAgg.controller("homeController", ['$scope','webpostcrawl', function($scope, webpostcrawl) {
    
   var promise = webpostcrawl.getWebposts();
    
    promise.then(function (data) {
        $scope.webpostsResult = data.data;
        console.log($scope.webpostsResult);
    });
    
   
    
}]);




