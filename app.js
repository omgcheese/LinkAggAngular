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


//CONTROLLER
linkAgg.controller("homeController", ['$scope','$resource', function($scope, $resource) {
    
    $scope.webPostAPI = $resource("https://calm-springs-9697.herokuapp.com/database/:source");
    
    $scope.webpostsResult = $scope.webPostAPI.get({source:'postman', 
                                                   cnt: 12});
    //default post number request is 12
    //as you move down, you should define how many more you are requesting...
    
    $scope.windowScreenTop = $(".container").scrollTop();
    console.log($scope.windowScreenTop);
}]);



