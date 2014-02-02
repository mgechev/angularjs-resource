var resourceDemo = angular.module('resourceDemo', ['ngResource', 'ngRoute']);

resourceDemo.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/index.html',
    controller: 'MainCtrl'
  })
  .when('/users/:userid', {
    templateUrl: 'partials/user.html',
    controller: 'UserCtrl',
    resolve: {
      user: function ($route, User) {
        return User.get({ userid: $route.current.params.userid }).$promise;
      }
    }
  })
});

resourceDemo.factory('User', function ($resource) {
  return $resource('/users/:userid', { userid: '@userid' });
})

resourceDemo.controller('MainCtrl', function ($scope, User) {
  $scope.users = User.query();
});

resourceDemo.controller('UserCtrl', function ($scope, user) {
  $scope.user = user;
});