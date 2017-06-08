//var myApp = angular.module('blogApp', ['ngRoute']); 

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/',{
            // location of the template
        	templateUrl		: 'views/index-view.html',
        	// Which controller it should use 
            controller 		: 'mainController',
            // what is the alias of that controller.
        	controllerAs 	: 'info'
        })
       .when('/:year',{
            // location of the template
            templateUrl     : 'views/Match-view.html',
            // Which controller it should use 
            controller      : 'viewController',
            // what is the alias of that controller.
            controllerAs    : 'data'
        })
        .when('/other/:year',{
        	templateUrl     : 'views/Team-view.html',
        	controller 		: 'totalMatchStats',
        	controllerAs 	: 'other'
        })
        .when('/single/:year/:matchId',{

        	templateUrl     : 'views/singleMatch-view.html',
        	controller 		: 'singlematchController',
        	controllerAs 	: 'singlematch'
        })

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>4040 page not found</h1>'
            }
        );
}]);