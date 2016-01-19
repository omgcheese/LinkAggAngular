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
linkAgg.controller("homeController", ['$scope','$http','$resource', function($scope, $http, $resource) {
    
    $http.post("https://calm-springs-9697.herokuapp.com/login", {
        userID: "admin",
        password: "admin123"},{
        headers: {
            'Content-Type': "application/json"            
        }
    }).then(function(response) {
        console.log(response.data.token);
        $scope.webpostsResult = $resource("https://calm-springs-9697.herokuapp.com/api/:source/:date",{
            source: 'reddit',
            date: 20160118,
            ctn: 12
        },{
            get: {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': "Bearer " + response.data.token
                }
            }
        })
            .get(function() {
            console.log("everything is loaded!");
        })
    }, function() {
        console.log("Login not successful!");
    });
    
//    $scope.webPostAPI = $resource("https://calm-springs-9697.herokuapp.com/api/:source/:date");
//    
//    $scope.webpostsResult = $scope.webPostAPI.get({source:'reddit',
//                                                   date: 20160118
//                                                   cnt: 12});
    //default post number request is 12
    //as you move down, you should define how many more you are requesting...
    
    $scope.windowScreenTop = $(".container").scrollTop();
    console.log($scope.windowScreenTop);
}]);



