var app = angular.module('myApp', ['ngRoute']);

app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
});

// app.controller('registrationController', function($scope) {
//   $scope.message = 'Hello from registrationController';
// });
//
// app.controller('loginController', function($scope) {
//   $scope.message = 'Hello from loginController';
// });
