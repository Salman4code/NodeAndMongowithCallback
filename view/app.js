var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'templates/home.html',
    controller  : 'HomeController'
  })

  .when('/signup', {
    templateUrl : 'templates/registration.html',
    controller  : 'registrationController'
  })

  .when('/login', {
    templateUrl : 'templates/login.html',
    controller  : 'loginController'
  })

  .otherwise({redirectTo: '/'});
});


// app.controller('HomeController', function($scope) {
//   $scope.message = 'Hello from HomeController';
// });
//
// app.controller('registrationController', function($scope) {
//   $scope.message = 'Hello from registrationController';
// });
//
// app.controller('loginController', function($scope) {
//   $scope.message = 'Hello from loginController';
// });
