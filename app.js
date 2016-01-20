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

//FACTORY: API LOGIN
linkAgg.factory("apiLogin", ["$http", function($http) {
    return function(callback) {
        $http.post("https://calm-springs-9697.herokuapp.com/login", {
            userID: "admin",
            password: "admin123"},{
            headers: {
                'Content-Type': "application/json"            
            }
            }).then(function(res) {
            callback(res);
        }, function() {
            console.error("Login not successful");
        });
    };
}]);

//FACTORY: API GET
linkAgg.factory("apiGet", ['$resource','apiLogin', function($resource, apiLogin) { 
    return {
        get: function(callback) {
            apiLogin(function(response){
                var result = $resource("https://calm-springs-9697.herokuapp.com/api/:source/:date",{
                            source: 'reddit',
                            date: 20160120,
                            cnt: 12
                        },{
                            get: {
                                method: 'GET',
                                headers: {
                                    'Content-Type': "application/json",
                                    'Authorization': "Bearer " + response.data.token
                                }
                            }
                        }).get();
                callback(result);
            });
        }
    };
}]);

//CONTROLLER
linkAgg.controller("homeController", ['$scope', 'apiGet', function($scope, apiGet) {
    apiGet.get(function(data) {
        $scope.webpostsResult = data;
    })
}]);