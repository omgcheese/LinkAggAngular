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


//CONTROLLER: HOME
linkAgg.controller("homeController", ['$scope', 'apiGet', function($scope, apiGet) {
    apiGet.get(function(data) {
        $scope.webpostsResult = data;
    }); 
}]);

//DIRECTIVE: MORE DATA
linkAgg.directive('webPost', ['$document','$window', 'apiGet', function($document, $window, apiGet) {
    return {
        //Link directive functions that manipulates DOM elements
        link: function(scope, element, attr) {
            
            //Checking if user has reached bottom page
            angular.element($window).bind("scroll", function() {
                var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                var body = document.body;
                var html = document.documentElement;
                var docHeight = Math.max(body.scrollHeight,body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                var windowBottom = windowHeight + window.pageYOffset;
                //when reached to bottom call apiGet function
                if (windowBottom >= docHeight) {
                    apiGet.get(function(data) {
                        data.$promise.then(function(webposts) {
                            for(var key in webposts.list) {
                                //Add more data
                                var postAtt = angular.element('<div class="col-md-4"><div class="item"><img class="content" src="../../public/images/test.png"><p class="summary">' + webposts.list[key].postTitle + '<br>(source: ' + webposts.list[key].postOrigin + ')<br><a href= "'+webposts.list[key].commentLink+'" >Comment</a></p></div></div>');
                                //add before directive tag so you can add more
                                element.prepend(postAtt);
                            }         
                        });
                    });
                }
            });
        },
        scope: { 
        },
        replace: false
    }
        
}]);

